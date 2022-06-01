import { UserTypes } from '../types'   
import { Dispatch } from 'redux';
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification ,updateProfile,    } from 'firebase/auth'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'
import axios from 'axios'
import * as CryptoJS from 'crypto-js'
import { JsonFormatter } from '../../modules/json-formatter.module'
import { Contact, Field, Message,  Notification, UserDetails } from '../../interfaces';
import store from '../store'
import { bindActionCreators } from 'redux'
import * as ChatActions from './chat.actions-creators'

const dispatch = store.dispatch
const chatActions = bindActionCreators(ChatActions,dispatch)

const firebaseConfig = {
    apiKey: "AIzaSyCPB_ibh5yK49GwSHCAHGlCEhGlVBuq2i0",
    authDomain: "company-life-admin.firebaseapp.com",
    projectId: "company-life-admin",
    storageBucket: "company-life-admin.appspot.com",
    messagingSenderId: "1051805480691",
    appId: "1:1051805480691:web:4dca6e5fe4b5e10558e986",
    measurementId: "G-KTGFRZ262D"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()
  const db = getFirestore() 
  const colRefUsers = collection(db,'users')


  let analytics 
  if(typeof window !== 'undefined'){
      analytics = getAnalytics(app);  
  }


 export const loginUser = (email:string,password:string) => (dispatch:Dispatch<any>) => {
    signInWithEmailAndPassword(auth,email,password)
        .then((res:any) =>{
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:res.user,
                accessToken:res.user.accessToken,
                error:null
            })
        })
   
        .catch((err:any) => {
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:null,
                error:err.message
            })
        })
 }

 export const singUpUser = (email:string,password:string) => (dispatch:Dispatch<any>) => {
   
    createUserWithEmailAndPassword(auth,email,password)
        .then((res:any) =>{
            addDoc(colRefUsers,{
                email:res.user.email,
                name:'',
                surname:'',
                company:'',
                employee:'',
                nip:'',
                phoneNumber:res.user.providerData[0].phoneNumber,
                photoURL:res.user.providerData[0].photoURL,
                is_online:true,
                inbox_email:'',
                inbox_password:'',
                lock_screen_password:'',
                last_chat_recipient:'',
                contacts:[],
                invoiceFields:[],
            })
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:res.user,
                accessToken:res.user.accessToken,
                error:null
            })
        }).catch((err:any) => {
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:null,
                error:err.message
            })
        })
 }

 
export const logoutUser = () => (dispatch:Dispatch<any>) => {
    signOut(auth)
        .then((user:any) => {
            dispatch({
                type:UserTypes.LOGOUT_USER,
                user:null,
                accessToken:null,
                error:null,
            })
        })
        .catch((err:any) => {
            dispatch({
                type:UserTypes.LOGOUT_USER,
                error:err.message,
            })
        })
}

export const traceChanges = () => (dispatch:Dispatch<any>) => {
    onAuthStateChanged(auth,(user:any)=>{
        dispatch({
            type:UserTypes.TRACE_CHANGES,
            user:user
        })
    })
}

export const sendVerification = () => (dispatch:Dispatch<any>) => {
    if(auth.currentUser !== null){
        sendEmailVerification(auth.currentUser)
        .then(() => {
            dispatch({
                type:UserTypes.VERIFY_EMAIL,
                msg:"Verification Sended"
            })
        })
        .catch((err) => console.log(err))
    }
}

 export const setUserDetails = (email:string) => (dispatch:Dispatch<any>) => {
    let users:UserDetails[] = [];
    getDocs(colRefUsers)
    .then((snapshot)=>{
        snapshot.docs.forEach((doc:any)=>{
            users.push({...doc.data(), id:doc.id})
        })
    }).then(()=>{
        const user = users.find((u:any) => u.email === email) as UserDetails
        dispatch({
            type:UserTypes.SET_USER_DETAILS,
            userDetails:user
        })   
    })
    .catch(err => console.log(err))
       
 }

 export const updateUserProfile = (id:string,user:any) => (dispatch:Dispatch<any>) => {
     if(user !== undefined){
         if(user.inbox_password !== undefined  || user.inbox_password !== '' ){
            var encrypted = CryptoJS.AES.encrypt(user.inbox_password, "Password", {
                format: JsonFormatter
            });   
        }
        const docRef = doc(db,'users',id)
        updateDoc(docRef,{...user,inbox_password:encrypted.toString()})
        .then(()=>{
            dispatch({
                type:UserTypes.UPDATE_PROFILE,
                userDetails:{
                  id:id,
                  ...user,
                  inbox_password:encrypted
              }
          })
        }).then(()=>{
              chatActions.updateChatProfileImg(user.email,user.photoURL)
        }).catch(err => console.log(err))
    }
   
}

 export const updateUserContacts = (id:string,contact:Contact) => (dispatch:Dispatch<any>) => {
    const contacts  = store.getState().user.userDetails?.contacts
    const { userDetails } = store.getState().user
    if(userDetails?.email !== contact.email && userDetails !== null){
        if(contacts.filter((c:Contact)=>c.email === contact.email).length === 0){
            contacts.push(contact)
            const docRef = doc(db,'users',id)
            updateDoc(docRef,userDetails)
            .then(()=>{
                dispatch({
                    type:UserTypes.UPDATE_USER_CONTACTS,
                    userDetails:userDetails
                })
            }).catch(err => console.log(err))
        }
    }
}

 export const updateUserInvoiceFields = (id:string,fields:Field[]) => (dispatch:Dispatch<any>) => {
    const { userDetails } = store.getState().user
    const docRef = doc(db,'users',id)
      updateDoc(docRef,{invoice_fields:fields})
      .then(()=>{
          dispatch({
          type:UserTypes.UPADTE_INVOICE_FIELDS,
          userDetails:{
              ...userDetails,
              invoiceFields:fields
          }
      })

  }).catch(err => console.log(err))
}


export const setUnknowContacts = (allMessages:Message[],userContacts:Contact[],allContacts:Contact[],userEmail:string) => (dispatch:Dispatch<any>) => {
    let tempContacts:Contact[] = []
    let unknowMessages:Message[] = [] 
    const userEmails = userContacts.map((c:Contact)=>c.email)
    allMessages.forEach((m:Message)=>{
            if(m !== undefined && m !== null){
                if(!userEmails.includes(m.sender_email) && m.sender_email !== userEmail){
                    unknowMessages.push(m)
                }
            }
        })
    unknowMessages.forEach((m:Message)=>{
        allContacts.forEach((c:Contact)=>{
            if(m.sender_email === c.email){
                if(!tempContacts.includes(c)){
                    tempContacts.push(c)
                }
            }
        })
    })
    dispatch({
        type:UserTypes.SET_UKNOWN_CONTACTS,
        unknownContacts:tempContacts
    })
}


export const setEmail = (email:string) => (dispatch:Dispatch<any>) => {
    dispatch({        
        type:UserTypes.SET_EMAIL,
        email:email,
    })
}

export const setReplyDetails = (email:string,subject:string) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UserTypes.SET_REPLY_EMAIL,
        replyDetails:{ email, subject }
    })
}


export const setEmails = (email:string,password:string) => (dispatch:Dispatch<any>) => {
        if(password){
            const decrypted = CryptoJS.AES.decrypt(password, "Password", {
                format: JsonFormatter
            });
            new Promise((resolve:any,reject:any)=>{
                const pass = decrypted.toString(CryptoJS.enc.Utf8)
                resolve(pass)
            }).then((pass:any)=>{
                const reqBody = JSON.stringify({ email, password:pass })
                axios.post('/api/emails',reqBody,{
                    headers:{
                        'Content-Type': 'application/json'
                        }
                })
                    .then((res:any)=>{
                        const emails = res?.data?.length > 0 && res.data !== undefined ? [...res.data] : ['loading']
                        dispatch({
                            type:UserTypes.SET_EMAILS,
                            emails:emails
                        })
            })    
        })
    }   
}
export const setUnseenEmails = (email:string,password:string) => (dispatch:Dispatch<any>) => {
        if(password){
            const decrypted = CryptoJS.AES.decrypt(password, "Password", {
                format: JsonFormatter
            });
            new Promise((resolve:any,reject:any)=>{
                const pass = decrypted.toString(CryptoJS.enc.Utf8)
                resolve(pass)
            }).then((pass:any)=>{
                const reqBody = JSON.stringify({ email, password:pass })
                axios.post('/api/unseen-emails',reqBody,{
                    headers:{
                        'Content-Type': 'application/json'
                        }
                })
                    .then((res:any)=>{
                        dispatch({
                            type:UserTypes.SET_UNSEEN_EMAILS,
                            unseenEmails:[...res.data]
                        })
            })    
        })
    }   
}
export const deleteEmail = (email:string,password:string,uid:string) => (dispatch:Dispatch<any>) => {
        if(password){
            const decrypted = CryptoJS.AES.decrypt(password, "Password", {
                format: JsonFormatter
            });
            new Promise((resolve:any,reject:any)=>{
                const pass = decrypted.toString(CryptoJS.enc.Utf8)
                resolve(pass)
            }).then((pass:any)=>{
                const reqBody = { email, password:pass, uid }
                axios.post('/api/remove-email',reqBody,{
                    headers:{
                        'Content-Type': 'application/json'
                        }
                })
                    .then((res:any)=>{
                        dispatch({
                            type:UserTypes.REMOVE_EMAIL,
                        })
            })    
        })
    }   
}
export const markSeenEmail = (email:string,password:string,uid:string) => (dispatch:Dispatch<any>) => {
        if(password){
            const decrypted = CryptoJS.AES.decrypt(password, "Password", {
                format: JsonFormatter
            });
            new Promise((resolve:any,reject:any)=>{
                const pass = decrypted.toString(CryptoJS.enc.Utf8)
                resolve(pass)
            }).then((pass:any)=>{
                const reqBody = { email, password:pass, uid }
                axios.post('/api/mark-email-read',reqBody,{
                    headers:{
                        'Content-Type': 'application/json'
                        }
                })
                    .then((res:any)=>{
                        const emails = store.getState().user.emails.fiter((e:any) => e.uid !== uid)
                        dispatch({
                            type:UserTypes.MARK_EMAIL_SEEN,
                        })
            })    
        })
    }   
}

export const sendEmail = (email:string, password:string, message:any) => (dispatch:Dispatch<any>) =>{
    if(password){
        const decrypted = CryptoJS.AES.decrypt(password, "Password", {
            format: JsonFormatter
        });
        new Promise((resolve:any,reject:any)=>{
            const pass = decrypted.toString(CryptoJS.enc.Utf8)
            resolve(pass)
        }).then((pass:any)=>{
            const reqBody = {
                email,
                password:pass,
                ...message
            }
            axios.post('/api/send-email',reqBody,{
                headers:{
                    'Content-Type': 'application/json'
                    }
            })
            .then((res:any)=>{
                dispatch({
                    type:UserTypes.SEND_EMAIL
                })
            })
            .catch((err:any) => console.log(err))  
        })
    }
}

export const setNotifications = (allMessages:Message[],userEmail:string) => (dispatch:Dispatch<any>) =>{
    const unreed = allMessages.filter((m:Message)=>{
        if(m !== null && m !== undefined){
            if(m.isRead === false){
                return m
            }
        }
    })
    let notifications = unreed.map((m:Message)=>{
        const notification = {
            isRead:m.isRead,
            person:m.sender_email,
            date:m.date,
            photoURL:m.sender_img
        }
        return notification
    })
    notifications = notifications.sort((a:any,b:any) : number =>{
        const dateA:any = new Date(a.date)
        const dateB:any = new Date(b.date)
        return dateA - dateB
    })
    notifications = notifications.filter((n:any)=> n.person !== userEmail)
    dispatch({
        type:UserTypes.SET_NOTIFICATIONS,
        notifications:notifications,
        notificationsCount:notifications.length
    })

}
export const setNotificationsRead = (userEmail:string) => (dispatch:Dispatch<any>) =>{
    const { allMessages } = store.getState().chat
    const unreadedNotifications = allMessages.filter((m:Message)=>{
        if(m !== undefined && m !== null){
            if(m.isRead === false){
                return m
            }
        }
    })
    let converted = unreadedNotifications.map((n:Message)=>{
        const notification = {
            isRead:n.isRead,
            person:n.sender_email,
            date:n.date,
            photoURL:n.sender_img
        }
        return notification
    })
    converted = converted.filter((n:Notification) => n.person !== userEmail)
    dispatch({
        type:UserTypes.SET_NOTIFICATIONS_READ,
        notifications:converted,
        notificationsCount:converted.length
    })
}

export const lastChatRecipient = (email:string,id:string) => (dispatch:Dispatch<any>) => {
    const docRef = doc(db,'users',id)
    updateDoc(docRef,{
        last_chat_recipient:email,
    }).then(()=>{
        dispatch({
            type:UserTypes.LAST_CHAT_RECIPIENT,
        })
    }).catch(err => console.log(err))
}




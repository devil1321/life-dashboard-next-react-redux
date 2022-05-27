import { ChatTypes } from '../types'
import { Contact, Message } from '../../interfaces'
import { Dispatch } from 'redux';
import store from '../store'
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'
import * as CryptoJS from 'crypto-js'
import { JsonFormatter } from '../../modules/json-formatter.module'

const firebaseConfig = {
    apiKey: "AIzaSyCPB_ibh5yK49GwSHCAHGlCEhGlVBuq2i0",
    authDomain: "company-life-admin.firebaseapp.com",
    projectId: "company-life-admin",
    storageBucket: "company-life-admin.appspot.com",
    messagingSenderId: "1051805480691",
    appId: "1:1051805480691:web:4dca6e5fe4b5e10558e986",
    measurementId: "G-KTGFRZ262D"
};

initializeApp(firebaseConfig)
const db = getFirestore() 
const colRefChat = collection(db,'chat')
const q = query(colRefChat)


export const setMessages = (email:string) => async (dispatch:Dispatch<any>) => {
    let messages:any[] = []
    getDocs(colRefChat)
        .then((snapshot)=>{
            messages = [];
            snapshot.docs.forEach((doc:any)=>{
                messages.push({...doc.data(), id:doc.id})
        })
        return messages
    }).then((messages:any)=>{
        const { contacts } = store.getState().contacts
        const tempMessages = messages.map((msg:any)=>{
            let isValid = false
            contacts.map((c:Contact)=>{
                if(Object.values(msg).includes(email) && Object.values(c).includes(c.email)){
                    isValid = true
                }                
            })
            if(isValid){
                msg.msg = CryptoJS.AES.decrypt(msg.msg, "Message", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                if(msg !== undefined && msg !== null){
                    return msg
                }
            }
        })
        dispatch({
            type:ChatTypes.SET_MESSAGES,
            allMessages:tempMessages,
        })
    })
}

export const manageMessage = (key:string,val:string) => (dispatch:Dispatch<any>) => {
    const { message }: {message:Message} = store.getState().chat
    // @ts-ignore
    message[key] = val
    dispatch({
        type:ChatTypes.MANAGE_MESSAGE,
        message:message
    })
}

export const sendMessage = (email:string,message:any) => (dispatch:Dispatch<any>) => {
    message.msg = CryptoJS.AES.encrypt(message.msg, "Message", {
        format: JsonFormatter
   }).toString();
    addDoc(colRefChat,message)
        .then(()=>{
            dispatch({
                type:ChatTypes.SEND_MESSAGE,
            })
        })
        .catch(err => console.log(err)) 
}
export const filterByEmail = (recipient:string,sender:string) => (dispatch:Dispatch<any>) => {
    const messages:any[] = store.getState().chat.allMessages
    let filtered = messages.filter((m:any)=> {
        if(m !== undefined && m !== null){
            return Object.values(m).includes(recipient) && Object.values(m).includes(sender)
        }
    })
    filtered = filtered.sort((a,b)=>{
        const dateA:any = new Date(a.date)
        const dateB:any = new Date(b.date)
        return dateA - dateB
    })
    dispatch({
        type:ChatTypes.FILTER_BY_EMAIL,
        messagesByEmail:filtered,
    })
}

export const checkRead = (sender_email:string,user_email:string) => (dispatch:Dispatch<any>)=>{
        const messages:any[] = store.getState().chat.allMessages
        let filtered = messages.filter((m:any) => m.recipient_email === user_email && m.sender_email === sender_email)
        filtered.forEach((m:any)=>{
            const docRef = doc(db,'chat',m.id)
            updateDoc(docRef,{
                isRead:true,
            }).then(()=>{
                dispatch({
                    type:ChatTypes.CHECK_READ,
                })
            }).catch(err => console.log(err))
        })
}

export const traceMessages = () => (dispatch:Dispatch<any>) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages:any = [];
        querySnapshot.forEach((doc) => {
            messages.push({...doc.data(),id:doc.id});
        });
        new Promise((resolve,reject)=>{
            const tempMessages = messages.map((msg:any)=>{
                if(msg !== undefined && msg !== null){    
                    msg.msg = CryptoJS.AES.decrypt(msg.msg, "Message", {
                        format: JsonFormatter
                    }).toString(CryptoJS.enc.Utf8);
                    return msg
                }})
                const validMessages = tempMessages.filter((msg:any) => msg !== undefined && msg !== null)
                resolve(validMessages)
            
        }).then((validMessages:any)=>{
            dispatch({
                type:ChatTypes.UPDATE_MESSAGES,
                allMessages:validMessages
            })
        })
      });
}


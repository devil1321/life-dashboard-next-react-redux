import { ChatTypes } from '../types'
import { Contact, Message } from '../../interfaces'
import { Dispatch } from 'redux';
import store from '../store'
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'


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



export const setMessages = (email:string) => async (dispatch:Dispatch<any>) => {
    let messages:any[] = []
    getDocs(colRefChat)
        .then((snapshot)=>{
            messages = [];
            snapshot.docs.forEach((doc:any)=>{
                messages.push({...doc.data(), id:doc.id})
        })
    }).then(()=>{
        const { contacts } = store.getState().user.userDetails
        const tempMessages = messages.map((msg)=>{
            let isValid = false
            contacts.map((c:Contact)=>{
                if(Object.values(msg).includes(email) && Object.values(c).includes(c.email)){
                    isValid = true
                }                
            })
            if(isValid){
                return msg
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
    const messages:any[] = store.getState().chat.allMessages
    messages.push(message)
    const filtered = messages.filter((m:any)=> m.recipient_email === email)
    addDoc(colRefChat,message)
        .then(()=>{
            dispatch({
                type:ChatTypes.SEND_MESSAGE,
                allMessages:messages,
                messagesByEmail:filtered
            })
        })
        .catch(err => console.log(err)) 
}
export const filterByEmail = (recipient:string) => (dispatch:Dispatch<any>) => {
    const messages:any[] = store.getState().chat.allMessages
    const filtered = messages.filter((m:any)=> m.recipient_email === recipient)
    dispatch({
        type:ChatTypes.FILTER_BY_EMAIL,
        messagesByEmail:filtered,
    })
}

export const checkRead = (sender_email:string,user_email:string) => (dispatch:Dispatch<any>)=>{
        const messages:any[] = store.getState().chat.allMessages
        const filtered = messages.filter((m:any) => m.recipient_email === user_email && m.sender_email)
        filtered.forEach((m:any)=>{
            const docRef = doc(db,'chat',m.id)
            updateDoc(docRef,{
                isRead:true,
            }).then(()=>{
                dispatch({
                    type:ChatTypes.CHECK_READ,
                    messagesByEmail:filtered,
                })
            }).catch(err => console.log(err))
        })
}

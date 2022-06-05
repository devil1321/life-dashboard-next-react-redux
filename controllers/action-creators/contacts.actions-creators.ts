
import { ContactsTypes } from '../types'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux';
import { Contact } from '../../interfaces';

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
  const db = getFirestore() 
  const colRefUsers = collection(db,'users')


  let analytics 
  if(typeof window !== 'undefined'){
      analytics = getAnalytics(app);  
  }

export const setContacts = () => (dispatch:Dispatch<any>) => {
    let users:Contact[] = []
    let contacts:Contact[] = []
    getDocs(colRefUsers)
        .then((snapshot)=>{
            snapshot.docs.forEach((doc:any)=>{
                users.push({...doc.data(), id:doc.id})
            })
        })
        .then(()=>{
            users.map((user:any)=>{
                const contact = {
                    id:user.id,
                    email:user.email,
                    name:user.name,
                    surname:user.surname,
                    phoneNumber:user.phoneNumber,
                    photoURL:user.photoURL,
                    company:user.company,
                }
                contacts.push(contact)
            })
        })
        .then(()=>{
            dispatch({
                type:ContactsTypes.SET_CONTACTS,
                contacts:contacts
            })
        })
        .catch(err => console.log(err))
 
}


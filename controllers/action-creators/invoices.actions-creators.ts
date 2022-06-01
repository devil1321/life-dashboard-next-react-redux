import { InvoicesTypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'

import { Field, Invoice } from '../../interfaces'
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
const colRefInvoices = collection(db,'invoices')
const q = query(colRefInvoices)

export const setField = (field:Field) => (dispatch:Dispatch<any>) => {
    const fields = store.getState().invoices.fields
    fields.push(field)
    dispatch({
        type:InvoicesTypes.SET_FIELDS,
        fields:fields,
    })
}

export const handleFormData = (name:string,val:string) => (dispatch:Dispatch<any>) => {
    const formData = store.getState().invoices.formData
        dispatch({
            type:InvoicesTypes.HANDLE_FORM_DATA,
            formData:{
                ...formData,
                [name]:val
            }
        })    
}

export const setInvoices = (id:string) => (dispatch:Dispatch<any>) => {
    getDocs(colRefInvoices)
    .then((snapshot)=>{
        let invoices = [] as any[] 
            snapshot.docs.forEach(doc => {
                invoices.push({...doc.data(),firebaseId:doc.id})
            })
            invoices = invoices.filter((i:Invoice) => i.userId === id)
            invoices = invoices.map((i:Invoice) => {
                i.file = CryptoJS.AES.decrypt(i.file, "Invoice", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                return i
            })
            console.log(invoices)

            dispatch({
                type:InvoicesTypes.SET_INVOICES,
                invoices:invoices
            })
        }).catch(err => console.log(err))
}

export const addInvoice = (invoice:Invoice,dataFile:any,userId:string) => (dispatch:Dispatch<any>) => {
    let { file, invoiceNR, firstName, lastName, money, date } = invoice
    file = CryptoJS.AES.encrypt(file, "Invoice", {
        format: JsonFormatter
   }).toString();

    addDoc(colRefInvoices,{
        userId,
        invoiceNR,
        firstName,
        lastName,
        money,
        date,
        file
    })
    .then(()=>{
        dispatch({
            type:InvoicesTypes.ADD_INVOICE,
        })
    })
    .catch(err => console.log(err))

}

export const viewInvoice = (id:string) => (dispatch:Dispatch<any>) => {
    const invoice = store.getState().invoices.invoices.find((i:Invoice) => i.firebaseId === id)
    dispatch({
        type:InvoicesTypes.VIEW_INVOICE,
        invoice:invoice
    })
    
}


export const removeInvoice = (id: string) => (dispatch:Dispatch<any>) => {
    const tempInvoices:Invoice[] = store.getState().invoices.invoices.filter((invoice:Invoice) => invoice.firebaseId !== id)
    const docRef = doc(db,"invoices",id)
    deleteDoc(docRef)
        .then(()=>{
            dispatch({
                type:InvoicesTypes.REMOVE_INVOICE,
                invoices:tempInvoices
            })
        })
        .catch(err => console.log(err)) 
}

export const trackInvoices = (id:string) => (dispatch:Dispatch<any>) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let invoices:any = [];
        new Promise((resolve,reject)=>{
            querySnapshot.forEach((doc) => {
                invoices.push({...doc.data(),firebaseId:doc.id});
            })
            resolve(invoices)
        }).then(async(invoices:any)=>{
            const encryptedInvoices = invoices.filter((i:Invoice) => i.userId === id)
            const finalInvoices =  await Promise.all(encryptedInvoices.map(async(i:Invoice)=>{
                i.file = await CryptoJS.AES.decrypt(i.file, "Invoice", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                return i
            }))

            dispatch({
                type:InvoicesTypes.TRACK_IVOICES,
                invoices:finalInvoices
            })
        })
      });
}


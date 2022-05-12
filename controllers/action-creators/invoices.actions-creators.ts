import { InvoicesTypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'

import { Field } from '../../interfaces'
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
const colRefInvoices = collection(db,'invoices')

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

export const setInvoices = () => (dispatch:Dispatch<any>) => {
    const invoices:any = []
    getDocs(colRefInvoices)
        .then((snapshot)=>{
            snapshot.docs.forEach(doc => {
                invoices.push({...doc.data(),id:doc.id})
            })
            dispatch({
                type:InvoicesTypes.SET_INVOICES,
                invoices:invoices
               
            })
        }).catch(err => console.log(err))
   
}

export const addInvoice = (invoice:any,invoiceData:any,userId:string) => (dispatch:Dispatch<any>) => {
    const { file, invoiceNR, firstName, lastName, money, date } = invoice
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
            type:InvoicesTypes.ADD_INVOICE
        })
    })
    .catch(err => console.log(err))

}

export const viewInvoice = (id:string) => (dispatch:Dispatch<any>) => {
    const invoice = store.getState().invoices.invoices.find((i:any) => i.id === id)
    dispatch({
        type:InvoicesTypes.VIEW_INVOICE,
        invoice:invoice
    })
    
}
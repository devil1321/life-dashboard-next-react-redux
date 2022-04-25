import { InvoicesTypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'
import { Field } from '../../interfaces'


export const setInvoice = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:InvoicesTypes.SET_INVOICE,
       
    })
}

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

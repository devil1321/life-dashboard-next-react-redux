import { InvoicesTypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'


export const setInvoice = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:InvoicesTypes.SET_INVOICE,
       
    })
}

export const handleFormData = (name:string,val:string) => (dispatch:Dispatch<any>) => {
    const formData = store.getState().invoices.formData
    if(name !== 'file'){
        dispatch({
            type:InvoicesTypes.HANDLE_FORM_DATA,
            formData:{
                ...formData,
                [name]:val
            }
        })
    }
    
}

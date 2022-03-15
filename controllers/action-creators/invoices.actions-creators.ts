import { InvoicesTypes } from '../types'
import { Dispatch } from 'redux'


export const setInvoice = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:InvoicesTypes.SET_INVOICE,
       
    })
}
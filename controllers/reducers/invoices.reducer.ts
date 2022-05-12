import { InvoicesFormDataParams } from '../../interfaces'
import { InvoicesTypes } from '../types'


const initData:InvoicesFormDataParams = {
    formData:{
        file:'',
        company:'',
        invoiceNR:'',
        date:'',
        money:0,
        tax:0,
        bonuses:0,
        nip:'',
        firstName:'',
        lastName:'',
        adress:'',
        zip:'',
        city:'',
    },
    fields:[],
    invoices:[],
    invoice:''
}
export default (state = initData, action:any) =>{
    switch(action.type){
        case InvoicesTypes.SET_INVOICES: 
            return {
                ...state,
                invoices:action.invoices
            }
        case InvoicesTypes.SET_FIELDS: 
            return {
                ...state,
                fields:action.fields
            }
        case InvoicesTypes.HANDLE_FORM_DATA: 
            return {
                ...state,
                formData:action.formData
            }
        case InvoicesTypes.ADD_INVOICE: 
            return {
                ...state,
            }
        case InvoicesTypes.VIEW_INVOICE: 
            return {
                ...state,
                invoice:action.invoice
            }
        default:
            return {
                ...state
            }
    }
}

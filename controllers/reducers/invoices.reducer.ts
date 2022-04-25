import { InvoicesFormDataParams } from '../../interfaces'
import { InvoicesTypes } from '../types'
import { Field } from '../../interfaces'


const initData:InvoicesFormDataParams = {
    formData:{
        file:'',
        company:'',
        invoiceNR:'',
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
    fields:[]
}
export default (state = initData, action:any) =>{
    switch(action.type){
        case InvoicesTypes.SET_INVOICE: 
            return {
                ...state,
                instance:action.instance,
                update:action.update
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
        default:
            return {
                ...state
            }
    }
}

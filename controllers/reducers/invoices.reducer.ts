import { InvoicesFormDataParams } from '../../interfaces'
import { InvoicesTypes } from '../types'

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
    }
}
export default (state = initData, action:any) =>{
    switch(action.type){
        case InvoicesTypes.SET_INVOICE: 
            return {
                ...state,
                instance:action.instance,
                update:action.update
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

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
    invoice:'',
    moneyByMonth:[],
    totalMoney:0,
    yearlyMoney:0,
    upFromLastMonth:0,
    yearlyMoneyByMonth:[]
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
        case InvoicesTypes.REMOVE_INVOICE:
            return{
                ...state,
                invoices:action.invoices
            }
        case InvoicesTypes.VIEW_INVOICE: 
            return {
                ...state,
                invoice:action.invoice
            }
        case InvoicesTypes.TRACK_IVOICES: 
            return {
                ...state,
                invoices:action.invoices
            }
        case InvoicesTypes.COUNT_MONEY_AND_UP: 
            return {
                ...state,
                moneyByMonth:action.moneyByMonth,
                yearlyMoney:action.yearlyMoney,
                upFromLastMonth:action.upFromLastMonth,
                totalMoney:action.totalMoney,
            }
        case InvoicesTypes.COUNT_MONEY_YEARLY_BY_MONTH: 
            return {
                ...state,
                yearlyMoneyByMonth:action.yearlyMoneyByMonth
            }
        default:
            return {
                ...state
            }
    }
}

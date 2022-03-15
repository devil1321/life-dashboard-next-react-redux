import { InvoicesTypes } from '../types'

interface DateParams {
    instance:any
    update:any
}

const initData:DateParams = {
   instance:{},
   update:{}
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case InvoicesTypes.SET_INVOICE: 
            return {
                ...state,
                instance:action.instance,
                update:action.update
            }
        default:
            return {
                ...state
            }
    }
}
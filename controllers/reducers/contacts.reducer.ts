import { ContactsTypes } from '../types'

interface ContactsParams {
    contacts:any[];
}

const initData:ContactsParams = {
    contacts:[]
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case ContactsTypes.SET_CONTACTS: 
            return {
                ...state,
                contacts:action.contacts
            }
        default:
            return {
                ...state
            }
    }
}
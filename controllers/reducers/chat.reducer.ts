import { ChatTypes } from '../types'

interface ChatParams{
    allMessages:any[];
    messagesByEmail:any[];
}

const initData:ChatParams = {
    allMessages:[],
    messagesByEmail:[]
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case ChatTypes.SET_MESSAGES: 
            return {
                ...state,
                allMessages:action.messages
            }
        case ChatTypes.SEND_MESSAGE: 
            return {
                ...state,
            }
        case ChatTypes.FILTER_BY_EMAIL: 
            return {
                ...state,
                messagesByEmail:action.messagesByEmail
                
            }
        case ChatTypes.CHECK_READ: 
            return {
                ...state,
                messagesByEmail:action.messagesByEmail
            }
        default:
            return {
                ...state
            }
    }
}
import { Message } from '../../interfaces';
import { ChatTypes } from '../types'

interface ChatParams{
    allMessages:any[];
    messagesByEmail:any[];
    message:Message;
}

const initData:ChatParams = {
    allMessages:[],
    messagesByEmail:[],
    message:{
        isRead:false,
        recipient_img:null,
        sender_img:null,
        sender_id:'',
        recipient_email:'',
        sender_email:'',
        msg:'',
        date:'',
    }
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case ChatTypes.SET_MESSAGES: 
            return {
                ...state,
                allMessages:action.allMessages
            }
        case ChatTypes.SEND_MESSAGE: 
            return {
                ...state,
                messages:action.messages,
                messagesByEmail:action.messagesByEmail   
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
        case ChatTypes.TRACE_CHANGES: 
            return {
                ...state,
                messages:action.messages
            }
        default:
            return {
                ...state
            }
    }
}
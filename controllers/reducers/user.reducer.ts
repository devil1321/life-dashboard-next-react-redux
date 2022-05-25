import { UserTypes } from '../types'

interface UserParams {
    user:any;
    userDetails:any;
    access_token:string;
    error:string;
    msg:string; 
    emails:any[];
    email:any;
    replyDetails:{
        email:string,
        subject:string
    };
}

const initData:UserParams = {
    user:null,
    userDetails:null,
    access_token:'',
    error:'',
    msg:'',
    emails:['loading'],
    email:null,
    replyDetails:{
        email:'',
        subject:''
    }
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case UserTypes.SIGNUP_USER: 
            return {
                ...state,
                user:action.user,
                access_token:action.accessToken,
                error:action.error
            }
        case UserTypes.LOGIN_USER: 
            return {
                ...state,
                user:action.user,
                access_token:action.accessToken,
                error:action.error
            }
      
        case UserTypes.SET_USER_DETAILS: 
            return {
                ...state,
                userDetails:action.userDetails
            }
        case UserTypes.LOGOUT_USER: 
            return {
                ...state,
                user:{},
                access_token:''
            }
        case UserTypes.VERIFY_EMAIL: 
            return {
                ...state,
                msg:action.msg,
                error:action.error
            }
            case UserTypes.SET_EMAILS: 
                return {
                    ...state,
                    emails:action.emails
                }
            case UserTypes.SET_EMAIL: 
                return {
                    ...state,
                    email:action.email
                }
            case UserTypes.REMOVE_EMAIL: 
                return {
                    ...state,
                }
            case UserTypes.SET_REPLY_EMAIL: 
                return {
                    ...state,
                    replyDetails:action.replyDetails
                }
            case UserTypes.SEND_EMAIL: 
                return {
                    ...state,
                }
        case UserTypes.UPDATE_PROFILE: 
            return {
                ...state,
                userDetails:action.userDetails,
            }
        case UserTypes.UPADTE_INVOICE_FIELDS: 
            return {
                ...state,
                userDetails:action.userDetails,
            }
        case UserTypes.UPDATE_USER_CONTACTS: 
            return {
                ...state,
                userDetails:action.userDetails,
            }
        case UserTypes.LAST_CHAT_RECIPIENT: 
            return {
                ...state,
            }
        case UserTypes.TRACE_CHANGES: 
            return {
                ...state,
                user:action.user,
                access_token:action.accessToken
            }
        default:
            return {
                ...state
            }
    }
}
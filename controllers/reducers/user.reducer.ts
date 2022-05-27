import { UserTypes } from '../types'

interface UserParams {
    user:any;
    userDetails:any;
    access_token:string;
    error:string;
    msg:string; 
    unknownContacts:any[];
    emails:any[];
    notifications:any[];
    notificationsCount:number;
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
    unknownContacts:[],
    emails:['loading'],
    notifications:[],
    notificationsCount:0,
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
            case UserTypes.SET_UKNOWN_CONTACTS: 
                return {
                    ...state,
                    unknownContacts:action.unknownContacts
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
            case UserTypes.SET_NOTIFICATIONS: 
                return {
                    ...state,
                    notifications:action.notifications,
                    notificationsCount:action.notificationsCount
                }
            case UserTypes.SET_NOTIFICATIONS_READ: 
                return {
                    ...state,
                    notificationsCount:action.notificationsCount,
                    notifications:action.notifications,
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
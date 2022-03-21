import { UserTypes } from '../types'

interface UserParams {
    user:any;
    access_token:string | undefined;
    isConnected:boolean;
    error:string | undefined;
    msg:string | undefined; 
}

const initData:UserParams = {
    user:undefined,
    access_token:undefined,
    isConnected:false,
    error:undefined,
    msg:undefined
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
        case UserTypes.LOGIN_USER_WITH_GOOGLE: 
            return {
                ...state,
                user:action.user,
                access_token:action.accessToken,
                error:action.error
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
        case UserTypes.CONNECT: 
            return {
                ...state,
                isConnected:action.isConnected,
                msg:action.msg,
                error:action.error                
            }
        case UserTypes.DISCONNECT: 
            return {
                ...state,
                isConnected:action.isConnected,
                msg:action.msg,
                error:action.error              
            }
        case UserTypes.UPDATE_PROFILE: 
            return {
                ...state,
                msg:action.msg,
                error:action.error
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
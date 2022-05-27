import { UITypes } from '../types'

interface DateParams {
    isEdit:boolean
    isLocked:boolean;
    isContact:boolean;
    isPreview:boolean;
    isChat:boolean;
}

const initData:DateParams = {
   isEdit:false,
   isLocked:false,
   isContact:false,
   isPreview:false,
   isChat:false,
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case UITypes.SET_IS_EDIT: 
            return {
                ...state,
                isEdit:action.isEdit
            }
        case UITypes.SET_IS_CONTACT: 
            return {
                ...state,
                isContact:action.isContact
            }
        case UITypes.SET_IS_PREVIEW: 
            return {
                ...state,
                isPreview:action.isPreview
            }
        case UITypes.SET_IS_CHAT: 
            return {
                ...state,
                isChat:action.isChat
            }
        case UITypes.HANDLE_LOCK: 
            return {
                ...state,
                isLocked:action.isLocked
            }
        default:
            return {
                ...state
            }
    }
}
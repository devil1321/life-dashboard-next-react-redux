import { UITypes } from '../types'

interface DateParams {
    isEdit:boolean
    isLocked:boolean;
}

const initData:DateParams = {
   isEdit:false,
   isLocked:false
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case UITypes.SET_IS_EDIT: 
            return {
                ...state,
                isEdit:action.isEdit
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
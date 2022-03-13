import { UITypes } from '../types'

interface DateParams {
    isEdit:boolean
}

const initData:DateParams = {
   isEdit:false
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case UITypes.SET_IS_EDIT: 
            return {
                ...state,
                isEdit:action.isEdit
            }
        default:
            return {
                ...state
            }
    }
}
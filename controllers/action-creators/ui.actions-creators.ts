import { UITypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'

export const setIsEdit = (state: boolean) => (dispatch:Dispatch<any>) =>{
    dispatch({
        type:UITypes.SET_IS_EDIT,
        isEdit:state
    })
}

export const handleLock = (isLocked:boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.HANDLE_LOCK,
        isLocked:isLocked,
    })
}
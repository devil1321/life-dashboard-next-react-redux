import { UITypes } from '../types'
import { Dispatch } from 'redux'
import store from '../store'

export const setIsEdit = (state: boolean) => (dispatch:Dispatch<any>) =>{
    dispatch({
        type:UITypes.SET_IS_EDIT,
        isEdit:state
    })
}

export const setIsContact = (state: boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.SET_IS_CONTACT,
        isContact:state
    })
}

export const setIsPreview = (state: boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.SET_IS_PREVIEW,
        isPreview:state
    })
}


export const setIsChat = (state: boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.SET_IS_CHAT,
        isChat:state
    })
}

export const handleLock = (isLocked:boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.HANDLE_LOCK,
        isLocked:isLocked,
    })
}
export const setIsOrders = (isOrders:boolean) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:UITypes.SET_IS_ORDERS,
        isOrders:isOrders,
    })
}
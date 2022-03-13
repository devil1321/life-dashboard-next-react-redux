import { UITypes } from '../types'
import { Dispatch } from 'redux'

export const setIsEdit = (state: boolean) => (dispatch:Dispatch<any>) =>{
    dispatch({
        type:UITypes.SET_IS_EDIT,
        isEdit:state
    })
}
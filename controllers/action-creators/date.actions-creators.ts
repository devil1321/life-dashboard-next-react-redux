import { DateTypes } from '../types'
import { Dispatch } from 'redux'


export const setDate = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:DateTypes.SET_DATE,
        date:new Date
    })
}
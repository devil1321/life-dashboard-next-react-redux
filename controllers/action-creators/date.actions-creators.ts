import { DateTypes } from '../types'
import { Dispatch } from 'redux'


export const setDate = (date:Date) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:DateTypes.SET_DATE,
        date:date
    })
}
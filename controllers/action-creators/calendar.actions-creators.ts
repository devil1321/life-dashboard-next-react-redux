import { CalendarTypes } from '../types'
import { Dispatch } from 'redux'

export const setActiveEvents = () => (dispatch:Dispatch<any>) =>{
    dispatch({
        type:CalendarTypes.SET_ACTIVE_EVENTS,
        events:[]
    })
} 
import { CalendarTypes } from '../types'

interface DateParams {
    events:Date[];
}

const initData:DateParams = {
    events:[]
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case CalendarTypes.SET_ACTIVE_EVENTS: 
            return {
                ...state,
                events:action.events
            }
        default:
            return {
                ...state
            }
    }
}
import { DateTypes } from '../types'

interface DateParams {
    date:Date;
}

const initData:DateParams = {
    date:new Date()
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case DateTypes.SET_DATE: 
            return {
                ...state,
                date:action.date
            }
        default:
            return {
                ...state
            }
    }
}
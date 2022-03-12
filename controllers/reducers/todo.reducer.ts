import { TodoTypes } from '../types'

interface Task {
    name: string;
    description: string;
    completed: boolean;
}

interface TodoState {
    isAvailable:boolean;
    tasks:Task[];
}

const initData:TodoState = {
    isAvailable:true,
    tasks:[]
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case TodoTypes.SET_TASKS: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.SET_COMPLETED: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.SET_UNCOMPLETED: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.CHECK_IS_AVAIBLE: 
            return {
                ...state,
                isAvailable:action.isAvailable
            }
        case TodoTypes.ADD_TASK: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.REMOVE_TASK: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.REMOVE_ALL: 
            return {
                ...state,
                tasks:[]
            }
        case TodoTypes.FILTER_ACTIVE: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.FILTER_COMPLETED: 
            return {
                ...state,
                tasks:action.tasks
            }
        case TodoTypes.FILTER_ALL: 
            return {
                ...state,
                tasks:action.tasks
            }
        default:
            return {
                ...state
            }
    }
}
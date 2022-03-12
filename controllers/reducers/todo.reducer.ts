import { Task } from '../../interfaces';
import { TodoTypes } from '../types'


interface TodoState {
    tasks:Task[];
    task:Task;
}

const initData:TodoState = {
    tasks:[],
    task:{}
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
        case TodoTypes.ADD_TASK: 
            return {
                ...state,
                tasks:action.tasks,
            }
        case TodoTypes.EDIT_TASK: 
            return {
                ...state,
                task:action.task
            }
        case TodoTypes.SAVE_TASK: 
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
                tasks:action.tasks
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
        default:
            return {
                ...state
            }
    }
}
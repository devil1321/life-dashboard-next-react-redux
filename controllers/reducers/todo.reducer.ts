import { Task } from '../../interfaces';
import { TodoTypes } from '../types'


interface TodoState {
    tasks:Task[];
    tempTasks:Task[]
    task:Task;
    isFiltered:boolean
}

const initData:TodoState = {
    tasks:[],
    tempTasks:[],
    task:{
        isOrder:false,
        userId:'',
        firebaseId:'',
        name:'',
        description:'',
        completed:false,
        date:new Date(),
    },
    isFiltered:false
}

export default (state = initData, action:any) =>{
    switch(action.type){
        case TodoTypes.SET_TASKS: 
            return {
                ...state,
                tempTasks:action.tasks,
                tasks:action.tasks
            }
        case TodoTypes.TRACK_TASKS: 
            return {
                ...state,
                tempTasks:action.tasks,
                tasks:action.tasks
            }
        case TodoTypes.SET_COMPLETED: 
            return {
                ...state,
                tempTasks:action.tempTasks
            }
        case TodoTypes.SET_UNCOMPLETED: 
            return {
                ...state,
                tempTasks:action.tempTasks
            }
        case TodoTypes.ADD_TASK: 
            return {
                ...state,
            }
        case TodoTypes.EDIT_TASK: 
            return {
                ...state,
                task:action.task
            }
        case TodoTypes.SAVE_TASK: 
            return {
                ...state,
                tempTasks:action.tempTasks
            }
        case TodoTypes.FILTER_BY_DATE: 
            return {
                ...state,
                tempTasks:action.tempTasks,
                isFiltered:action.isFiltered
            }

        case TodoTypes.REMOVE_TASK: 
            return {
                ...state,
                tasks:action.tasks,
                isFiltered:action.isFiltered
            }
        case TodoTypes.REMOVE_ALL: 
            return {
                ...state,
                tasks:action.tasks,
                tempTasks:action.tempTasks,
                isFiltered:action.isFiltered
            }
        case TodoTypes.FILTER_ACTIVE: 
            return {
                ...state,
                tempTasks:action.tempTasks,
                isFiltered:action.isFiltered
            }
        case TodoTypes.FILTER_COMPLETED: 
            return {
                ...state,
                tempTasks:action.tempTasks
            }
        case TodoTypes.FILTER_ALL: 
            return {
                ...state,
                tempTasks:action.tempTasks,
                isFiltered:action.isFiltered
            }
   
        default:
            return {
                ...state
            }
    }
}
import axios from 'axios'
import { TodoTypes } from '../types'
import { Dispatch } from 'redux'
import { Task } from '../../interfaces';
import  store  from '../store'
import moment from 'moment'

export const isAvailableTrue = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:'IS_AVAILABLE_TRUE',
        isAvailable:[]
    })
}

export const setTasks = () => async (dispatch:Dispatch<any>) => {
    const options:any = {
        method:'GET',
        url:'http://localhost:3000/api/tasks'
    }
    const data = await axios.request(options)
                    .then(res => res.data)
                    .catch(err => console.log(err))
    dispatch({
        type:TodoTypes.SET_TASKS,
        tasks:data.tasks,
        tempTasks:data.tasks
    })
}
export const setCompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:Task = tasks.find(task => task.id === id)
    task.completed = true
    dispatch({
        type:TodoTypes.SET_COMPLETED,
        tempTasks:tasks
    })
}
export const setUncompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:Task = tasks.find(task => task.id === id)
    task.completed = false

    dispatch({
        type:TodoTypes.SET_UNCOMPLETED,
        tempTasks:tasks
    })
}

export const addTask = (task: Task) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const isAvailable = tasks.filter((item: Task) => moment(item.date).format('DD-MM-YYYY') === moment(task.date).format('DD-MM-YYYY'))
    if(isAvailable.length === 0){
        tasks.push(task)
    }
    dispatch({
        type:TodoTypes.ADD_TASK,
        tempTasks:tasks,
        isAvailable:isAvailable,
    })
}

export const editTask = (id:string ) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task = tasks.find((task:Task) => task.id === id)
    console.log(tasks)
    dispatch({
        type:TodoTypes.EDIT_TASK,
        task:task
    })
}
export const filterByDate = (date:Date ) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => moment(task.date).format('DD-MM-YYYY') === date)
    dispatch({
        type:TodoTypes.FILTER_BY_DATE,
        tempTasks:tasks,
        isFiltered:true,
    })
}

export const saveTask = (id: string,task: Task,) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.find((item:Task) => item.id === id)
    tasks.name = task.name
    tasks.description = task.description
    tasks.completed = task.completed
    tasks.date = task.date

    dispatch({
        type:TodoTypes.SAVE_TASK,
        tempTasks:tasks
    })
}

export const removeTask = (id: string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => task.id !== id)
    dispatch({
        type:TodoTypes.REMOVE_TASK,
        tempTasks:tasks,
        tasks:tasks
    })
}

export const filterActive = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
    const tempTasks:Task[] = tasks.filter((task:Task) => task.completed === false)
    dispatch({
        type:TodoTypes.FILTER_ACTIVE,
        tempTasks:tempTasks,
        isFiltered:false,
    })
}

export const filterCompleted = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
    const tempTasks:Task[] = tasks.filter((task:Task) => task.completed === true)
    dispatch({
        type:TodoTypes.FILTER_COMPLETED,
        tempTasks:tempTasks,
        isFiltered:false,
    })
}

export const filterAll = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:TodoTypes.FILTER_ALL,
        tempTasks:tasks,
        isFiltered:false,
    })
}


export const removeAll = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:TodoTypes.REMOVE_ALL,
        tempTasks:[],
        tasks:[],
        isFiltered:false,
    })
}

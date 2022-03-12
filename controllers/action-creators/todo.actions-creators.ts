import axios from 'axios'
import { TodoTypes } from '../types'
import { Dispatch } from 'redux'
import { Task } from '../../interfaces';
import store from '../store'

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
        tasks:data.tasks
    })
}
export const setCompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:Task = tasks.find(task => task.id === id)
    task.completed = true
    
    dispatch({
        type:TodoTypes.SET_COMPLETED,
        tasks:tasks
    })
}
export const setUncompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:Task = tasks.find(task => task.id === id)
    task.completed = false

    dispatch({
        type:TodoTypes.SET_UNCOMPLETED,
        tasks:tasks
    })
}

export const addTask = (task: Task) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const isAvailable = tasks.find((item: Task) => {
        if(item.date === task.date){
            return false
        }else{
            return true
        }})
    if(isAvailable){
        tasks.push(task)
    }
    dispatch({
        type:TodoTypes.ADD_TASK,
        tasks:tasks,
        isAvailable:isAvailable,
    })
}

export const editTask = (id:string ) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task = tasks.find((task:Task) => task.id === id)
    dispatch({
        type:TodoTypes.EDIT_TASK,
        task:task
    })
}

export const saveTask = (id: string,task: Task,) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const tempTask = tasks.find((item:Task) => item.id === id)
    tempTask.name = task.name
    tempTask.description = task.description
    tempTask.completed = task.completed
    tempTask.date = task.date

    dispatch({
        type:TodoTypes.SAVE_TASK,
        tasks:tasks
    })
}

export const removeTask = (id: string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => task.id !== id)
    dispatch({
        type:TodoTypes.REMOVE_TASK,
        tasks:tasks
    })
}
export const removeAll = () => (dispatch:Dispatch<any>) => {
    dispatch({
        type:TodoTypes.REMOVE_ALL,
        tasks:[]
    })
}

export const filterActive = () => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => task.completed === false)
    dispatch({
        type:TodoTypes.FILTER_ACTIVE,
        tasks:tasks
    })
}

export const filterCompleted = () => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => task.completed === true)
    dispatch({
        type:TodoTypes.FILTER_COMPLETED,
        tasks:tasks
    })
}

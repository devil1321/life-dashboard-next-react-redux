import axios from 'axios'
import { TodoTypes } from '../types'
import { Dispatch } from 'redux'
import { Task } from '../../interfaces';
import  store  from '../store'
import moment from 'moment'
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPB_ibh5yK49GwSHCAHGlCEhGlVBuq2i0",
    authDomain: "company-life-admin.firebaseapp.com",
    projectId: "company-life-admin",
    storageBucket: "company-life-admin.appspot.com",
    messagingSenderId: "1051805480691",
    appId: "1:1051805480691:web:4dca6e5fe4b5e10558e986",
    measurementId: "G-KTGFRZ262D"
};

initializeApp(firebaseConfig)
const db = getFirestore() 
const colRefTasks = collection(db,'tasks')


export const setTasks = () => async (dispatch:Dispatch<any>) => {
    let tasks:Task[] = []
    getDocs(colRefTasks)
        .then((snapshot)=>{
            tasks = [];
            snapshot.docs.forEach((doc:any)=>{
                tasks.push({...doc.data(), firebaseId:doc.id})
                console.log(tasks)
           
        })
    }).then(()=>{
        dispatch({
            type:TodoTypes.SET_TASKS,
            tasks:tasks,
            tempTasks:tasks,
        })
    })
}

export const setCompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:(Task | any) = tasks.find(task => task.firebaseId === id)
    task.completed = true
    const docRef = doc(db,'tasks',id)
    updateDoc(docRef,{
        completed:true,
    }).then(()=>{
        dispatch({
            type:TodoTypes.SET_COMPLETED,
            tempTasks:tasks
        })
    }).catch(err => console.log(err))
   
}
export const setUncompleted = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:(Task | any) = tasks.find(task => task.firebaseId === id)
    task.completed = false
    const docRef = doc(db,'tasks',id)
    updateDoc(docRef,{
        completed:false,
    }).then(()=>{
        dispatch({
            type:TodoTypes.SET_UNCOMPLETED,
            tempTasks:tasks
        })
    }).catch(err => console.log(err))
}

export const addTask = (task: Task) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    tasks.push(task)
    addDoc(colRefTasks,task)
        .then(()=>{
            dispatch({
                type:TodoTypes.ADD_TASK,
                tempTasks:tasks,
                tasks:tasks,
            })
        })
        .catch(err => console.log(err)) 
}

export const editTask = (id:string ) => (dispatch:Dispatch<any>) => {
    const task:Task = store.getState().todo.tasks.find((task:Task) => task.firebaseId === id)
    dispatch({
        type:TodoTypes.EDIT_TASK,
        task:task
    })
}
export const filterByDate = (date: Date) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => moment(task.date).format('MM-DD-YYYY') === date)
    dispatch({
        type:TodoTypes.FILTER_BY_DATE,
        tempTasks:tasks,
        isFiltered:true,
    })
}

export const saveTask = (id: string,task: Task,) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const tempTask:Task = tasks.find((item:Task) => item.firebaseId === id) as Task
    tempTask.name = task.name
    tempTask.description = task.description
    tempTask.completed = task.completed
    tempTask.date = task.date

    const docRef = doc(db,'tasks',id)
    updateDoc(docRef,{
        name:task.name,
        description:task.description,
        completed:task.completed,
        date:task.date,
    }).then(()=>{
         dispatch({
            type:TodoTypes.SAVE_TASK,
            tempTasks:tasks
        })
    })
   
}

export const removeTask = (id: string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks.filter((task:Task) => task.firebaseId !== id)
    const docRef = doc(db,"tasks",id)
    deleteDoc(docRef)
        .then(()=>{
            dispatch({
                type:TodoTypes.REMOVE_TASK,
                tempTasks:tasks,
                tasks:tasks
            })
        })
        .catch(err => console.log(err)) 
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
     const tasks:Task[] = store.getState().todo.tasks
     tasks.forEach((task:Task) => {
         const id:string = task.firebaseId as string
         const docRef = doc(db,"tasks",id)
         deleteDoc(docRef).catch(err => console.log(err))
     })
    dispatch({
        type:TodoTypes.REMOVE_ALL,
        tempTasks:[],
        tasks:[],
        isFiltered:false,
    })
}

import axios from 'axios'
import { TodoTypes } from '../types'
import { Dispatch } from 'redux'
import { Task } from '../../interfaces';
import  store  from '../store'
import moment from 'moment'
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc, onSnapshot,query,where,getDoc,updateDoc } from 'firebase/firestore'
import * as CryptoJS from 'crypto-js'
import { JsonFormatter } from '../../modules/json-formatter.module'

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
const q = query(colRefTasks)

export const setTasks = (id:string) => async (dispatch:Dispatch<any>) => {
    let tasks:Task[] = []
    getDocs(colRefTasks)
        .then((snapshot)=>{
            tasks = [];
            snapshot.docs.forEach((doc:any)=>{
                tasks.push({...doc.data(), firebaseId:doc.id})
            })
        }).then(async()=>{
            const encryptedTasks = tasks.filter((t:Task) => t.userId === id)
            const finalTasks =  await Promise.all(encryptedTasks.map(async(t:Task)=>{
                t.name = await CryptoJS.AES.decrypt(t.name, "Task", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                t.description = await CryptoJS.AES.decrypt(t.description, "Task", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                return t
            }))
            dispatch({
                type:TodoTypes.SET_TASKS,
                tasks:finalTasks,
                tempTasks:finalTasks,
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
export const setOrderFullfiled = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:(Task | any) = tasks.find(task => task.firebaseId === id)
    task.isRejected = false
    const docRef = doc(db,'tasks',id)
    updateDoc(docRef,{
        isRejected:false,
    }).then(()=>{
        dispatch({
            type:TodoTypes.SET_ORDER_FULLFILLED,
            tempTasks:tasks
        })
    }).catch(err => console.log(err))
   
}
export const setOrderRejected = (id:string) => (dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const task:(Task | any) = tasks.find(task => task.firebaseId === id)
    task.isRejected = true
    const docRef = doc(db,'tasks',id)
    updateDoc(docRef,{
        isRejected:true,
    }).then(()=>{
        dispatch({
            type:TodoTypes.SET_ORDER_REJECTED,
            tempTasks:tasks
        })
    }).catch(err => console.log(err))
}

export const addTask = (task: Task) => (dispatch:Dispatch<any>) => {
    task.name = CryptoJS.AES.encrypt(task.name, "Task", {
        format: JsonFormatter
   }).toString();
    task.description = CryptoJS.AES.encrypt(task.description, "Task", {
        format: JsonFormatter
   }).toString();
    addDoc(colRefTasks,task)
        .then(()=>{
            dispatch({
                type:TodoTypes.ADD_TASK,
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
export const filterByDate = (date: Date,tasks: Task[]) => (dispatch:Dispatch<any>) => {
    const tempTasks:Task[] = tasks.filter((task:Task) => moment(task.date).format('MM-DD-YYYY') === date)
    dispatch({
        type:TodoTypes.FILTER_BY_DATE,
        tempTasks:tempTasks,
        isFiltered:true,
    })
}

export const saveTask =  (id: string,task: Task,) => async(dispatch:Dispatch<any>) => {
    const tasks:Task[] = store.getState().todo.tasks
    const tempTask:Task = tasks.find((item:Task) => item.firebaseId === id) as Task
    tempTask.completed = task.completed
    tempTask.date = task.date
    if(task.isRejected){
        tempTask.isRejected = task.isRejected
    }
    tempTask.name = await CryptoJS.AES.encrypt(task.name, "Task", {
        format: JsonFormatter
   }).toString();
   tempTask.description = await CryptoJS.AES.encrypt(task.description, "Task", {
        format: JsonFormatter
   }).toString();
    const docRef = doc(db,'tasks',id)
    await updateDoc(docRef,{
        name:tempTask.name,
        description:tempTask.description,
        completed:tempTask.completed,
        date:tempTask.date,
        ...(tempTask.isRejected !== undefined) && { isRejected:tempTask.isRejected }
    }).then(()=>{
         dispatch({
            type:TodoTypes.SAVE_TASK,
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
export const filterFullfilled = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
    const tempTasks:Task[] = tasks.filter((task:Task) => task.isRejected === false)
    dispatch({
        type:TodoTypes.FILTER_FULLFILLED,
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
export const filterRejected = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
    const tempTasks:Task[] = tasks.filter((task:Task) => task.isRejected === true)
    dispatch({
        type:TodoTypes.FILTER_REJECTED,
        tempTasks:tempTasks,
        isFiltered:false,
    })
}


export const removeAll = (tasks:Task[]) => (dispatch:Dispatch<any>) => {
     tasks.forEach((task:Task) => {
         const id:string = task.firebaseId as string
         const docRef = doc(db,"tasks",id)
         deleteDoc(docRef).catch(err => console.log(err))
     })
    dispatch({
        type:TodoTypes.REMOVE_ALL,
        isFiltered:false,
        tempTasks:[],
    })
}

export const setRejected = () => (dispatch:Dispatch<any>) => {
    const orders = store.getState().todo.tasks.filter((t:Task) => t.isOrder === true)
    const rejections = orders.filter((o:Task) => o.isRejected === true)
    dispatch({
        type:TodoTypes.SET_REJECTED_ORDERS,
        rejectedOrders:rejections
    })
}

export const traceChanges = (id:string) => (dispatch:Dispatch<any>) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tasks:any = [];
        new Promise((resolve,reject)=>{
            querySnapshot.forEach((doc) => {
                tasks.push({...doc.data(),firebaseId:doc.id});
            })
            resolve(tasks)
        }).then(async(tasks:any)=>{
            const encryptedTasks = tasks.filter((t:Task) => t.userId === id)
            const finalTasks =  await Promise.all(encryptedTasks.map(async(t:Task)=>{
                t.name = await CryptoJS.AES.decrypt(t.name, "Task", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                t.description = await CryptoJS.AES.decrypt(t.description, "Task", {
                    format: JsonFormatter
                }).toString(CryptoJS.enc.Utf8);
                return t
            }))

            dispatch({
                type:TodoTypes.TRACK_TASKS,
                tasks:finalTasks
            })
        })
      });
}


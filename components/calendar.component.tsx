import React, { useState,useEffect } from 'react'
import Calendar from 'react-calendar'
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'
import * as DateActions from '../controllers/action-creators/date.actions-creators'
import { State } from '../controllers/reducers';
import { Task } from '../interfaces';


const CalendarWrapper:React.FC = () => {
  
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [elements,setElements] = useState<any>(null)
  const [date,setDate] = useState<Date>(new Date())
  const dispatch = useDispatch()
  const { tasks } = useSelector((state:State) => state.todo)
  const { isOrders } = useSelector((state:State) => state.ui)
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const dateActions = bindActionCreators(DateActions,dispatch)

  const handlePreviewTask = (e:any) => {
    const date = e.target.querySelector('abbr').getAttribute('aria-label')
    dateActions.setDate(moment(date).format('MM-DD-YYYY'))
    if(isOrders){
      todoActions.filterByDate(date,tasks.filter((t:Task)=> t.isOrder === true))
     }else{
      todoActions.filterByDate(date,tasks.filter((t:Task)=> t.isOrder === false))
     }
  }

  const handleEvents = () =>{
    setTimeout(()=>{
       const datesWrappers = document.querySelectorAll('.react-calendar__tile') as NodeListOf<HTMLDivElement>
       datesWrappers.forEach((wrapper:HTMLDivElement)=>{

        const tempDate = wrapper.querySelector('abbr')!.getAttribute('aria-label')
        wrapper.style.backgroundColor = 'transparent'
        const today = new Date()
        if(moment(tempDate).format('MM-DD-YYYY') === moment(today).format('MM-DD-YYYY')){
          wrapper.style.backgroundColor = 'rgb(15, 141, 108)'
        } 
        tasks?.length > 0 && tasks.map((task:Task) =>{
          const uncompleted:Task[] = tasks.filter((t:Task) => t.completed === false && moment(t.date).format('MM-DD-YYYY') === moment(tempDate).format('MM-DD-YYYY'))
           if(moment(task.date).format('MM-DD-YYYY') === moment(tempDate).format('MM-DD-YYYY')){
             if(task.completed === false){
               wrapper.style.backgroundColor = 'red'
              }else if(uncompleted.length === 0){
               wrapper.style.backgroundColor = 'yellowgreen'
              }
           }
         })
        })
      },200)
  }

  const handleEvent = (el:any,els:any,event:any,fn:any) => {
    if(el !== null){
      el.addEventListener(event,fn)
    }
    if(els !== null){
      els.forEach((el:any) => el.addEventListener(event,fn)) 
    }
  }

  useEffect(()=>{
 
    if(!isLoad){
      handleEvents()  
      setTimeout(()=>{
        setIsLoad(true)
      },500)
    }else{
        if(elements === null){
          setElements(document.querySelectorAll('.react-calendar__tile'))
        }else{
          handleEvent(null,elements,'click',handlePreviewTask)
        }
    }
    handleEvents()  
  },[tasks,isLoad,date,elements])

  return (
    <Calendar   
        onChange={setDate}
        formatLongDate={(locale, date) => moment(date).format('MM-DD-YYYY')}
        value={date}
    />
  )
}

export default CalendarWrapper
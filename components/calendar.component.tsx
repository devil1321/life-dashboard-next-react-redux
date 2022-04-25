import React, { useState,useEffect } from 'react'
import Calendar from 'react-calendar'
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'
import * as DateActions from '../controllers/action-creators/date.actions-creators'
import { State } from '../controllers/reducers';
import { Task } from '../interfaces';

interface CalendarWrapperProps{
  isUpdated:boolean;
}

const CalendarWrapper:React.FC<CalendarWrapperProps> = ({isUpdated}) => {
  
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [date,setDate] = useState<Date>(new Date())

  const dispatch = useDispatch()
  const { tasks } = useSelector((state:State) => state.todo)
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const dateActions = bindActionCreators(DateActions,dispatch)

  const handlePreviewTask = (e:any) => {
    const date = e.target.querySelector('abbr').getAttribute('aria-label')
    dateActions.setDate(moment(date).format('MM-DD-YYYY'))
    todoActions.filterByDate(moment(date).format('MM-DD-YYYY'))
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
           if(moment(task.date).format('MM-DD-YYYY') === moment(tempDate).format('MM-DD-YYYY')){
             if(task.completed === false){
               wrapper.style.backgroundColor = 'red'
              }else{
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
    handleEvent(null,document.querySelectorAll('.react-calendar__tile'),'click',handlePreviewTask)
    handleEvent(null,document.querySelectorAll('button'),'click',handleEvents)
    if(!isLoad){
      handleEvents()  
      setTimeout(()=>{
        setIsLoad(true)
      },500)
    }
    handleEvents()  
  },[isUpdated,isLoad,date])

  return (
    <Calendar   
        onChange={setDate}
        formatLongDate={(locale, date) => moment(date).format('MM-DD-YYYY')}
        value={date}
    />
  )
}

export default CalendarWrapper
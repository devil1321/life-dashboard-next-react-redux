import React, { useState,useEffect } from 'react'
import Calendar from 'react-calendar'
import moment from "moment";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'
import * as DateActions from '../controllers/action-creators/date.actions-creators'

const CalendarWrapper:React.FC = () => {
  const [date,setDate] = useState<Date>(new Date())

  const dispatch = useDispatch()
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const dateActions = bindActionCreators(DateActions,dispatch)

  const previewTask = (e) => {
    const date = e.target.querySelector('abbr').getAttribute('aria-label')
    dateActions.setDate(moment(date).format('DD-MM-YYYY'))
    todoActions.filterByDate(moment(date).format('DD-MM-YYYY'))
  }


  const handleEvent = (el:any,els:any,event:any,fn:()=> void) => {
    if(el){
      el.addEventListener(event,fn)
    }
    if(els){
      els.forEach((el:any) => el.addEventListener(event,fn)) 
    }
  }

  useEffect(()=>{
    handleEvent(null,document.querySelectorAll('.react-calendar__tile'),'click',previewTask)
  },[])

  return (
    <Calendar   
        onChange={setDate}
        formatLongDate={(locale, date) => moment(date).format()}
        value={date}
    />
  )
}

export default CalendarWrapper
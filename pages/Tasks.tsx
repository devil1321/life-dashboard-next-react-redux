import React,{ useState } from 'react'
import { NextPage } from 'next'
import { WheatherProps } from '../interfaces'
import { fetchWheather } from '../modules/api.module'
import Layout from '../components/layout.component'
import TodoMainComponent from '../components/todo-components/todo.component'
import CalendarWrapper from '../components/calendar.component'
import WheatherWidget from '../components/wheather-widget.component'

interface TasksProps {
    data:{
        wheather:WheatherProps
    }
}

const TasksPage:NextPage<TasksProps> = ({data}) => {


  return(
    <Layout title="Tasks">
        <div className="tasks">
            <div className="tasks__left-panel">
                <TodoMainComponent />
            </div>
            <div className="tasks__right-panel">
                <CalendarWrapper  />
                <WheatherWidget data={data.wheather}/>
            </div>
        </div>
    </Layout>
  )
}

export default TasksPage


export async function getStaticProps(){
  
    const wheather = await fetchWheather()
    return {
        props:{
           data:{
               wheather:wheather
           }
        }
    }

}
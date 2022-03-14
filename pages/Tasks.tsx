import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import { WheatherProps } from '../interfaces'
import {fetchWheather } from '../modules/api.module'
import Layout from '../components/layout.component'
import Todo from '../components/todo.component'
import CalendarWrapper from '../components/calendar.component'
import WheatherWidget from '../components/wheather-widget.component'

interface TasksProps {
    data:{
        wheather:WheatherProps
    }
}

const Tasks:NextPage<TasksProps> = ({data}) => {
  return (
    <Layout title="Tasks">
        <div className="tasks">
            <div className="tasks__left-panel">
                <Todo />
            </div>
            <div className="tasks__right-panel">
                <CalendarWrapper />
                <WheatherWidget data={data.wheather}/>
            </div>
        </div>
    </Layout>
  )
}

export default Tasks


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
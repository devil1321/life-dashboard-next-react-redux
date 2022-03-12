import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'

import Layout from '../components/layout.component'
import Todo from '../components/todo.component'
import CalendarWrapper from '../components/calendar.component'
import WheatherWidget from '../components/wheather-widget.component'
const Tasks:NextPage = ({data}) => {
    console.log(data)
  return (
    <Layout title="Tasks">
        <div className="tasks">
            <div className="tasks__left-panel">
                <Todo />
            </div>
            <div className="tasks__right-panel">
                <CalendarWrapper />
                <WheatherWidget data={data}/>
            </div>
        </div>
    </Layout>
  )
}

export default Tasks


export async function getStaticProps(){
    const city = await axios.get('https://extreme-ip-lookup.com/json/')
    .then(res => {
        let city
        if (res.data.city === '') {
            return city = 'Warsaw'
        } else {
            return res.data.city
        }
    })
    .catch(err => console.log(err))

    const wheartherData = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    }).then(data =>{
      return data.data
    }).catch(err => console.log(err))
    
    return {
        props:{
           data:wheartherData
        }
    }

}
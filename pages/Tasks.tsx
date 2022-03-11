import { NextPage } from 'next'
import React from 'react'
import LazyLayout from '../components/lazy-layout.component'

const Tasks:NextPage = () => {
  return (

    <LazyLayout title="Tasks">
        <div>Tasks</div>
    </LazyLayout>
  )
}

export default Tasks
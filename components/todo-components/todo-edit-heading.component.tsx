import React, { useEffect } from 'react'
import moment from 'moment'

interface TaskFormData{
    name:string;
    description:string;
    completed:boolean;
    date:Date
}

interface EditHeadingProps{
    taskFormData:TaskFormData
    handleTaskFormData:(e:any) => any
    handleDate:(e:any) => void
}

const EditHeading:React.FC<EditHeadingProps> = ({taskFormData,handleTaskFormData,handleDate}) => {
  return (
    <div className="todo__edit-heading">
        <input value={taskFormData.name} data-val="name" onChange={(e)=>handleTaskFormData(e)}/>
        <span>{moment(taskFormData.date).format('DD-MM-YYYY')}</span>
        <div className="todo__edit-date">
            <input type="date" name="" id="" onChange={(e)=>handleDate(e)} />
        </div>
    </div>
  )
}

export default EditHeading
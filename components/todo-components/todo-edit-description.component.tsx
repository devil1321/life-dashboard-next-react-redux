import React from 'react'

interface TaskFormData{
    name:string;
    description:string;
    completed:boolean;
    date:Date
}

interface EditDescriptionProps{
    taskFormData:TaskFormData
    handleTaskFormData:(e:any) => void
}

const EditDescription:React.FC<EditDescriptionProps> = ({taskFormData,handleTaskFormData}) => {
  return (
    <textarea value={taskFormData.description} data-val="description" onChange={(e)=>handleTaskFormData(e)}/>
  )
}

export default EditDescription
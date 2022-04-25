import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

interface EditCompletedButtonProps{
    handleTaskFormData:(e:any) => void
}

const EditCompletedButton:React.FC<EditCompletedButtonProps> = ({handleTaskFormData}) => {
  return (
    <button className="todo__btn-finished" data-val="completed" value={"true"} onClick={(e)=>handleTaskFormData(e)}>
    <FontAwesomeIcon icon ={faCheckDouble} />
     Completed
   </button>
  )
}

export default EditCompletedButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface EditUcompletedButtonProps{
    handleTaskFormData:(e:any) => void
}

const EditUncompletedButton:React.FC<EditUcompletedButtonProps> = ({handleTaskFormData}) => {
  return (
    <button className="todo__btn-pending" data-val="completed" value={"false"} onClick={(e)=>handleTaskFormData(e)}>
     <FontAwesomeIcon icon ={faXmark} />  
      Uncompleted
    </button>
  )
}

export default EditUncompletedButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface EditUcompletedButtonProps{
    handleTaskFormData:(e:any) => void
    dataVal:string;
    text:string;
}

const EditUncompletedButton:React.FC<EditUcompletedButtonProps> = ({text,dataVal,handleTaskFormData}) => {
  return (
    <button className="todo__btn-pending" data-val={dataVal}value={"false"} onClick={(e)=>handleTaskFormData(e)}>
     <FontAwesomeIcon icon ={faXmark} />  
     {text}
    </button>
  )
}

export default EditUncompletedButton
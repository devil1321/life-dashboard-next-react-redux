import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

interface EditCompletedButtonProps{
    handleTaskFormData:(e:any) => void
    dataVal:string;
    text:string;
}

const EditCompletedButton:React.FC<EditCompletedButtonProps> = ({text,dataVal,handleTaskFormData}) => {
  return (
    <button className="todo__btn-finished" data-val={dataVal} value={"true"} onClick={(e)=>handleTaskFormData(e)}>
    <FontAwesomeIcon icon ={faCheckDouble} />
    {text}
   </button>
  )
}

export default EditCompletedButton
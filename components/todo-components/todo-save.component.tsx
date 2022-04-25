import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface SaveProps{
    handleTodoSaveFn:() => void
}

const Save:React.FC<SaveProps> = ({handleTodoSaveFn}) => {
  return (
    <div className="todo__save" onClick={()=>{
        handleTodoSaveFn()
        }}>
          <FontAwesomeIcon icon ={faSave} />
      </div>
  )
}

export default Save
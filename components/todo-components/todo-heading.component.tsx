import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../../animations/icons-json/1121-iota-internet-of-things.json'
import Todo from './todo.components'

interface HeadingProps {
    isEdit:boolean;
    handleTodoSaveFn:() => void
}

const Heading:React.FC<HeadingProps> = ({isEdit,handleTodoSaveFn}) => {
  return (
    <div className="todo__heading">
        <h2>Tasks</h2>
        <Player
          loop
          autoplay
          src={icon}
          style={{ height: '60px', width: '60px' }}
        />
         {isEdit && <Todo.Save handleTodoSaveFn={handleTodoSaveFn} />}
    </div>
  )
}

export default Heading
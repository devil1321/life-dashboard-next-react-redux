import React,{ MutableRefObject, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../../animations/icons-json/1121-iota-internet-of-things.json'
import Todo from './todo.components'

interface HeadingProps {
    isEdit:boolean;
    handleTodoSaveFn:() => void
    setIsOrders:(state:boolean)=> any
    
}

const Heading:React.FC<HeadingProps> = ({isEdit,handleTodoSaveFn,setIsOrders}) => {

  const typesMenuRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleMenu = (element:MutableRefObject<HTMLDivElement>):void =>{
    if(element.current.classList.contains('--close')){
        element.current.style.visibility = 'visible'
        element.current.classList.remove('--close')
        element.current.classList.add('--open')

    }else{
        setTimeout(()=>{
            element.current.style.visibility = 'hidden'
        },600)
        element.current.classList.remove('--open')
        element.current.classList.add('--close')

    }
}

  return (
    <div className="todo__heading">
        <div className="todo__type-controls">
          <button className="todo__heading-choice" onClick={()=>handleMenu(typesMenuRef)}>Type</button>
          <div className="todo__types --close" ref={typesMenuRef}>
            <div onClick={()=>{
              setIsOrders(true)
              handleMenu(typesMenuRef)
            }} className="todo__type">Orders</div>
            <div onClick={()=>{
              setIsOrders(false)
              handleMenu(typesMenuRef)
            }} className="todo__type">Tasks</div>
          </div>
        </div>
        <h2>Tasks</h2>
        <div className="todo__player">
          <Player
            loop
            autoplay
            src={icon}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
         {isEdit && <Todo.Save handleTodoSaveFn={handleTodoSaveFn} />}
    </div>
  )
}

export default Heading
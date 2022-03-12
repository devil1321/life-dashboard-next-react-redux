import React,{ useRef } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
interface TodoItemProps {
    task:{
        name:string;
        description:string;
        completed:boolean;
        date:Date;
    }
}

const TodoItem:React.FC<TodoItemProps> = ({task}) => {
  
    const {name,completed,date} = task

    const menuRef = useRef<HTMLDivElement>()
    const btnRef = useRef<HTMLDivElement>()

    
    const handleMenu = () => {
        if(!btnRef.current.classList.contains('active')){
            btnRef.current.classList.add('active')
            menuRef.current.classList.add('active')
        }else{
            menuRef.current.classList.remove('active')
            btnRef.current.classList.remove('active')
        }
    }

    const handleMenuClose = () => {
        menuRef.current.classList.remove('active')
        btnRef.current.classList.remove('active')
    }
  
    return (
        <div className="todo-item">
            <div className="todo-item__heading">
                <h3>{name}</h3>
            </div>
            <div className="todo-item__info">
                <span>{moment(date).format('DD-MM-YYYY')}</span>
                    {completed
                        ? <div className="todo-item__completed"><FontAwesomeIcon icon ={faCheckDouble} /></div>
                        : <div className="todo-item__pending"><FontAwesomeIcon icon ={faXmark} /></div>
                    }
                <div className="todo-item__btn" ref={btnRef} onClick={()=>handleMenu()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="todo-item__menu" ref={menuRef}> 
                    <div className="todo-item__item-inner" onClick={()=>handleMenuClose()}> 
                    <   FontAwesomeIcon icon ={faPenToSquare} />
                        <h3>Edit</h3>
                    </div>
                    {completed 
                     ? <div className="todo-item__item-inner" onClick={()=>handleMenuClose()}> 
                        <FontAwesomeIcon icon ={faXmark} />  
                        <h3>Unmpleted</h3>
                    </div>
                     : <div className="todo-item__item-inner" onClick={()=>handleMenuClose()}> 
                        <FontAwesomeIcon icon ={faCheckDouble} />
                        <h3>Completed</h3>
                    </div>
                    }
                    <div className="todo-item__item-inner" onClick={()=>handleMenuClose()}>
                        <FontAwesomeIcon icon ={faTrash} />
                        <h3>Remove</h3>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TodoItem
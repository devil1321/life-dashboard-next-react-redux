import React,{ useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as TodoActions from '../../controllers/action-creators/todo.actions-creators'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface TodoItemProps {
    handleEdit:any,
    task:{
        firebaseId?:string;
        isRejected?:boolean;
        isOrder:boolean;
        name:string;
        description:string;
        completed:boolean;
        date:Date;
    }
}

const Item:React.FC<TodoItemProps> = ({task,handleEdit}) => {
  
    const { firebaseId ,isOrder, name, completed, date } = task
    const isRejected = task?.isRejected 
    const dispatch = useDispatch()
    const todoActions = bindActionCreators(TodoActions,dispatch) 

    const menuRef = useRef<HTMLDivElement | null>(null)
    const btnRef = useRef<HTMLDivElement | null>(null)

    
    const handleMenu = () => {
        if(btnRef.current && menuRef.current){
            if(!btnRef.current.classList.contains('active')){
                btnRef.current.classList.add('active')
                menuRef.current.classList.add('active')
            }else{
                menuRef.current.classList.remove('active')
                btnRef.current.classList.remove('active')
            }
        }
    }

    const handleMenuClose = () => {
        if(menuRef.current && btnRef.current){
            menuRef.current.classList.remove('active')
            btnRef.current.classList.remove('active')
        }
    }
  
    return (
        <div className="todo-item">
            <div className="todo-item__heading">
                <h3>{name}</h3>
            </div>
            <div className="todo-item__info">
                <span className="todo-item__order">{isOrder ? "Order" : "Task"}</span>
                <span>{moment(date).format('MM-DD-YYYY')}</span>
                    <React.Fragment>
                     {completed !== undefined && 
                        <React.Fragment>{
                            completed
                            ? <div className="todo-item__completed"><FontAwesomeIcon icon ={faCheckDouble} /></div>
                            : <div className="todo-item__pending"><FontAwesomeIcon icon ={faXmark} /></div>
                        }</React.Fragment>
                    }</React.Fragment>
                    
                <div className="todo-item__btn" ref={btnRef} onClick={()=>handleMenu()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="todo-item__menu" ref={menuRef}> 
                    <div className="todo-item__item-inner" onClick={()=>{
                        handleMenuClose()
                        todoActions.editTask(firebaseId as string)
                        setTimeout(()=>{
                            handleEdit(true)
                        },100)
                    }}> 
                        <FontAwesomeIcon icon ={faPenToSquare} />
                        <h3>Edit</h3>
                    </div>
                    {completed !== undefined &&
                        <React.Fragment>
                            {completed
                              ? <div className="todo-item__item-inner" onClick={()=>{
                                  todoActions.setUncompleted(firebaseId as string)
                                  handleMenuClose()
                                 }}> 
                                 <FontAwesomeIcon icon ={faXmark} />  
                                 <h3>Uncompleted</h3>
                             </div>
                              : <div className="todo-item__item-inner" onClick={()=>{
                                  handleMenuClose()
                                  todoActions.setCompleted(firebaseId as string)
                                 }}> 
                                 <FontAwesomeIcon icon ={faCheckDouble} />
                                 <h3>Completed</h3>
                             </div>
                        }</React.Fragment>}
                    {isRejected !== undefined &&  
                     <React.Fragment>
                        {isRejected
                             ? <div className="todo-item__item-inner" onClick={()=>{
                                     todoActions.setOrderFullfiled(firebaseId as string)
                                     todoActions.setCompleted(firebaseId as string)
                                     handleMenuClose()
                                    }}> 
                                    <FontAwesomeIcon icon ={faCheckDouble} />
                                    <h3>Fullfill</h3>
                                </div>
                             : <div className="todo-item__item-inner" onClick={()=>{
                                    handleMenuClose()
                                    todoActions.setOrderRejected(firebaseId as string)
                                    }}> 
                                    <FontAwesomeIcon icon ={faXmark} />  
                                    <h3>Reject</h3>
                                </div>
                    }</React.Fragment>}
                    <div className="todo-item__item-inner" onClick={()=>{
                        todoActions.removeTask(firebaseId as string)
                        handleMenuClose()
                        }}>
                        <FontAwesomeIcon icon ={faTrash} />
                        <h3>Remove</h3>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Item
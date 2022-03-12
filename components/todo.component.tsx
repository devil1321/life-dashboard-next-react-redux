import React,{ useEffect , useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../controllers/reducers'
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../animations/icons-json/1121-iota-internet-of-things.json'
import { Task } from '../interfaces';
import TodoItem from './todo-item.component';


const Todo:React.FC = () => {

  const { tasks } = useSelector((state:State) => state.todo)
  const dispatch = useDispatch()
  const todoActions = bindActionCreators(TodoActions,dispatch)

  const handleBtn = (e:any) =>{
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }
  
  useEffect(()=>{
    todoActions.setTasks()
  },[])
    

 
  return (
    <div className="todo">
        <div className="todo__heading">
          <h2>Tasks</h2>
          <Player
            loop
            autoplay
            src={icon}
            style={{ height: '60px', width: '60px' }}
          />
          </div>
        <div className="todo__form">
          <form action="">
            <div className="todo__field">
              <input type="text" placeholder='Add Task...' />
              <div className="todo__date" >
                <input type="date" name="" id="" />
              </div>
              <button>Add Task</button>
            </div>
          </form>
        </div>
        <div className="todo__body">
          {tasks.length > 0 && tasks.map((task:Task) => <TodoItem task={task} /> )}
        </div>
        <div className="todo__footer">
          <button onClick={(e)=>handleBtn(e)}  className="active">Active</button>
          <button onClick={(e)=>handleBtn(e)} >Completed</button>
          <button onClick={(e)=>handleBtn(e)} >All</button>
          <button onClick={(e)=>handleBtn(e)} >Clear</button>
        </div>
    </div>
  )
}

export default Todo
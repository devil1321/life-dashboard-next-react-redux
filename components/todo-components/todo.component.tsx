import React,{ useEffect , useState,useRef, Dispatch } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../controllers/reducers'
import { Task } from '../../interfaces';
import * as TodoActions from '../../controllers/action-creators/todo.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import Todo from './todo.components'

import TodoItem from './todo-item.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { SetStateAction } from 'react';


interface TaskFormData{
  userId:string;
  firebaseId:string;
  isOrder:boolean;
  name:string;
  description:string;
  completed:boolean;
  date:Date
}



const TodoMainComponent:React.FC = () => {

  const dispatch = useDispatch()
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)
  const { tasks,tempTasks, task, isFiltered } = useSelector((state:State) => state.todo)
  const { date } = useSelector((state:State) => state.date)
  const { isEdit, isOrders } = useSelector((state:State) => state.ui)
  const { userDetails } = useSelector((state:State) => state.user)

  const activeBtnRef = useRef<HTMLButtonElement | null>(null)
  const [isFilteredByActive,setIsFilteredByActive] = useState<boolean>(false)
  const [isFilteredByCompleted,setIsFilteredByCompleted] = useState<boolean>(false)
 
  const [taskFormData,setTaskFormData] = useState<TaskFormData>({
    userId:'',
    isOrder:false,
    firebaseId:'',
    name:"",
    description:"",
    completed:false,
    date:moment(date).format('MM-DD-YYYY')
  })

  
 const handleTaskFormData = (e:any) =>{
   let val = e.target.value
   if(e.target.value === 'false' && e.target.dataset.val === 'completed'){
     val = false
   }else if(e.target.value === 'true' && e.target.dataset.val === 'completed'){
     val = true
   }
   setTaskFormData((prevState)=>({
     ...prevState,
     [e.target.dataset.val]:val
   }))
 }

    const handleDate = (e:any) =>{
    setTaskFormData((prevState)=>({
      ...prevState,
      date:moment(e.target.value).format('MM-DD-YYYY')
    }))
   }


 const handleFilter = () =>{  
   if(isFiltered){
     if(isOrders){
       todoActions.filterByDate(date,tasks.filter((t:Task)=> t.isOrder === true))
      }else{
       todoActions.filterByDate(date,tasks.filter((t:Task)=> t.isOrder === false))
      }
  }}

  const handleFilterByCompletedOrActive = () => {
     if(!isFiltered && isFilteredByActive){
       if(isOrders){
         todoActions.filterActive(tasks.filter((t:Task)=> t.isOrder === true))
        }else{
          todoActions.filterActive(tasks.filter((t:Task)=> t.isOrder === false))
        }
     }
     if(!isFiltered && isFilteredByCompleted){
      if(isOrders){
        todoActions.filterCompleted(tasks.filter((t:Task)=> t.isOrder === true))
       }else{
         todoActions.filterCompleted(tasks.filter((t:Task)=> t.isOrder === false))
       }
     }
  }

  const handleBtn = (e:any) =>{
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }

  const handleTaskFn = () =>{
    todoActions.setTasks(userDetails?.id)
    handleFilter()
    handleFilterByCompletedOrActive()
  }

  const handleTodoSaveFn = () =>{
    todoActions.saveTask(task.firebaseId,taskFormData)
    UI.setIsEdit(false)
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    if(activeBtnRef.current){
      activeBtnRef.current.classList.add('active')
    }
  }
 
  const handleActiveButtonFn = (e:any) =>{
    handleBtn(e)
    if(isOrders){
      todoActions.filterActive(tasks.filter((t:Task) => t.isOrder === true))
    }else{
      todoActions.filterActive(tasks.filter((t:Task) => t.isOrder === false))
    }
    setIsFilteredByActive(true)
    setIsFilteredByCompleted(false)
    UI.setIsEdit(false)
  }
  const handleCompletedButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    if(isOrders){
      todoActions.filterCompleted(tasks.filter((t:Task) => t.isOrder === true))
    }else{
      todoActions.filterCompleted(tasks.filter((t:Task) => t.isOrder === false))
    }
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(true)
  }
  const handleAllButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(false)
    if(isOrders){
      todoActions.filterAll(tasks.filter((t:Task) => t.isOrder === true))
    }else{
      todoActions.filterAll(tasks.filter((t:Task) => t.isOrder === false))
    }
  }
 
  const handleType = () => {
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    btns[4].classList.add('active')
     if(isOrders){
      todoActions.filterAll(tasks.filter((t:Task) => t.isOrder === true))
    }else{
      todoActions.filterAll(tasks.filter((t:Task) => t.isOrder === false))
    }
  }

  const handleClearButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(false)
    todoActions.removeAll()
  }
  
  useEffect(()=>{
    if(isFiltered){
      handleFilter()
    }
    if(task.firebaseId){
      setTaskFormData({
        userId:task.userId,
        isOrder:task.isOrder,
        firebaseId:task.firebaseId,
        name:task.name,
        description:task.description,
        completed:task.completed,
        date:moment(task.date).format('MM-DD-YYYY')
      })
    }
    if(!isFiltered){
      handleType()
    }
    handleFilterByCompletedOrActive()

  },[isEdit,task,isOrders,userDetails,tasks])
    

 
  return (
    <div className="todo">
        <Todo.Heading isEdit={isEdit}  handleTodoSaveFn={handleTodoSaveFn} setIsOrders={UI.setIsOrders} />
        {!isEdit && <Todo.TaskForm isOrder={isOrders} handleTaskFn={handleTaskFn} addTask={todoActions.addTask}/>}
          <div className="todo__body">
              {!isEdit && tempTasks.length > 0 && tempTasks.map((task:TaskFormData,index:number) => <Todo.Item key={task.name}  task={task} handleEdit={UI.setIsEdit} /> )}
              {isEdit && 
                <div className="todo__edit">
                  <Todo.EditHeading taskFormData={taskFormData} handleTaskFormData={handleTaskFormData} handleDate={handleDate} />
                  <Todo.EditDescription taskFormData={taskFormData} handleTaskFormData={handleTaskFormData} />
                  {!taskFormData.completed 
                    ? <Todo.EditCompletedButton handleTaskFormData={handleTaskFormData} />
                    : <Todo.EditUncompletedButton handleTaskFormData={handleTaskFormData} />
                  }
                </div>}
              </div>
              <Todo.Footer 
                innerRef={activeBtnRef}
                handleAllButtonFn={handleAllButtonFn}
                handleCompletedButtonFn={handleCompletedButtonFn}
                handleActiveButtonFn={handleActiveButtonFn}
                handleClearButtonFn={handleClearButtonFn}
              />
    </div>
  )
}

export default TodoMainComponent
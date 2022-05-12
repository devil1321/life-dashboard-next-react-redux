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
  firebaseId:string;
  name:string;
  description:string;
  completed:boolean;
  date:Date
}


interface TodoProps{
  isUpdated:boolean;
  setIsUpdated:Dispatch<SetStateAction<boolean>>
}

const TodoMainComponent:React.FC<TodoProps> = ({isUpdated,setIsUpdated}) => {

  const dispatch = useDispatch()
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)
  const { tasks,tempTasks, task, isFiltered } = useSelector((state:State) => state.todo)
  const { date } = useSelector((state:State) => state.date)
  const { isEdit } = useSelector((state:State) => state.ui)

  const activeBtnRef = useRef<HTMLButtonElement | null>(null)

  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [isFilteredByActive,setIsFilteredByActive] = useState<boolean>(false)
  const [isFilteredByCompleted,setIsFilteredByCompleted] = useState<boolean>(false)
 
  const [taskFormData,setTaskFormData] = useState<TaskFormData>({
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
    todoActions.filterByDate(date)
  }}

  const handleFilterByCompletedOrActive = () => {
     if(!isFiltered && isFilteredByActive){
       todoActions.filterActive(tasks)
     }
     if(!isFiltered && isFilteredByCompleted){
       todoActions.filterCompleted(tasks)
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
    setIsUpdated(!isUpdated)
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
    todoActions.filterActive(tasks)
    setIsFilteredByActive(true)
    setIsFilteredByCompleted(false)
    UI.setIsEdit(false)
  }
  const handleCompletedButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    todoActions.filterCompleted(tasks)
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(true)
  }
  const handleAllButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(false)
    todoActions.filterAll(tasks)
  }
  const handleClearButtonFn = (e:any) =>{
    handleBtn(e)
    UI.setIsEdit(false)
    setIsFilteredByActive(false)
    setIsFilteredByCompleted(false)
    setIsUpdated(!isUpdated)
    todoActions.removeAll()
  }
  
  useEffect(()=>{
    if(isFiltered){
      handleFilter()
    }
    if(!isLoad){
      todoActions.setTasks()
      setIsLoad(true)
    }
    if(task.firebaseId){
      setTaskFormData({
        firebaseId:task.firebaseId,
        name:task.name,
        description:task.description,
        completed:task.completed,
        date:moment(task.date).format('MM-DD-YYYY')
      })
    }
    console.log(taskFormData)
  },[isEdit,task])
    

 
  return (
    <div className="todo">
        <Todo.Heading isEdit={isEdit} handleTodoSaveFn={handleTodoSaveFn} />
        {!isEdit && <Todo.TaskForm handleTaskFn={handleTaskFn} addTask={todoActions.addTask}/>}
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
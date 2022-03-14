import React,{ useEffect , useState,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../controllers/reducers'
import { Task } from '../interfaces';
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'
import * as UIActions from '../controllers/action-creators/ui.actions-creators'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../animations/icons-json/1121-iota-internet-of-things.json'
import TodoItem from './todo-item.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface TaskFormData{
  id:string;
  name:string;
  description:string;
  completed:boolean;
  date:Date
}

const Todo:React.FC = () => {

  const dispatch = useDispatch()
  const todoActions = bindActionCreators(TodoActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)
  const { tasks,tempTasks, task, isFiltered, isAvailable } = useSelector((state:State) => state.todo)
  const { date } = useSelector((state:State) => state.date)
  const { isEdit } = useSelector((state:State) => state.ui)

  const activeBtnRef = useRef<HTMLButtonElement | null>(null)

  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [isError,setIsError] = useState<boolean>(false)

  const [newTask,setNewTask] = useState({
    id:uuidv4(),
    name:'',
    description:'',
    completed:false,
    date:new Date()
  })

  const [taskFormData,setTaskFormData] = useState<TaskFormData>({
    id:"",
    name:"",
    description:"",
    completed:false,
    date:new Date()
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
    date:e.target.value
  }))
 }

 const handleNewTask = (e:any) =>{
   setNewTask((prevState)=>({
     ...prevState,
     [e.target.dataset.name]:e.target.value
   }))
 }

 const handleAddTask = (task:Task) => {
   todoActions.addTask(task)
   setNewTask({
    id:uuidv4(),
    name:'',
    description:'',
    completed:false,
    date:new Date()
   })
 }

 const handleFilter = () =>{  
   if(isFiltered){
    todoActions.filterByDate(date)
  }}



  const handleBtn = (e:any) =>{
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }

 
  
  useEffect(()=>{

    if(!isLoad){
      todoActions.setTasks()
      setIsLoad(true)
    }
    if(task.id){
      setTaskFormData({
        id:task.id,
        name:task.name,
        description:task.description,
        completed:task.completed,
        date:task.date
      })
    }
  
    },[isEdit,task])
    

 
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
          {isEdit && 
              <div className="todo__save" onClick={()=>{
                todoActions.saveTask(taskFormData.id,taskFormData)
                UI.setIsEdit(false)
                todoActions.filterActive(tasks)
                const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
                btns.forEach((btn:HTMLButtonElement) => {
                  btn.classList.remove('active')
                })
                activeBtnRef.current.classList.add('active')
                }}>
                  <FontAwesomeIcon icon ={faSave} />
              </div>}
          </div>
        {!isEdit && 
          <div className="todo__form">
              <div className="todo__field">
                <input className={`${isError && "todo__error"}`} type="text" data-name="name" value={newTask.name} onChange={(e)=>handleNewTask(e)} placeholder='Add Task...' />
                <div className={`todo__date`} >
                  <input className={`${isError && "todo__error"}`} type="date" name="" id="" data-name="date"  onChange={(e)=>handleNewTask(e)}/>
                </div>
                <button onClick={(e)=>{
                  handleAddTask(newTask)
                  handleFilter()
                  if(isAvailable.length > 0){
                    setIsError(true)
                    setTimeout(()=>{
                      todoActions.isAvailableTrue()
                      setIsError(false)
                    },2000)
                  }
                  }}>Add Task</button>
              </div>
          </div>}
          <div className="todo__body">
              {!isEdit && tempTasks.length > 0 && tempTasks.map((task:Task,index:number) => <TodoItem  task={task} handleEdit={UI.setIsEdit} /> )}
              {isEdit && 
                <div className="todo__edit">
                  <div className="todo__edit-heading">
                    <input value={taskFormData.name} data-val="name" onChange={(e)=>handleTaskFormData(e)}/>
                      <span>{moment(taskFormData.date).format('DD-MM-YYYY')}</span>
                      <div className="todo__edit-date">
                        <input type="date" name="" id="" onChange={(e)=>handleDate(e)} />
                      </div>
                  </div>
                  <textarea value={taskFormData.description} data-val="description" onChange={(e)=>handleTaskFormData(e)}/>
                  {!taskFormData.completed 
                    ? <button className="todo__btn-finished" data-val="completed" value={"true"} onClick={(e)=>handleTaskFormData(e)}>
                      <FontAwesomeIcon icon ={faCheckDouble} />
                       Completed
                     </button>
                    : <button className="todo__btn-pending" data-val="completed" value={"false"} onClick={(e)=>handleTaskFormData(e)}>
                      <FontAwesomeIcon icon ={faXmark} />  
                       Uncompleted
                     </button>
                  }
                </div>}
              </div>
        <div className="todo__footer">
          <button onClick={(e)=>{
            handleBtn(e)
            todoActions.filterActive(tasks)
            UI.setIsEdit(false)
          }}  className="active" ref={activeBtnRef}>Active</button>
          <button onClick={(e)=>{
            handleBtn(e)
            UI.setIsEdit(false)
            todoActions.filterCompleted(tasks)
            }}>Completed</button>
          <button onClick={(e)=>{
            handleBtn(e)
            UI.setIsEdit(false)
            todoActions.filterAll(tasks)
            }}>All</button>
          <button onClick={(e)=>{
            handleBtn(e)
            UI.setIsEdit(false)
            todoActions.removeAll()
            }}>Clear</button>
        </div>
    </div>
  )
}

export default Todo
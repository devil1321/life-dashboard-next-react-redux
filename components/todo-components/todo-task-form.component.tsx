import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../controllers/reducers'
import { Task } from '../../interfaces';

interface TaskFormProps {
    isOrder:boolean;
    handleTaskFn:() => void
    addTask:(task:Task)=>void
}

interface NewTaskState{
    userId:string;
    isOrder:boolean,
    isRejected?:boolean | string;
    name:string;
    description:string;
    completed:boolean;
    date:Date;
}

const TaskForm:React.FC<TaskFormProps>= ({isOrder,handleTaskFn,addTask}) => {

    const { date } = useSelector((state:State) => state.date)
    const { userDetails } = useSelector((state:State) => state.user)

    const [newTask,setNewTask] = useState<NewTaskState>({
        completed:false,
        userId:'',
        isOrder:isOrder,
        name:'',
        description:'',
        date:date
      })
    const [err,setErr] = useState<boolean>(false)
    

    const handleNewTask = (e:any) =>{
        setNewTask((prevState)=>({
          ...prevState,
          [e.target.dataset.name]:e.target.value
        }))
        if(isOrder){
          setNewTask((prevState)=>({
            ...prevState,
            isRejected:'pending'
          }))
        }
      }

      const handleAddTask = (task:Task) => {
        if(newTask.name.length > 0 && newTask.date !== undefined && newTask.date !== null){
          addTask(task)
          setNewTask((prevState) => ({
            ...prevState,
            userId:userDetails.id,
            isOrder:isOrder,
            completed:false,
            name:'',
            description:'',
          }))
        } else{
           setErr(true)
           setTimeout(()=>{
             setErr(false)
           },2000)
        }
      }

      const handleSubmit = (e:any) => {
        e.preventDefault()
        handleTaskFn()
        handleAddTask(newTask)
      }

    useEffect(()=>{
      if(userDetails !== null){
        setNewTask((prevState) => ({
          ...prevState,
          userId:userDetails.id,
          isOrder:isOrder
        }))
        setNewTask((prevState) => ({
          ...prevState,
          date:date
        }))
      }
    },[isOrder,userDetails,date])


  return (
    <form className="todo__form" onSubmit={(e)=>handleSubmit(e)}>
    <div className={`todo__field`}>
      <input className={err ? "todo__err" : ""} type="text" data-name="name" value={newTask.name} onChange={(e:any)=>handleNewTask(e)} placeholder={isOrder ? "Add Order..." : 'Add Task...'} />
      <div className={`todo__date ${err ? "todo__err" : ""}`} >
        <input className={err ? "todo__err" : ""} type="date" name="" id="" data-name="date"  onChange={(e:any)=>handleNewTask(e)}/>
      </div>
      <button>{!isOrder ? "Add Task" : "Add Order"}</button>
    </div>
</form>
  )
}

export default TaskForm
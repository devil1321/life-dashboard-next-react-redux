import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../controllers/reducers'
import moment from 'moment';
import { Task } from '../../interfaces';

interface TaskFormProps {
    isOrder:boolean;
    handleTaskFn:() => void
    addTask:(task:Task)=>void
}

interface NewTaskState{
    userId:string;
    isOrder:boolean,
    name:string;
    description:string;
    completed:boolean;
    date:Date;
}

const TaskForm:React.FC<TaskFormProps>= ({isOrder,handleTaskFn,addTask}) => {

    const { date } = useSelector((state:State) => state.date)
    const { userDetails } = useSelector((state:State) => state.user)

    const [newTask,setNewTask] = useState<NewTaskState>({
        userId:'',
        isOrder:isOrder,
        name:'',
        description:'',
        completed:false,
        date:date
      })
    const [err,setErr] = useState<boolean>(false)
    

    const handleNewTask = (e:any) =>{
        setNewTask((prevState)=>({
          ...prevState,
          [e.target.dataset.name]:e.target.value
        }))
      }

      const handleAddTask = (task:Task) => {
        if(newTask.name.length > 0){
          addTask(task)
        } else{
           setErr(true)
           setTimeout(()=>{
             setErr(false)
           },2000)
        }
        setNewTask({
         userId:userDetails.id,
         isOrder:isOrder,
         name:'',
         description:'',
         completed:false,
         date:moment(date).format('MM-DD-YYYY')
        })
      }

    useEffect(()=>{
      if(userDetails !== null){
        setNewTask((prevState) => ({
          ...prevState,
        userId:userDetails.id,
        isOrder:isOrder
        }))
      }
    },[isOrder,userDetails])


  return (
    <div className="todo__form">
    <div className={`todo__field`}>
      <input className={err ? "todo__err" : ""} type="text" data-name="name" value={newTask.name} onChange={(e:any)=>handleNewTask(e)} placeholder={isOrder ? "Add Order..." : 'Add Task...'} />
      <div className={`todo__date ${err ? "todo__err" : ""}`} >
        <input className={err ? "todo__err" : ""} type="date" name="" id="" data-name="date"  onChange={(e:any)=>handleNewTask(e)}/>
      </div>
      <button onClick={(e)=>{
            handleTaskFn()
            handleAddTask(newTask)
        }}>{!isOrder ? "Add Task" : "Add Order"}</button>
    </div>
</div>
  )
}

export default TaskForm
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { State } from '../../controllers/reducers'
import moment from 'moment';
import { Task } from '../../interfaces';

interface TaskFormProps {
    handleTaskFn:() => void
    addTask:(task:Task)=>void
}

interface NewTaskState{
    name:string;
    description:string;
    completed:boolean;
    date:Date;
}

const TaskForm:React.FC<TaskFormProps>= ({handleTaskFn,addTask}) => {

    const { date } = useSelector((state:State) => state.date)

    const [newTask,setNewTask] = useState<NewTaskState>({
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
         name:'',
         description:'',
         completed:false,
         date:moment(date).format('MM-DD-YYYY')
        })
      }

  return (
    <div className="todo__form">
    <div className={`todo__field`}>
      <input className={err ? "todo__err" : ""} type="text" data-name="name" value={newTask.name} onChange={(e:any)=>handleNewTask(e)} placeholder='Add Task...' />
      <div className={`todo__date ${err ? "todo__err" : ""}`} >
        <input className={err ? "todo__err" : ""} type="date" name="" id="" data-name="date"  onChange={(e:any)=>handleNewTask(e)}/>
      </div>
      <button onClick={(e)=>{
            handleTaskFn()
            handleAddTask(newTask)
        }}>Add Task</button>
    </div>
</div>
  )
}

export default TaskForm
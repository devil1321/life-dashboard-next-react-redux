import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../animations/icons-json/1121-iota-internet-of-things.json'

const Todo:React.FC = () => {

  const handleBtn = (e:any) =>{
    const btns = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    btns.forEach((btn:HTMLButtonElement) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }


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
        <div className="todo__body"></div>
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
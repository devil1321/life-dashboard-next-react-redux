import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import icon from '../animations/icons-json/1121-iota-internet-of-things.json'

const Todo:React.FC = () => {
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
        <div className="todo__footer"></div>
    </div>
  )
}

export default Todo
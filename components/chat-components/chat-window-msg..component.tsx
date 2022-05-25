import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'

const WindowMsg = () => {

  const { userDetails } = useSelector((state:State) => state.user)
  const { message } = useSelector((state:State) => state.chat)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)

  useEffect(()=>{
    chatActions.manageMessage('sender_email',userDetails.email)
    chatActions.manageMessage('sender_img',userDetails.photoURL)
    chatActions.manageMessage('sender_id',userDetails.id)
  },[])

  return (
    <div className="chat-window__msg">
        <form action="">
            <textarea value={message.msg} onChange={(e)=>chatActions.manageMessage('msg',e.target.value)}></textarea>
        </form>
    </div>
  )
}

export default WindowMsg
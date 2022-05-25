import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'

interface ControlsProps{
    isWrite:boolean;
    openMsg:() => void;
    closeMsg:() => void
}

const Controls:React.FC<ControlsProps> = ({isWrite,openMsg,closeMsg}) => {
  const { message } = useSelector((state:State) => state.chat)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)

  return (
    <div className="chat-window__controls">
        {!isWrite && <button onClick={()=>openMsg()} className="chat-window__write-msg-btn">Write</button>}
        {isWrite && <button onClick={()=>closeMsg()} className="chat-window__close-msg-btn">Close</button>}
        {isWrite && <button className="chat-window__send-msg-btn" onClick={()=>{
            const date = new Date()
            const isoDate = date.toISOString()
            chatActions.manageMessage('date', isoDate)
            chatActions.sendMessage(message.recipient_email,message)
            chatActions.setMessages(message.sender_email)
            setTimeout(()=>{
              chatActions.manageMessage('msg','')
            },100)
          }}>Send</button>}
    </div>  
  )
}

export default Controls
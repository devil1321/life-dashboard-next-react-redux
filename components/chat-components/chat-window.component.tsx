import React,{ useEffect,useState, useRef, MutableRefObject } from 'react'
import Chat from './chat.components'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'
import { Message } from '../../interfaces'

const MainWindow = () => {

  const { isChat } = useSelector((state:State) => state.ui)
  const { messagesByEmail, message, allMessages } = useSelector((state:State) => state.chat)
  const { email, last_chat_recipient } = useSelector((state:State) => state.user.userDetails)
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)

  const msgWindowRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement>

  const openMsg = () => {
    msgWindowRef.current.style.minHeight = '270px'
    msgWindowRef.current.style.maxHeight = '270px'
    UI.setIsChat(true)
  }
  const closeMsg = () => {
    msgWindowRef.current.style.minHeight = '340px'
    msgWindowRef.current.style.maxHeight = '340px'
    UI.setIsChat(false)
  }

  useEffect(()=>{
    if(!isLoad){
      chatActions.setMessages(email)
      setIsLoad(true)
    }
    if(isLoad && messagesByEmail.length === 0){
      setTimeout(()=>{
        chatActions.filterByEmail(last_chat_recipient,email)
        chatActions.manageMessage('recipient_email',last_chat_recipient)
      },2000)
    }
    if(message.recipient_email !== ''){
      chatActions.filterByEmail(message.recipient_email,email)
    }
  },[isLoad,allMessages])

  return (
    <div className="chat-window">
        <h1>Chat</h1>
        <div className="chat-window__msgs-windoww"  ref={msgWindowRef}>
            {messagesByEmail?.length > 0 && messagesByEmail.map((msg:Message) => <Chat.Message key={msg.id} windowMessage={msg} />)}
        </div>
        {isChat && <Chat.WindowMsg />}
        <Chat.Controls isWrite={isChat} openMsg={openMsg} closeMsg={closeMsg} />
    </div> 
  )
}

export default MainWindow
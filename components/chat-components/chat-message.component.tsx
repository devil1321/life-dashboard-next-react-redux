import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { Message } from '../../interfaces'

interface ChatMessageProps {
  windowMessage:Message
}


const Message:React.FC<ChatMessageProps> = ({windowMessage}) => {

  const { message }:{ message:Message } = useSelector((state:State) => state.chat)
  const { email } = useSelector((state:State) => state.user.userDetails)
  
  if(windowMessage){
    var {  msg,sender_email,recipient_email,sender_img,recipient_img } = windowMessage
  }

  return (
    <div className={`chat-message ${recipient_email !== email ? "chat-message--recipent" : "chat-message--sender"}`}>
        <div className="chat-message__user">
        {sender_email === email  
            ? sender_img !== null 
              ? <Image src={sender_img} layout="responsive" width={30} height={30} alt="user" />
              : <Image src="/assets/user.png" layout='responsive' width={30} height={30} alt="user" />
            : recipient_img !== null 
              ? <Image src={recipient_img} layout="responsive" width={30} height={30} alt="user" />
              : <Image src="/assets/user.png" layout='responsive' width={30} height={30} alt="user" />}
        </div>
        <div className="chat-message__msg">
            {msg}
        </div>
    </div>
  )
}

export default Message
import React from 'react'
import Image from 'next/image'

interface ChatMessageProps {
    userImg:string;
    msg:string;
    isRecipient:boolean;
}


const Message:React.FC<ChatMessageProps> = ({userImg,msg,isRecipient}) => {
  return (
    <div className={`chat-message ${isRecipient ? "chat-message--recipent" : "chat-message--sender"}`}>
        <div className="chat-message__user">
            <Image src={userImg} layout="responsive" width={30} height={30} alt="user" />
        </div>
        <div className="chat-message__msg">
            {msg}
        </div>
    </div>
  )
}

export default Message
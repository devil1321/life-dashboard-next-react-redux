import React,{ useState, useRef, MutableRefObject } from 'react'
import ChatMessage from './chat-message.component'

const ChatWindow = () => {

  const [isWrite,setIsWrite] = useState<boolean>(false)

  const msgWindowRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement>

  const openMsg = () => {
    msgWindowRef.current.style.minHeight = '270px'
    msgWindowRef.current.style.maxHeight = '270px'
    setIsWrite(true)
  }
  const closeMsg = () => {
    msgWindowRef.current.style.minHeight = '340px'
    msgWindowRef.current.style.maxHeight = '340px'
    setIsWrite(false)
  }

  return (
    <div className="chat-window">
        <h1>Chat</h1>
        <div className="chat-window__msgs-windoww"  ref={msgWindowRef}>
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={false} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={true} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={false} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={true} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={false} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={true} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={false} />
            <ChatMessage userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={true} />
        </div>
        {isWrite && <div className="chat-window__msg">
           <form action="">
               <textarea></textarea>
           </form>
        </div>}
        <div className="chat-window__controls">
            {!isWrite && <button onClick={()=>openMsg()} className="chat-window__write-msg-btn">Write</button>}
            {isWrite && <button onClick={()=>closeMsg()} className="chat-window__close-msg-btn">Close</button>}
            {isWrite && <button className="chat-window__send-msg-btn">Send</button>}
        </div>
    </div>
  )
}

export default ChatWindow
import React,{ useState, useRef, MutableRefObject } from 'react'
import Chat from './chat.components'

const MainWindow = () => {

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
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={false} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={true} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={false} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={true} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={false} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc asjkhsa kasasjhkjashjakshk" isRecipient={true} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={false} />
            <Chat.Message userImg="/assets/user.png" msg="Testowa Wiadomosc" isRecipient={true} />
        </div>
        {isWrite && <Chat.WindowMsg />}
        <Chat.Controls isWrite={isWrite} openMsg={openMsg} closeMsg={closeMsg} />
    </div> 
  )
}

export default MainWindow
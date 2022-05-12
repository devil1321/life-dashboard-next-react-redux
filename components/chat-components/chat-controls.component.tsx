import React from 'react'

interface ControlsProps{
    isWrite:boolean;
    openMsg:() => void;
    closeMsg:() => void
}

const Controls:React.FC<ControlsProps> = ({isWrite,openMsg,closeMsg}) => {
  return (
    <div className="chat-window__controls">
        {!isWrite && <button onClick={()=>openMsg()} className="chat-window__write-msg-btn">Write</button>}
        {isWrite && <button onClick={()=>closeMsg()} className="chat-window__close-msg-btn">Close</button>}
        {isWrite && <button className="chat-window__send-msg-btn">Send</button>}
    </div>  
  )
}

export default Controls
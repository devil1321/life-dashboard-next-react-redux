import React from 'react'
import ChatContacts from '../components/chat-contacts.component'
import ChatWindow from '../components/chat-window.component'
import Layout from '../components/layout.component'

const Chat = () => {
  return (
      <Layout title="Chat">  
        <div className="chat">
          <div className="chat__left-panel">
            <ChatWindow />
          </div>
          <div className="chat__right-panel">
            <ChatContacts />
          </div>
        </div>
      </Layout>
  )
}

export default Chat
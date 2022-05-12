import React from 'react'
import Chat from '../components/chat-components/chat.components'
import Layout from '../components/layout.component'

const ChatPage = () => {
  return (
      <Layout title="Chat">  
        <div className="chat">
          <div className="chat__left-panel">
            <Chat.MainWindow />
          </div>
          <div className="chat__right-panel">
            <Chat.Contacts />
          </div>
        </div>
      </Layout>
  )
}

export default ChatPage
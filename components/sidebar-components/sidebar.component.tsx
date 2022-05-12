import React,{useRef} from 'react'
import Sidebar from './sidebar.components'
import dashboard from '../../animations/icons-json/153-bar-chart-growth.json'
import tasks from '../../animations/icons-json/120-folder-open-morph.json'
import chat from '../../animations/icons-json/981-consultation.json'
import email from '../../animations/icons-json/177-envelope-mail-send.json'
import invoices from '../../animations/icons-json/245-edit-document.json'
import contacts from '../../animations/icons-json/112-book-morph.json'


const Main:React.FC = () => {

  return (
    <div className="sidebar">
      <Sidebar.Logo title="Dash" href="/dashboard" />
      <div className="sidebar__menu">
        <Sidebar.Item src={dashboard} title="Dashboard" href="/dashboard" />
        <Sidebar.Item src={tasks} title="Tasks" href="/tasks" />
        <Sidebar.Item src={invoices} title="Invoices" href="/invoices" />
        <Sidebar.Item src={chat} title="Chat" href="/chat" />
        <Sidebar.Item src={email} title="Email" href="/emails" />
        <Sidebar.Item src={contacts} title="Contacts" href="/contacts" />
      </div>
    </div>
  )
}

export default Main
import React,{ useRef, MutableRefObject} from 'react'
import Sidebar from './sidebar.components'
import dashboard from '../../animations/icons-json/153-bar-chart-growth.json'
import tasks from '../../animations/icons-json/120-folder-open-morph.json'
import chat from '../../animations/icons-json/981-consultation.json'
import email from '../../animations/icons-json/177-envelope-mail-send.json'
import invoices from '../../animations/icons-json/245-edit-document.json'
import contacts from '../../animations/icons-json/112-book-morph.json'
import gsap from 'gsap'

interface MainProps{
  innerRef:any;
}

const Main:React.FC<MainProps> = ({innerRef}) => {

  const sidebarRef = useRef(null) as any

  return (
    <div className="sidebar --sidebar-close" ref={(el)=> {
        sidebarRef.current = el 
        innerRef.current = el
      }}>
      <div className="sidebar__close" onClick={()=>gsap.to(sidebarRef.current,{width:'0%'})}>
        <span></span>
        <span></span>
      </div>
      <Sidebar.Logo title="Dash" href="/dashboard" innerRef={sidebarRef} />
      <div className="sidebar__menu">
        <Sidebar.Item innerRef={sidebarRef} src={dashboard} title="Dashboard" href="/dashboard" />
        <Sidebar.Item innerRef={sidebarRef} src={tasks} title="Tasks" href="/tasks" />
        <Sidebar.Item innerRef={sidebarRef} src={invoices} title="Invoices" href="/invoices" />
        <Sidebar.Item innerRef={sidebarRef} src={chat} title="Chat" href="/chat" />
        <Sidebar.Item innerRef={sidebarRef} src={email} title="Email" href="/emails" />
        <Sidebar.Item innerRef={sidebarRef} src={contacts} title="Contacts" href="/contacts" />
      </div>
    </div>
  )
}

export default Main
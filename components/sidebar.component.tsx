import React,{useRef} from 'react'
import Link from 'next/link'
import logo from '../animations/icons-json/12-layers.json'
import dashboard from '../animations/icons-json/153-bar-chart-growth.json'
import tasks from '../animations/icons-json/120-folder-open-morph.json'
import chat from '../animations/icons-json/981-consultation.json'
import email from '../animations/icons-json/177-envelope-mail-send.json'
import invoices from '../animations/icons-json/245-edit-document.json'
import contacts from '../animations/icons-json/112-book-morph.json'
import { Player } from '@lottiefiles/react-lottie-player';

const Sidebar:React.FC = () => {

  const logoRef = useRef<Player>()
  const dashboardRef = useRef<Player>()
  const tasksRef = useRef<Player>()
  const invoicesRef = useRef<Player>()
  const chatRef = useRef<Player>()
  const emailsRef = useRef<Player>()
  const contactsRef = useRef<Player>()
// test
  const handleIcon = (ref:any) => {
      ref?.current?.play()
      setTimeout(()=>{
        ref?.current?.stop()
      },1500)
  }

  return (
    <div className="sidebar">
      <div className="sidebar__logo" onMouseEnter={()=>handleIcon(logoRef)}>
        <span className='sidebar__logo-anim'>
        <Player
            ref={logoRef}
            loop
            hover={true}
            src={logo}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/dashboard">
            <h1>DASH</h1>
          </Link>
      </div>
      <div className="sidebar__menu">
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(dashboardRef)}>
          <span className="sidebar__icon">
          <Player
           ref={dashboardRef}
            loop
            hover={true}
            src={dashboard}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/dashboard">
            <span className="sidebar__link">Dashboard</span>
          </Link>
        </div>
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(tasksRef)}>
          <span className="sidebar__icon">
          <Player
            ref={tasksRef}
            loop
            hover={true}
            src={tasks}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/tasks">
            <span className="sidebar__link">Tasks</span>
          </Link>
        </div>
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(invoicesRef)}> 
          <span className="sidebar__icon">
          <Player
            ref={invoicesRef}
            loop
            hover={true}
            src={invoices}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/invoices">
            <span className="sidebar__link">Invoices</span>
          </Link>
        </div>
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(chatRef)}>
          <span className="sidebar__icon">
          <Player
            ref={chatRef}
            loop
            hover={true}
            src={chat}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/chat">
            <span className="sidebar__link">Chat</span>
          </Link>
        </div>
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(emailsRef)}>
          <span className="sidebar__icon">
          <Player
            ref={emailsRef}
            loop
            hover={true}
            src={email}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/emails">
            <span className="sidebar__link">Email</span>
          </Link>
        </div>
   
        <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(contactsRef)}>
          <span className="sidebar__icon">
          <Player
            ref={contactsRef}
            loop
            hover={true}
            src={contacts}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/contacts">
            <span className="sidebar__link">Contacts</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
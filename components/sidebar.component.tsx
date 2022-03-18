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

  const logoRef = useRef<HTMLDivElement | null>(null)
  const dashboardRef = useRef<HTMLDivElement | null>(null)
  const tasksRef =  useRef<HTMLDivElement | null>(null)
  const invoicesRef = useRef<HTMLDivElement | null>(null)
  const chatRef =  useRef<HTMLDivElement | null>(null)
  const emailsRef =  useRef<HTMLDivElement | null>(null)
  const contactsRef =  useRef<HTMLDivElement | null>(null)
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
          <Link href="/dashboard" passHref={true}>
            <a className="sidebar__link">Dashboard</a>
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
          <Link href="/tasks" passHref={true}>
            <a className="sidebar__link">Tasks</a>
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
          <Link href="/invoices" passHref={true}>
            <a className="sidebar__link">Invoices</a>
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
          <Link href="/chat" passHref={true}>
            <a className="sidebar__link">Chat</a>
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
          <Link href="/emails" passHref={true}>
            <a className="sidebar__link">Email</a>
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
          <Link href="/contacts" passHref={true}>
            <a className="sidebar__link">Contacts</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
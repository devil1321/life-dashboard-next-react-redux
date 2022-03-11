import React from 'react'
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

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <span className='sidebar__logo-anim'>
        <Player
            loop
            hover={true}
            src={logo}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
        <h1>DASH</h1>
      </div>
      <div className="sidebar__menu">
        <div className="sidebar__menu-item" 
>
          <span className="sidebar__icon">
          <Player
            loop
            hover={true}
            src={dashboard}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href="/">
            <span className="sidebar__link">Dashboard</span>
          </Link>
        </div>
        <div className="sidebar__menu-item">
          <span className="sidebar__icon">
          <Player
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
        <div className="sidebar__menu-item">
          <span className="sidebar__icon">
          <Player
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
        <div className="sidebar__menu-item">
          <span className="sidebar__icon">
          <Player
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
        <div className="sidebar__menu-item">
          <span className="sidebar__icon">
          <Player
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
   
        <div className="sidebar__menu-item">
          <span className="sidebar__icon">
          <Player
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
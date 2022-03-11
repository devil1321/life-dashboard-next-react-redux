import React, { useRef, MutableRefObject } from 'react'
import Link  from 'next/link'
import { Player } from '@lottiefiles/react-lottie-player';
import Notification from './notification.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFlag } from '@fortawesome/free-solid-svg-icons'
import search from '../animations/icons-json/19-magnifier-zoom-search.json'
import connection from '../animations/icons-json/726-wireless-connection.json'
import settings from '../animations/icons-json/409-tool.json'

const Navbar:React.FC = () => {

    const notificationMenuRef = useRef() as MutableRefObject<HTMLDivElement>    
    const languagesRef = useRef() as MutableRefObject<HTMLDivElement>    
    const profileRef = useRef() as MutableRefObject<HTMLDivElement>    
    const connectionRef = useRef() as MutableRefObject<HTMLDivElement>    

    const handleMenu = (element:MutableRefObject<HTMLDivElement>):void =>{
        if(element.current.classList.contains('--close-modifier')){
            element.current.style.visibility = 'visible'
            element.current.classList.remove('--close-modifier')
            element.current.classList.remove('--close')
            element.current.classList.add('--open')

        }else{
            setTimeout(()=>{
                element.current.style.visibility = 'hidden'
            },600)
            element.current.classList.add('--close-modifier')
            element.current.classList.remove('--open')
            element.current.classList.add('--close')

        }
    }

  return (
    <div className="navbar">
        <div className="navbar__search">
            <form action="">
                <div className="navbar__field">
                    <input type="text" />
                    <Player
                        loop
                        hover={true}
                        src={search}
                        style={{ height: '40px', width: '40px' }}
                    >
                    </Player>
                </div>
            </form>
        </div>
        <div className="navbar__menu">
            <div className="navbar__languages" >
                <FontAwesomeIcon icon={faFlag}  onClick={()=>handleMenu(languagesRef)}/>
                <div className="navbar__languages-menu --close-modifier" ref={languagesRef}>
                    <h3 className="navbar__languages-item">EN</h3>
                    <h3 className="navbar__languages-item">US</h3>
                    <h3 className="navbar__languages-item">PL</h3>
                    <h3 className="navbar__languages-item">GE</h3>
                </div>
            </div>
            <div className="navbar__notifications">
                <FontAwesomeIcon icon ={faBell} onClick={()=>handleMenu(notificationMenuRef)}/>
                <div className="navbar__notifications-menu --close-modifier" ref={notificationMenuRef}>
                    <Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
                    <Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
                    <Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
                </div>
            </div>
           
            <div className="navbar__profile">
                <div className="navbar__profile-info" onClick={()=>handleMenu(profileRef)}>
                    <img src="/assets/user.png" alt="" />
                    <div className="navbar__profile-btn">Profile</div>
                </div>

                    <div className="navbar__profile-menu --close-modifier" ref={profileRef}>
                        <Link href="#" >
                            <p className="navbar__profile-menu-item">Profile</p>
                        </Link>
                        <Link href="#">
                            <p className="navbar__profile-menu-item">My Wallet</p>
                        </Link>
                        <Link href="#">
                            <p  className="navbar__profile-menu-item">Settings</p>
                        </Link>
                        <Link href="#">
                            <p  className="navbar__profile-menu-item">Lock screen</p>
                        </Link>
                        <Link href="#">
                            <p className="navbar__profile-menu-item">Log Out</p>
                        </Link>
                    </div>
                </div>
            <div className="navbar__connection" onClick={()=>handleMenu(connectionRef)}>
                <Player
                    autoplay
                    loop
                    src={connection}
                    style={{ height: '40px', width: '40px' }}
                >
                </Player>
                <div className="navbar__connection-menu --close-modifier" ref={connectionRef}>
                    <div className="navbar__connection-menu-item"><p>Connected</p></div>
                </div>
           </div>
            <div className="navbar__settings">
                <Player
                    loop
                    hover={true}
                    src={settings}
                    style={{ height: '40px', width: '40px' }}
                 >
                </Player>
            </div>
        </div>
    </div>
  )
}

export default Navbar
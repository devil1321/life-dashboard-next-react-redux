import React, { useRef, MutableRefObject } from 'react'
import Nav from './navbar.components'
import gsap from 'gsap'
import { Player } from '@lottiefiles/react-lottie-player';
import logo from '../../animations/icons-json/12-layers.json'

interface NavbarProps{
    innerRef:any;
}

const Navbar:React.FC<NavbarProps> = ({innerRef}) => {


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
            if(element.current){
                element.current.style.visibility = 'hidden'
            }
            element.current.classList.add('--close-modifier')
            element.current.classList.remove('--open')
            element.current.classList.add('--close')

        }
    }

    const handleSidebar = () =>{
        if(window.innerWidth <= 400){
          if(window.innerWidth < 540){
            if(innerRef.current.classList.contains('--sidebar-close')){
              gsap.to(innerRef.current,{width:'100%'})
              innerRef.current.classList.remove('--sidebar-close')
              innerRef.current.classList.add('--sidebar-open')
            }else{
              gsap.to(innerRef.current,{width:'0%'})
              innerRef.current.classList.remove('--sidebar-open')
              innerRef.current.classList.add('--sidebar-close')
            }
          }
          else if(innerRef.current.classList.contains('--sidebar-close')){
            gsap.to(innerRef.current,{width:'100%'})
            innerRef.current.classList.remove('--sidebar-close')
            innerRef.current.classList.add('--sidebar-open')
          }else{
            gsap.to(innerRef.current,{width:'20%'})
            innerRef.current.classList.remove('--sidebar-open')
            innerRef.current.classList.add('--sidebar-close')
          }
        }
      }

  return (
    <div className="navbar">
        <div className="navbar__logo" onClick={(e)=>{
            e.stopPropagation()
            handleSidebar()
        }}>
        <Player
            loop
            hover={true}
            src={logo}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
        </div>
        <Nav.Search />
        <div className="navbar__menu">
            <Nav.Languages innerRef={languagesRef} handleMenu={handleMenu} />
            <Nav.Notifications innerRef={notificationMenuRef} handleMenu={handleMenu} />
            <Nav.Profile innerRef={profileRef} handleMenu={handleMenu} />
            <Nav.Connection  innerRef={connectionRef} handleMenu={handleMenu} />
        </div>
    </div>
  )
}

export default Navbar
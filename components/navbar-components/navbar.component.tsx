import React, { useRef, MutableRefObject } from 'react'
import Nav from './navbar.components'

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
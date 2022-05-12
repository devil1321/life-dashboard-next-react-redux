import React, { MutableRefObject } from 'react'
import Nav from './navbar.components';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface NotificationsProps{
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(ref:MutableRefObject<HTMLDivElement>) => void;
}

const Notifications:React.FC<NotificationsProps> = ({innerRef,handleMenu}) => {
  return (
    <div className="navbar__notifications">
    <FontAwesomeIcon icon ={faBell} onClick={()=>handleMenu(innerRef)}/>
    <div className="navbar__notifications-menu --close-modifier" ref={innerRef}>
        <Nav.Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
        <Nav.Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
        <Nav.Notification img="/assets/user.png" person="Julia McCrudy" subject="Infinite to meeting"  date="2022-01-23" />
    </div>
</div>
  )
}

export default Notifications
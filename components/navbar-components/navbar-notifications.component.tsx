import React, { useEffect, MutableRefObject, useState } from 'react'
import Nav from './navbar.components';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

interface NotificationsProps{
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(ref:MutableRefObject<HTMLDivElement>) => void;
}

const Notifications:React.FC<NotificationsProps> = ({innerRef,handleMenu}) => {
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
  const { notifications,notificationsCount,userDetails } = useSelector((state:State) => state.user)
  const { allMessages } = useSelector((state:State) => state.chat)

  useEffect(()=>{
    if(allMessages && !isLoad){
      setIsLoad(true)
    }
    if(isLoad){
      userActions.setNotifications(allMessages,userDetails?.email)
    }
  },[isLoad,allMessages.length,userDetails])

  return (
    <div className="navbar__notifications">
    <div className="navbar__notifications-icon">
      <FontAwesomeIcon icon ={faBell} onClick={()=>{
          handleMenu(innerRef)
          userActions.setNotificationsRead(userDetails?.email)
        }}/>
        <span className="navbar__notifications-count">
          {notificationsCount}
        </span>
    </div>
    <div className="navbar__notifications-menu --close-modifier" ref={innerRef}>
      {notifications.length > 0 
        ? notifications.map((n:any,index:number)=><Nav.Notification key={index} img={n.photoURL !== null ? n.photoURL : "/assets/user.png"} person={n.person}   date={n.date.slice(0,10) + ' ' + n.date.slice(12,16)} />)
        : <h3>Empty</h3>}
    </div>
</div>
  )
}

export default Notifications
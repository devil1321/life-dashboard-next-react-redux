import Link from 'next/link'
import Image from 'next/image'
import React, { MutableRefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import { State } from '../../controllers/reducers'
import { UserDetails } from '../../interfaces'

interface ProfileProps {
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(element:MutableRefObject<HTMLDivElement>) => void
}

const Profile:React.FC<ProfileProps> = ({innerRef,handleMenu}) => {
    
  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const userActions = bindActionCreators(UserActions,dispatch)
  const { userDetails }:{ userDetails:UserDetails } = useSelector((state:State) => state.user)

  return (
    <div className="navbar__profile">
        <div className="navbar__profile-info" onClick={()=>handleMenu(innerRef)}>
                {userDetails?.photoURL === null
                    ?  <img src="/assets/user.png" alt="" />
                    :  <img src={userDetails?.photoURL} alt="" />}
            <div className="navbar__profile-btn">Profile</div>
        </div>
        <div className="navbar__profile-menu --close-modifier" ref={innerRef}>
            <Link href="/statistics" >
                <p onClick={()=>handleMenu(innerRef)} className="navbar__profile-menu-item">Statistics</p>
            </Link>
            <Link href="/settings" >
                <p onClick={()=>handleMenu(innerRef)}  className="navbar__profile-menu-item">Settings</p>
            </Link>
            <Link href="#" >
                <p onClick={()=>handleMenu(innerRef)}  className="navbar__profile-menu-item" onClick={()=>UI.handleLock(true)}>Lock screen</p>
            </Link>
            <Link href="#" >
                <p onClick={()=>handleMenu(innerRef)} className="navbar__profile-menu-item" onClick={()=>userActions.logoutUser()}>Log Out</p>
            </Link>
        </div>
    </div>
  )
}

export default Profile
import Link from 'next/link'
import React, { MutableRefObject } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

interface ProfileProps {
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(element:MutableRefObject<HTMLDivElement>) => void
}

const Profile:React.FC<ProfileProps> = ({innerRef,handleMenu}) => {
    
  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const userActions = bindActionCreators(UserActions,dispatch)

  return (
    <div className="navbar__profile">
        <div className="navbar__profile-info" onClick={()=>handleMenu(innerRef)}>
            <img src="/assets/user.png" alt="" />
            <div className="navbar__profile-btn">Profile</div>
        </div>
        <div className="navbar__profile-menu --close-modifier" ref={innerRef}>
            <Link href="/wallet">
                <p className="navbar__profile-menu-item">My Wallet</p>
            </Link>
            <Link href="/settings">
                <p  className="navbar__profile-menu-item">Settings</p>
            </Link>
            <Link href="#">
                <p  className="navbar__profile-menu-item" onClick={()=>UI.handleLock(true)}>Lock screen</p>
            </Link>
            <Link href="#">
                <p className="navbar__profile-menu-item" onClick={()=>userActions.logoutUser()}>Log Out</p>
            </Link>
        </div>
    </div>
  )
}

export default Profile
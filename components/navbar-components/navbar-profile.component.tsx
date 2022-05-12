import Link from 'next/link'
import React, { MutableRefObject } from 'react'

interface ProfileProps {
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(element:MutableRefObject<HTMLDivElement>) => void
}

const Profile:React.FC<ProfileProps> = ({innerRef,handleMenu}) => {
  return (
    <div className="navbar__profile">
        <div className="navbar__profile-info" onClick={()=>handleMenu(innerRef)}>
            <img src="/assets/user.png" alt="" />
            <div className="navbar__profile-btn">Profile</div>
        </div>
        <div className="navbar__profile-menu --close-modifier" ref={innerRef}>
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
  )
}

export default Profile
import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'

interface ProfilePanelProps{
    invoices:number;
    tasks:number;
    emails:number;
    earnings:number;
}

const ProfilePanel:React.FC<ProfilePanelProps> = ({invoices,earnings,emails,tasks}) => {

  const { userDetails } = useSelector((state:State) => state.user)

  return (
    <div className="profile-panel">
        <div className="profile-panel__header">
            <div>
                <h3>Welcome Back!</h3>
                <p>Nice To See You Again</p>
            </div>
            <div className="profile-panel__img">
              {userDetails?.photoURL === null
                ? <img src="/assets/user.png" alt="" />
                : <img src={userDetails?.photoURL} alt="" />}
            </div>
        </div>
       <div className="profile-panel__stats">
            <div className="profile-panel__projects-stats">
              <h3>{invoices}</h3>
              <p>Invoices</p>
            </div>
            <div className="profile-panel__emails-stats">
              <h3>{emails}</h3>
              <p>Emails</p>
            </div>
            <div className="profile-panel__earnings-stats">
              <h3>{earnings}</h3>
              <p>Earnings</p>
            </div>
            <div className="profile-panel__tasks-stats">
              <h3>{tasks}</h3>
              <p>Tasks</p>
            </div>
           
       </div>
  </div>
  )
}

export default ProfilePanel
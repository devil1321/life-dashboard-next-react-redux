import React from 'react'

interface ProfilePanelProps{
    projects:number;
    tasks:number;
    emails:number;
    earnings:number;
}

const ProfilePanel:React.FC<ProfilePanelProps> = ({projects,earnings,emails,tasks}) => {
  return (
    <div className="profile-panel">
        <div className="profile-panel__header">
            <div>
                <h3>Welcome Back!</h3>
                <p>Nice To See You Again</p>
            </div>
            <div className="profile-panel__img">
                <img src="/assets/user.png" alt="" />
            </div>
        </div>
       <div className="profile-panel__stats">
            <div className="profile-panel__projects-stats">
              <h3>{projects}</h3>
              <p>Projects</p>
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
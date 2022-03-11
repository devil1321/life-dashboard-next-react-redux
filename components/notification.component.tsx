import React from 'react'

interface NotificationProps{
    img:string;
    person:string;
    subject:string;
    date:string;
}

const Notification:React.FC<NotificationProps> = ({img,person,subject,date}) => {
  return (
    <div className="navbar__notification">
        <img src={img} alt="" />
        <div className="navbar__notification-body">
           <h3>{person}</h3>
           <h3>{subject}</h3>
           <p>{date}</p>
        </div>
    </div>
  )
}

export default Notification
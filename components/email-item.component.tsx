import { Player } from '@lottiefiles/react-lottie-player';
import React,{ useState } from 'react'
import trash from '../animations/icons-json/185-trash-bin.json'

interface EmailProps{
    isView?:boolean;
    img:string;
    person:string;
    subject:string;
    date:string;
}

const EmailItem:React.FC<EmailProps> = ({isView,img,person,subject,date}) => {

  const [isEmail,setIsEmail] = useState<boolean>(true)

  return (
    <React.Fragment>
      {isEmail && 
        <div className="email-item">
          <div className="email-item__img">
              <img src={img} alt="email-pic" />
          </div>
          <div className="email-item__content">
              <h3>{person}</h3>
              <p>{subject}</p>
          </div>
          <p>{date}</p>
          {!isView 
           ? <div className="email-item__close" onClick={()=>setIsEmail(false)}>
            <Player
                loop
                hover={true}
                src={trash}
                style={{ height: '40px', width: '40px' }}
            >
            </Player>
          </div>
          : <button className="email-item__view-btn">View</button>}
      </div>}
    </React.Fragment>
  )
}

export default EmailItem
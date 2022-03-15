import { Player } from '@lottiefiles/react-lottie-player';
import React,{ useState } from 'react'
import trash from '../animations/icons-json/185-trash-bin.json'

interface EmailProps{
    img:string;
    person:string;
    subject:string;
    date:string;
}

const Email:React.FC<EmailProps> = ({img,person,subject,date}) => {

  const [isEmail,setIsEmail] = useState<boolean>(true)

  return (
    <React.Fragment>
      {isEmail && 
        <div className="email">
          <div className="email__img">
              <img src={img} alt="email-pic" />
          </div>
          <div className="email__content">
              <h3>{person}</h3>
              <p>{subject}</p>
          </div>
          <p>{date}</p>
          <div className="email__close" onClick={()=>setIsEmail(false)}>
            <Player
                loop
                hover={true}
                src={trash}
                style={{ height: '40px', width: '40px' }}
            >
            </Player>
          </div>
      </div>}
    </React.Fragment>
  )
}

export default Email
import { Player } from '@lottiefiles/react-lottie-player';
import React,{ Dispatch, SetStateAction, useState } from 'react'
import trash from '../../animations/icons-json/185-trash-bin.json'

interface EmailProps{
    img:string;
    person:string;
    subject:string;
    date:string;
    isView?:boolean;
    fn?:(params:any) => any | void 
    params?:any[];
}

const Item:React.FC<EmailProps> = ({img,person,subject,date,isView,fn,params}) => {

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
          : <React.Fragment>
               <button className="email-item__view-btn" onClick={()=>{
               if(fn && params){
                 // @ts-ignore
                 fn(...params)
               }
             }}>View</button>
            <div className="email-item__close" onClick={()=>setIsEmail(false)}>
            <Player
                loop
                hover={true}
                src={trash}
                style={{ height: '40px', width: '40px' }}
            >
            </Player>
          </div>
          </React.Fragment>}
      </div>}
    </React.Fragment>
  )
}

export default Item
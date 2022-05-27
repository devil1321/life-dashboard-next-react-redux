import React,{ Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/router'
import { Player } from '@lottiefiles/react-lottie-player';
import trash from '../../animations/icons-json/185-trash-bin.json'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../controllers/action-creators/user.actions-creators' 
import * as UIActions from '../../controllers/action-creators/ui.actions-creators' 

interface EmailProps{
    img:string;
    email:any;
    isView:boolean;
    handleEmailItemIsPreviewFn?:() => any | void 
}

const Item:React.FC<EmailProps> = ({email,img,isView,handleEmailItemIsPreviewFn}) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)
  const { userDetails } = useSelector((state:State) => state.user)
  const [isEmail,setIsEmail] = useState<boolean>(true)
  
  if(email !== 'loading'){
    var { uid, subject, date } = email
    var name = email?.from?.value[0].name
  }

  return (
    <React.Fragment>
      {isEmail && 
        <div className="email-item">
          <div className="email-item__img">
              <img src={img} alt="email-pic" />
          </div>
          <div className="email-item__content">
              <h3>{email && name}</h3>
              <p>{email && subject}</p>
          </div>
          <p>{email && date?.slice(0,10)} {email && date?.slice(11,19)}</p>
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
                if(router.asPath === '/dashboard'){
                  userActions.setEmail(email)
                  UI.setIsPreview(true)
                  router.push('/emails')
                 }
               if(handleEmailItemIsPreviewFn){
                 // @ts-ignore
                 handleEmailItemIsPreviewFn()
                 userActions.setEmail(email)
          
               }
             }}>View</button>
            <div className="email-item__close" onClick={()=>setIsEmail(false)}>
            <span onClick={()=>userActions.deleteEmail(userDetails.email,userDetails.inbox_password,uid)}>
            <Player
                loop
                hover={true}
                src={trash}
                style={{ height: '40px', width: '40px' }}
            >
            </Player>
            </span>
          </div>
          </React.Fragment>}
      </div>}
    </React.Fragment>
  )
}

export default Item
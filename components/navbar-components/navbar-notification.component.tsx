import React,{ useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

interface NotificationProps{
    img:string;
    person:string;
    date:string;
}

const Notification:React.FC<NotificationProps> = ({img,person,date}) => {

  const router = useRouter()
  const [contact,setContact] = useState<any>({})
  const { contacts } = useSelector((state:State) => state.contacts)
  const { userDetails } = useSelector((state:State) => state.user)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)

  useEffect(()=>{
    setContact(contacts.find((c:any)=>c.email === person))
  },[contacts])

  return (
    <div className="navbar__notification" onClick={()=>{
      userActions.updateUserContacts(userDetails?.id,contact)
      chatActions.manageMessage('sender_email',userDetails.email)
      chatActions.manageMessage('recipient_email',person)
      chatActions.manageMessage('sender_img',userDetails.photoURL)
      chatActions.manageMessage('sender_id',userDetails.id)
      userActions.lastChatRecipient(person,contact.id)
      UI.setIsChat(true)
      setTimeout(()=>{
        router.push('/chat')
      },1000)
    }}>
        <img src={img} alt="profile" />
        <div className="navbar__notification-body">
           <h3>{person}</h3>
           <p>{contact?.name} {contact?.surname}</p>
           <p>{date}</p>
        </div>
    </div>
  )
}

export default Notification
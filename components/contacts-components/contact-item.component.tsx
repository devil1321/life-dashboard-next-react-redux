import React from 'react'
import Image from 'next/image'
import { Contact } from '../../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'
import { useRouter } from 'next/router'


interface ContactItemProps{
  contact:Contact
}

const Item:React.FC<ContactItemProps> = ({contact}) => {

  const router = useRouter()
  const { id, email, name, surname, phoneNumber, photoURL } = contact
  const { userDetails } = useSelector((state:State) => state.user)

  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)

  return (
    <div className="contact-item">
        <div className="contact-item__img">
          {photoURL !== null 
            ? <Image src={photoURL} layout='responsive' width={60} height={60}  alt="contact-img" />
            : <Image src="/assets/user.png" layout='responsive' width={60} height={60}  alt="contact-img" />}
        </div>
        <div className="contact-item__info">
          <h3>{name} {surname}</h3>
          <p>{email} </p>
        </div>
        {phoneNumber?.length > 0 && <h3>Phone: {phoneNumber}</h3>}
        <div className="contact-item__controls">
            <button onClick={()=>{
                userActions.updateUserContacts(userDetails?.id,contact)
                chatActions.manageMessage('sender_email',userDetails.email)
                chatActions.manageMessage('recipient_email',email)
                chatActions.manageMessage('sender_img',userDetails.photoURL)
                chatActions.manageMessage('sender_id',userDetails.id)
                userActions.lastChatRecipient(email,id)
                UI.setIsChat(true)
                setTimeout(()=>{
                  router.push('/chat')
                },1000)
            }}>Chat</button>
            <button onClick={(e)=>{
                userActions.setReplyDetails(email,'')
                UI.setIsContact(true)
                userActions.updateUserContacts(userDetails?.id,contact)
                setTimeout(()=>{
                  router.push('/emails')
                },1000)
            }}>Email</button>
            <button onClick={()=>userActions.updateUserContacts(userDetails?.id,contact)}>Save</button>
        </div>
  </div>
  )
}

export default Item
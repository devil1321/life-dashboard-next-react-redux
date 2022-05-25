import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Contact } from '../../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as ChatActions from '../../controllers/action-creators/chat.actions-creators'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'

interface ContactItemProps{
  contact:Contact
}

const ContactItem:React.FC<ContactItemProps> = ({contact}) => {
  const [count,setCount] = useState<number>(0)
  const { allMessages } = useSelector((state:State) => state.chat)
  const { id:userId, email:userEmail } = useSelector((state:State) => state.user.userDetails)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)


  if(contact){
    var { id, name, surname, email, phoneNumber, photoURL } = contact
  }

  const handleUnseen = () =>{
    const unseenCount = allMessages
      .filter((m:any)=>m.sender_email === email && m.recipient_email === userEmail)
      .filter((msg:any)=>msg.isRead === false)
      setCount(unseenCount.length)
  }

  useEffect(()=>{
    handleUnseen()
  },[allMessages])

  return (
    <div className="chat-contact-item">
      <div className="chat-contact-item__img">
        {!photoURL  
          ? <Image src="/assets/user.png" layout='responsive' width={60} height={60}  alt="contact-img" />
          : <Image src={photoURL} layout='responsive' width={60} height={60}  alt="contact-img" />}
      </div>
      <div className="chat-contact-item__info">
        {name && <h3>{name} {surname}</h3>}
        {email && <p>{email}</p>}
      </div>
      {phoneNumber && <h3>Nr. {phoneNumber}</h3>}
      {count !== 0 && <button className="chat-contact-item__unseen">{count}</button>}
      <button onClick={()=>{
          UI.setIsChat(true)
          chatActions.manageMessage('recipient_email',email)
          chatActions.manageMessage('recipient_img',photoURL)
          chatActions.checkRead(email,userEmail)
          chatActions.filterByEmail(email,userEmail)
          userActions.lastChatRecipient(email,userId)
        }}>Contact</button>
    </div>
  )
}

export default ContactItem
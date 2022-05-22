import React from 'react'
import Image from 'next/image'
import { Contact } from '../../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import { useRouter } from 'next/router'


interface ContactItemProps{
  contact:Contact
}

const Item:React.FC<ContactItemProps> = ({contact}) => {

  const router = useRouter()
  const { id, email, name, surname, phoneNumber } = contact
  const { userDetails } = useSelector((state:State) => state.user)

  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)

  return (
    <div className="contact-item">
        <div className="contact-item__img">
          {userDetails.photoURL !== null 
            ? <Image src={userDetails.photoURL} layout='responsive' width={60} height={60}  alt="contact-img" />
            : <Image src="/assets/user.png" layout='responsive' width={60} height={60}  alt="contact-img" />}
        </div>
        <div className="contact-item__info">
          <h3>{name} {surname}</h3>
          <p>{email} </p>
        </div>
        <h3>Phone: {phoneNumber}</h3>
        <div className="contact-item__controls">
            <button onClick={()=>{
                userActions.updateUserContacts(userDetails?.id,contact)
            }}>Chat</button>
            <button onClick={(e)=>{
                userActions.setReplyDetails(email,'')
                userActions.updateUserContacts(userDetails?.id,contact)
                UI.setIsContact(true)
                setTimeout(()=>{
                  router.push('/emails')
                },1000)
            }}>Email</button>
        </div>
  </div>
  )
}

export default Item
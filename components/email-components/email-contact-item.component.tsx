import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import * as UIActions from '../../controllers/action-creators/ui.actions-creators'
import { Contact } from '../../interfaces'


interface ContactItemProps{
  contact:Contact
}

const ContactItem:React.FC<ContactItemProps> = ({contact}) => {

  const { id, name, surname, email } = contact
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)

  return (
    <div className="email-contact-item">
        <div className="email-contact-item__info">
            <h3>{name} {surname}</h3>
            <p>{email}</p>
        </div>
        <button className="email-contact-item__contact-btn" onClick={()=>{
            userActions.setReplyDetails(email,'')
            UI.setIsContact(true)
        }}>Contact</button>
    </div>
  )
}

export default ContactItem
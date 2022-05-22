import React from 'react'
import { Contact } from '../../interfaces'

interface ContactItemProps{
  contact:Contact
}

const ContactItem:React.FC<ContactItemProps> = ({contact}) => {

  const { id, name, surname, email } = contact

  return (
    <div className="email-contact-item">
        <div className="email-contact-item__info">
            <h3>{name} {surname}</h3>
            <p>{email}</p>
        </div>
        <button className="email-contact-item__contact-btn">Contact</button>
    </div>
  )
}

export default ContactItem
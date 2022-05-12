import React from 'react'

const ContactItem = () => {
  return (
    <div className="email-contact-item">
        <div className="email-contact-item__info">
            <h3>FirstName LastName</h3>
            <p>email@gmail.com</p>
        </div>
        <button className="email-contact-item__contact-btn">Contact</button>
    </div>
  )
}

export default ContactItem
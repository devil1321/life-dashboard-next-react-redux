import React from 'react'
import Image from 'next/image'

const ContactItem = () => {
  return (
    <div className="chat-contact-item">
      <div className="chat-contact-item__img">
        <Image src="/assets/user.png" layout='responsive' width={60} height={60}  alt="contact-img" />
      </div>
      <div className="chat-contact-item__info">
        <h3>FirstName LastName</h3>
        <p>test@gmail.com</p>
      </div>
      <h3>Nr. 48553-552-223</h3>
      <button>Contact</button>
    </div>
  )
}

export default ContactItem
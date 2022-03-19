import React from 'react'
import Image from 'next/image'
const ChatContactItem = () => {
  return (
    <div className="contact-item">
      <div className="contact-item__img">
        <Image src="/assets/user.png" layout='responsive' width={60} height={60}  alt="contact-img" />
      </div>
      <div className="contact-item__info">
        <h3>FirstName LastName</h3>
        <p>test@gmail.com</p>
      </div>
      <h3>Nr. 48553-552-223</h3>
      <button>Change</button>
    </div>
  )
}

export default ChatContactItem
import React,{ useState,useEffect } from 'react'
import gsap from 'gsap'
import Chat from './chat.components'
import Search from '../search.component'

const Contacts = () => {
  const [isFilter,setIsFilter] = useState<boolean>(false)

  const comesIn = (el:string | HTMLDivElement) => {
    
    const tl = gsap.timeline()
      tl.fromTo(el,
        {
            x:550,
        },
        {
        x:0,
        stagger: { 
          each: 0.15,
          from: "start",
          grid: "auto",
          ease: "power2.inOut",
        }
      })
  }
 
  const filterContacts = () => {
      setIsFilter(!isFilter)
  }

  useEffect(()=>{
      setTimeout(()=>{
          comesIn('.chat-contact-item')
        },800)
  },[])

  return (
    <div className="chat-contacts">
        <div className="chat-contacts__controls">
          <Search isSearchAll={true} />
        </div>
        <div className="chat-contacts__inner">
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
          <Chat.ContactItem />
        </div>
    </div>
  )
}

export default Contacts
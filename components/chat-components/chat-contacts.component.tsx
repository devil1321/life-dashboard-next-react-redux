import React,{ useState,useEffect } from 'react'
import gsap from 'gsap'
import Chat from './chat.components'
import Search from '../search.component'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { Contact } from '../../interfaces'

const Contacts = () => {

  const [isFilter,setIsFilter] = useState<boolean>(false)
  const { userDetails } = useSelector((state:State)=>state.user)

  if(userDetails){
    var { contacts } = userDetails
  }

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
          <Search  />
        </div>
        <div className="chat-contacts__inner">
          {contacts?.length > 0 && contacts.map((contact:Contact) => <Chat.ContactItem key={contact.id} contact={contact} />)}
        </div>
    </div>
  )
}

export default Contacts
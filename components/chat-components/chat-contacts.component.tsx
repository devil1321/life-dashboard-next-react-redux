import React,{ useState,useEffect } from 'react'
import gsap from 'gsap'
import Chat from './chat.components'
import Search from '../search.component'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { Contact } from '../../interfaces'

const Contacts = () => {
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [tempContacts,setTempContacts] = useState<Contact[]>([])
  const { userDetails } = useSelector((state:State)=>state.user)


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
 
  useEffect(()=>{
    if(!isLoad){
      setTimeout(()=>{
          comesIn('.chat-contact-item')
        },800)
        setTempContacts(userDetails?.contacts)
        setIsLoad(true)
      }if(isLoad){
        comesIn('.chat-contact-item')
      }
  },[userDetails,tempContacts])

  return (
    <div className="chat-contacts">
        <div className="chat-contacts__controls">
          <Search contacts={userDetails?.contacts} setContacts={setTempContacts} />
        </div>
        <div className="chat-contacts__inner">
          {tempContacts?.length > 0 && tempContacts.map((contact:Contact) => <Chat.ContactItem key={contact.id} contact={contact} />)}
        </div>
    </div>
  )
}

export default Contacts
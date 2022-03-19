import React,{ useState,useEffect } from 'react'
import gsap from 'gsap'
import ChatContactItem from './contact-item.component'

const ChatContacts = () => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>("")

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
          comesIn('.contact-item')
        },800)
  },[])

  return (
    <div className="chat-contacts">
        <div className="chat-contacts__controls">
            {!isFilter 
                ? <button onClick={()=>{filterContacts()}}>A-Z</button>
                : <button onClick={()=>{filterContacts()}}>Z-A</button>}
            <input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} />
        </div>
        <div className="chat-contacts__inner">
          <ChatContactItem />
          <ChatContactItem />
          <ChatContactItem />
          <ChatContactItem />
          <ChatContactItem />
          <ChatContactItem />
          <ChatContactItem />
        </div>
    </div>
  )
}

export default ChatContacts
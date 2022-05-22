import React,{ useEffect, useState } from 'react'
import Layout from '../components/layout.component'
import Search from '../components/search.component'
import Contact from '../components/contacts-components/contact.components'
import gsap from 'gsap'
import { Contact as ContactType } from '../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../controllers/reducers'

const ContactsPage = () => {
  
  const { contacts }:{ contacts:ContactType[] } = useSelector((state:State) => state.contacts)
  const [isLoad,setIsLoad] = useState<boolean>(false)


  const comesFromDown = (el:string) => {
    gsap.fromTo(el,{y:600},{y:0, stagger: { 
      each: 0.15,
      from: "start",
      grid: "auto",
      ease: "power2.inOut",
    }})
  }


  useEffect(()=>{
    if(isLoad){
      comesFromDown('.contact-item')
    }
    setTimeout(()=>{
      setIsLoad(true)
    },4000)
  },[isLoad])

  return (
      <Layout title="Contacts">
        <div className="contacts">
          <div className="contacts__search">
            <Search />
          </div>
          <div className="contacts__contacts">
            {isLoad && contacts.map((contact:ContactType) => <Contact.Item  key={contact.id} contact={contact} />)}
          </div>
        </div>
      </Layout>
  )
}

export default ContactsPage
import React,{ useEffect} from 'react'
import Layout from '../components/layout.component'
import Search from '../components/search.component'
import ContactItem from '../components/contact-item.component'
import gsap from 'gsap'

const Contacts = () => {
  const tempArr = [1,2,3,4,5,6,7,8,9,10]

  const comesFromDown = (el:string) => {
    gsap.fromTo(el,{y:300},{y:0, stagger: { 
      each: 0.15,
      from: "start",
      grid: "auto",
      ease: "power2.inOut",
    }})
  }


  useEffect(()=>{
    setTimeout(()=>{
      comesFromDown('.contact-item')
    },2500)
  },[])

  return (
      <Layout title="Contacts">
        <div className="contacts">
          <div className="contacts__search">
            <Search />
          </div>
          <div className="contacts__contacts">
            {tempArr.map((el) => <ContactItem  key={el} />)}
          </div>
        </div>
      </Layout>
  )
}

export default Contacts
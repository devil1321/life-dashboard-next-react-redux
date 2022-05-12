import React,{ useState, useEffect } from 'react'
import gsap from 'gsap'
import Layout from '../components/layout.component'
import Email from '../components/email-components/email.components'
import Search from '../components/search.component'

const EmailsPage = () => {
  const tempArr = [1,2,3,4,5,6,7,8,9,10]
  const [isPreview,setIsPreview] = useState<boolean>(false)
  const [isReply,setIsReply] = useState<boolean>(false)

  const comesFromLeft = (el:string) => {
    gsap.fromTo(el,{x:-400},{x:0, stagger: { 
      each: 0.15,
      from: "start",
      grid: "auto",
      ease: "power2.inOut",
    }})
  }
  const comesFromDown = (el:string) => {
    gsap.fromTo(el,{y:300},{y:0, stagger: { 
      each: 0.15,
      from: "start",
      grid: "auto",
      ease: "power2.inOut",
    }})
  }

  const handlePreviewFn = () =>{
    setIsPreview(false)
    setIsReply(true)
  }

  const handleHideFn = () =>{
    setIsPreview(false)
    setIsReply(false)
  }

  useEffect(()=>{
    setTimeout(()=>{
      comesFromLeft('.email-contact-item')
    },2000)
    setTimeout(()=>{
      comesFromDown('.email-item')
    },2000)
  },[])

  return (
      <Layout title="Emails">
        <div className="emails">
          <div className="emails__search">
            <button className="emails__write-btn" onClick={()=>{
                 setIsPreview(false)
                 setIsReply(true)
            }}>Write Message</button>
            <Search />
          </div>
          <div className="emails__main">
            <div className="emails__contacts-wrapper">
              <div className="emails__contacts">
                {tempArr.map((el)=> <Email.ContactItem key={el} />)}
              </div>
            </div>
            <div className="emails__emails-wrapper">
              <div className="emails__emails">
                {!isPreview && !isReply && tempArr.map((el:any) =>  <Email.Item key={el} isView={true} fn={setIsPreview} params={[true]} img="/assets/user.png" person="Janette McGreed" subject="Blog Site" date="2022-02-28" />)}
                {isPreview && !isReply && <Email.Preview handlePreviewFn={handlePreviewFn} handleHideFn={handleHideFn} />}
                {isReply && !isPreview && <Email.Write handleHideFn={handleHideFn} />}
              </div>
          </div>
          </div>
        </div>

      </Layout>
  )
}

export default EmailsPage
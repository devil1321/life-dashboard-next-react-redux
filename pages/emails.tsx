import React,{ useState, useEffect } from 'react'
import gsap from 'gsap'
import Layout from '../components/layout.component'
import EmailItem from '../components/email-item.component'
import EmailContactItem from '../components/email-contact-item.component'
import Search from '../components/search.component'

const Emails = () => {
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
                {tempArr.map((el)=> <EmailContactItem />)}
              </div>
            </div>
            <div className="emails__emails-wrapper">
              <div className="emails__emails">
                {!isPreview && !isReply && tempArr.map((el:any) =>  <EmailItem isView={true} fn={setIsPreview} params={[true]} img="/assets/user.png" person="Janette McGreed" subject="Blog Site" date="2022-02-28" />)}
                {isPreview && !isReply &&
                  <div className="emails__preview-item">
                    <h3>From : email@gmail.com</h3>
                    <h3>Subject: simple subject</h3>
                    <p>FirstName LastName</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae quam deleniti asperiores dolore eos omnis aperiam eius magni nihil ratione ex tenetur sapiente dolor excepturi voluptas sint minus iusto obcaecati quod officia, sed ab. Quod culpa, veniam doloremque maxime ad accusamus itaque doloribus esse laboriosam ipsam mollitia nobis illum, quibusdam laborum nulla, voluptates magni eligendi minus exercitationem consequatur voluptatem nihil. Non quibusdam distinctio asperiores inventore vero itaque, mollitia perspiciatis animi in labore? Perferendis pariatur iure iusto accusamus iste expedita reprehenderit officia explicabo sequi, at odio illum aspernatur sunt amet inventore id ducimus quo porro voluptatem distinctio dolor ab? Nisi, assumenda.</p>
                    <div className="emails__preview-controls">
                      <button className="emails__write-btn" onClick={()=>{
                        setIsPreview(false)
                        setIsReply(true)
                      }}>Reply</button>
                      <button className="emails__hide-btn" onClick={()=>{
                        setIsPreview(false)
                        setIsReply(false)
                      }}>Hide</button>
                    </div>
                  </div>
                }
                {isReply && !isPreview && 
                  <div className="emails__write-item">
                    <div className="emails__write-field">
                      <label htmlFor="">To:</label>
                      <input type="text" />
                    </div>
                    <div className="emails__write-field">
                      <label htmlFor="">Subject:</label>
                      <input type="text" />
                    </div>
                    <div className="emails__write-field">
                      <textarea name="" id="" ></textarea>
                    </div>
                    <button className="emails__hide-btn" onClick={()=>{
                        setIsPreview(false)
                        setIsReply(false)
                      }}>Hide</button>
                  </div>
                }
              </div>
          </div>
          </div>
        </div>

      </Layout>
  )
}

export default Emails
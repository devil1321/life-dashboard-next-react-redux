import React,{ useState, useEffect } from 'react'
import gsap from 'gsap'
import Layout from '../components/layout.component'
import Email from '../components/email-components/email.components'
import Search from '../components/search.component'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../controllers/reducers'
import * as UserActions from '../controllers/action-creators/user.actions-creators'
import * as UIActions from '../controllers/action-creators/ui.actions-creators'
import { Contact } from '../interfaces'
import Spinner from '../components/spinner.component'

const EmailsPage = () => {

  const dispatch = useDispatch()
  const { emails, userDetails } = useSelector((state:State) => state.user)
  const { isContact } = useSelector((state:State) => state.ui)
  const userActions = bindActionCreators(UserActions,dispatch)
  const UI = bindActionCreators(UIActions,dispatch)

  const [isPreview,setIsPreview] = useState<boolean>(false)

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
    UI.setIsContact(true)
    setIsPreview(false)
  }

  const handleHideFn = () =>{
    setIsPreview(false)
    UI.setIsContact(false)
  }
  
  const handleEmailItemIsPreviewFn = () => {
    setIsPreview(true)
  }

  useEffect(()=>{
    setTimeout(()=>{
      comesFromLeft('.email-contact-item')
    },2000)
    setTimeout(()=>{
      comesFromDown('.email-item')
    },2000)

  },[userDetails])

  return (
      <Layout title="Emails">
        <div className="emails">
        {userDetails !== null && userDetails.inbox_password.length !== 0 
          ? <React.Fragment>
            <div className="emails__search">
              <button className="emails__write-btn" onClick={()=>{
                   setIsPreview(false)
              }}>Write Message</button>
              <Search />
            </div>
            <div className="emails__main">
              <div className="emails__contacts-wrapper">
                <div className="emails__contacts">
                  {userDetails?.contacts?.map((contact:Contact) => <Email.ContactItem key={contact.id} contact={contact} />)}
                </div>
              </div>
              <div className="emails__emails-wrapper">
                <div className="emails__emails">
                  {!isPreview && !isContact && emails.includes('loading')
                    ? <Spinner />
                    : emails.length === 0 
                    ? <div className="emails__not-connected">
                        <h1>Inbox Empty</h1>
                      </div>
                    : !isPreview && !isContact && emails.map((email:any) => <Email.Item key={email.id} isView={true} handleEmailItemIsPreviewFn={handleEmailItemIsPreviewFn} img="/assets/user.png" email={email} />)}
                  {isPreview && !isContact && <Email.Preview handlePreviewFn={handlePreviewFn} handleHideFn={handleHideFn} />}
                  {isContact && !isPreview && <Email.Write handleHideFn={handleHideFn} />}
                </div>
              </div>
            </div>
          </React.Fragment>
          : <div className="emails__not-connected">
              <h1>Inbox Not Connected</h1>
           </div>}
        </div>

      </Layout>
  )
}

export default EmailsPage
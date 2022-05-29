import React,{ useEffect,useState } from 'react'
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
  const { unseenEmails,emails, userDetails } = useSelector((state:State) => state.user)
  const { isContact, isPreview } = useSelector((state:State) => state.ui)
  const UI = bindActionCreators(UIActions,dispatch)

  const [tempContacts,setTempContacts] = useState<Contact[]>([])
  const [currentEmails,setCurrentEmails] = useState<any[]>([])
  const [previousEmails,setPreviousEmails] = useState<any[]>([])

  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [isSet,setIsSet] = useState<boolean>(false)

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
    UI.setIsPreview(false)
  }

  const handleHideFn = () =>{
    UI.setIsPreview(false)
    UI.setIsContact(false)
  }
  
  const handleEmailItemIsPreviewFn = () => {
    UI.setIsPreview(true)
  }

  const handleTab = (e:any) =>{
    const type:string = e.target.dataset.type
    const headings = document.querySelectorAll('.emails__tab-headings h3') as NodeListOf<HTMLHeadingElement>
    headings.forEach((h:HTMLHeadingElement)=> h.classList.remove('active'))
    e.target.classList.add('active')
    switch(type){
      case 'all':
        setCurrentEmails(emails)
        setPreviousEmails(emails)
        break
      case 'unseen':
        setCurrentEmails(unseenEmails)
        setPreviousEmails(unseenEmails)
        break
    }
  }
 
  useEffect(()=>{
    if(!isLoad){
      setTimeout(()=>{
        comesFromLeft('.email-contact-item')
      },2000)
      setTimeout(()=>{
        comesFromDown('.email-item')
      },2000)
      if(userDetails?.contacts?.length > 0){
        setTempContacts(userDetails?.contacts)
      }
      setIsLoad(true)
    }
    comesFromLeft('.email-contact-item')
    if(emails.length > 0 && !isSet){
      setCurrentEmails(emails)
      setIsSet(true)
    }
  },[userDetails,emails,unseenEmails,tempContacts,currentEmails])

  return (
      <Layout title="Emails">
        <div className="emails">
        {userDetails !== null && userDetails.inbox_password.length !== 0 
          ? <React.Fragment>
            <div className="emails__search">
              <button className="emails__write-btn" onClick={()=>{
                    UI.setIsPreview(false)
                    UI.setIsContact(true)
              }}>Write Message</button>
              <Search name="Search Contacts" contacts={userDetails?.contacts} setContacts={setTempContacts} />
              <Search name="Search Emails" emails={previousEmails} setEmails={setCurrentEmails} />
            </div>
            <div className="emails__main">
              <div className="emails__contacts-wrapper">
                <div className="emails__contacts">
                  {tempContacts.length > 0 && tempContacts.map((contact:Contact) => <Email.ContactItem key={contact.id} contact={contact} />)}
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
                    : !isPreview && !isContact && 
                      <React.Fragment>
                        {currentEmails.length > 0 && 
                          <div className="emails__tab">
                            <div className="emails__tab-headings">
                              <h3 data-type="all" className="active" onClick={(e)=>handleTab(e)}>All</h3>
                              <h3 data-type="unseen" onClick={(e)=>handleTab(e)}>Unseen From Yesterday</h3>
                            </div>
                            {currentEmails.map((email:any) => <Email.Item key={email.id} isView={true} handleEmailItemIsPreviewFn={handleEmailItemIsPreviewFn} img="/assets/user.png" email={email} />)}
                          </div>}
                      </React.Fragment>}
                  {isPreview && !isContact && <Email.Preview handlePreviewFn={handlePreviewFn} handleHideFn={handleHideFn} />}
                  {isContact && !isPreview && <Email.Write handleHideFn={handleHideFn} />}
                </div>
              </div>
            </div>
          </React.Fragment>
          : !isPreview && !isContact && 
           <div className="emails__not-connected">
              <h1>Inbox Not Connected</h1>
           </div>}
        </div>

      </Layout>
  )
}

export default EmailsPage
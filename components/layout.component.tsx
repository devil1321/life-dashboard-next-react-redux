import React,{ useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Nav from './navbar-components/navbar.components'
import Sidebar from './sidebar-components/sidebar.components'
import Head from 'next/head'
import Spinner from './spinner.component'
import LockScreen from './lock-screen.component';
import { State } from '../controllers/reducers'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as UserActions from '../controllers/action-creators/user.actions-creators'
import * as ContactsActions from '../controllers/action-creators/contacts.actions-creators'
import * as ChatActions from '../controllers/action-creators/chat.actions-creators'
import * as InvoicesActions from '../controllers/action-creators/invoices.actions-creators'
import * as TodoActions from '../controllers/action-creators/todo.actions-creators'

interface LayoutProps{
  title:string,
  children:any
}

const Layout:React.FC<LayoutProps> = ({children,title}) => {
  const dispatch = useDispatch()
  const { user, userDetails } = useSelector((state:State) => state.user)
  const { contacts } = useSelector((state:State) => state.contacts)
  const { allMessages } = useSelector((state:State) => state.chat)
  const { isLocked } = useSelector((state:State) => state.ui)
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [isSet,setIsSet] = useState<boolean>(false)
  const userActions = bindActionCreators(UserActions,dispatch)
  const contactsActions = bindActionCreators(ContactsActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const invoicesActions = bindActionCreators(InvoicesActions,dispatch)
  const todoActions = bindActionCreators(TodoActions,dispatch)

  const [loading,setLoading] = useState<boolean>(true)
  const router = useRouter()
  
  const sidebarRef = useRef(null)
  
  useEffect(()=>{
    // if(isLoad && !user && router.asPath !== '/' && router.asPath !== '/sign-in'){
    //   router.push('/')
    // }
    if(isLocked){
      setLoading(true)
      setTimeout(()=>{
        if(userDetails !== null){
          setLoading(false)
        }
      },2000)
    }
    userActions.traceChanges()
    if(user && userDetails === null){
      userActions.setUserDetails(user.email)
      setTimeout(()=>{
        setIsLoad(true)
      },1000)
    }else{
      setTimeout(()=>{
        setIsLoad(true)
      },1000)
    }
    if(isLoad && user && userDetails !== null && !isSet){
      todoActions.setTasks(userDetails.id)
      todoActions.traceChanges(userDetails.id)
      userActions.setEmails(userDetails.email,userDetails.inbox_password)
      userActions.setUnseenEmails(userDetails.email,userDetails.inbox_password)
      contactsActions.setContacts()
      chatActions.setMessages(userDetails.email)
      invoicesActions.setInvoices(userDetails.id)
      invoicesActions.trackInvoices(userDetails.id)
      setIsSet(true)
    }else{
      if(!user && isLoad && !isSet){
        setIsSet(true)
      }
    }
    if(isSet){
      if(user && userDetails !== null){
        userActions.setUnknowContacts(allMessages,userDetails?.contacts,contacts,userDetails?.email)
        invoicesActions.countMoneyAndUp()
        todoActions.filterMonthly()
        const startYear = new Date(Number(user?.metadata?.createdAt)).getFullYear()
        const endYear = new Date().getFullYear()
        todoActions.filterAllRejectionsAndOrdersMonthly(startYear,endYear)
        invoicesActions.countMoneyYearlyByMonth(startYear,endYear)
        invoicesActions.setFields(userDetails.invoice_fields)
      }
      setTimeout(()=>{
        setLoading(false)
      },2500)
      if(!user && router.asPath !== 'sign-in' && router.asPath !== '/'){
        router.push('/')
      }
    }
  
  },[user,isLocked,userDetails,allMessages,isSet,isLoad])

  return (
    <React.Fragment>
      {isLocked 
       ? loading 
         ? <Spinner />
         : <LockScreen />
       : <React.Fragment>
        {loading 
        ? <Spinner />
        : <div className="container">
          <Head>
            <title>DASH | {title}</title>
            <meta name="description" content="Dash a Admin Template To Manage Company. Look And Try It Out!" />
            <meta name="keywords" content="company,admin,template,admin template,life,manage,dashboard,company dashboard" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

           <Sidebar.Main innerRef={sidebarRef} />
           <div className="container-inner">
                <Nav.Navbar innerRef={sidebarRef} /> 
               {children}
          </div>
        </div>}
      </React.Fragment>}
    </React.Fragment>
  )
}

export default Layout


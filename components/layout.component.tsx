import React,{ useState, useEffect } from 'react'
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

interface LayoutProps{
  title:string,
  children:any
}

const Layout:React.FC<LayoutProps> = ({children,title}) => {
  const dispatch = useDispatch()
  const { user, userDetails } = useSelector((state:State) => state.user)
  const { isLocked } = useSelector((state:State) => state.ui)
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const userActions = bindActionCreators(UserActions,dispatch)
  const contactsActions = bindActionCreators(ContactsActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)

  const [loading,setLoading] = useState<boolean>(true)
  const router = useRouter()
  
  useEffect(()=>{
    if(isLoad && user === null && router.asPath !== 'sign-in' && router.asPath !== '/'){
      router.push('/')
    }
    if(!isLocked){
      setTimeout(()=>{
          setLoading(false)
      },2000)
    }else{
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
      setIsLoad(true)
    }
    if(isLoad && user && userDetails !== null){
      userActions.setEmails(userDetails.email,userDetails.inbox_password)
      userActions.setUnknowContacts()
      contactsActions.setContacts()
      chatActions.setMessages(userDetails.email)
      
    }
  },[user,isLocked,userDetails])

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
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

           <Sidebar.Main />
           <div className="container-inner">
                <Nav.Navbar /> 
               {children}
          </div>
        </div>}
      </React.Fragment>}
    </React.Fragment>
  )
}

export default Layout
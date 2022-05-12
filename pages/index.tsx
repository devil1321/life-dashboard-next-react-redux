import React,{ useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import  Image from 'next/image'
import Loader from '../components/loader.component'
import Link from 'next/link'
import { State } from '../controllers/reducers'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as UserActions from '../controllers/action-creators/user.actions-creators'

interface FormDataState{
    email:string;
    password:string;
}

const IndexPage:NextPage = () => {
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
  const { error, user } = useSelector((state:State) => state.user)
  const router = useRouter()
  const [formData,setFormData] = useState<FormDataState>({
      email:'',
      password:'',
  })

  const handleFormData = (e:any) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value
      }))
  }


  const handleSubmit = (e:any) => {
      e.preventDefault()
      userActions.loginUser(formData.email,formData.password)
       setFormData({
           email:'',
           password:''
       })      
  }
  useEffect(()=>{
    if(user){
        router.push('/dashboard')
    }
  },[user])
  return (
    <Loader title="Log In">
        <div className="sign">
            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                <fieldset>
                    <legend>Sign In</legend>
                    {error && <div className="sign__err">{error}</div>}
                    <div className="sign__img">
                        <Image layout="responsive" src="/assets/login.svg" width={400} height={400} />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={(e:any)=>handleFormData(e)}/>
                    </div>
                    <div className="sign__field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={(e:any)=>handleFormData(e)} />
                    </div>
                <button type="submit">Log In</button>
                <button onClick={()=>userActions.loginUserGoogle()} className="sign__google">Google</button>
                <Link href="/sign-up" passHref={true}>
                    <a className="sign__sign-link">Sign Up</a>
                </Link>
                </fieldset>
            </form>
        </div>
    </Loader>
  )
}

export default IndexPage
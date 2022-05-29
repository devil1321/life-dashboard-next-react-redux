import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../components/loader.component'
import { useRouter } from 'next/router'
import { State } from '../controllers/reducers'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as UserActions from '../controllers/action-creators/user.actions-creators'
import Link from 'next/link'

interface FormDataState{
    email:string;
    password:string;
}

const SignUpPage:NextPage = () => {
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
        new Promise((res:any,rej:any) => {
            userActions.singUpUser(formData.email,formData.password)
            setTimeout(()=>{userActions.setUserDetails(formData.email)},500)
            setFormData({
                email:'',
                password:''
              })      
          }).then(()=>  setTimeout(()=>{userActions.loginUser(formData.email,formData.password)},100) )
    }    
    useEffect(()=>{
      if(user !== null){
          router.push('/dashboard')
      }
    },[user])

  return (
      <Loader title="Sign Up">
            <div className="sign">
            <form action="" onSubmit={(e:any) => handleSubmit(e)}>
                <fieldset>
                    <legend>Sign Up</legend>
                    {error && <div className="sign__err">{error}</div>}
                    <div className="sign__img">
                        <Image layout="responsive" src="/assets/sign-up.svg" width={400} height={400} />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={(e:any)=>handleFormData(e)}/>
                    </div>
                    <div className="sign__field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={(e:any)=>handleFormData(e)} />
                    </div>
                <button type="submit">Sign Up</button>
                <Link href="/" passHref={true}>
                    <a className="sign__sign-link">Login</a>
                </Link>
                </fieldset>
            </form>
        </div>
    </Loader>
  )
}

export default SignUpPage
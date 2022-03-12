import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Loader from '../components/loader.component'

const SignUp:NextPage = () => {
  return (
      <Loader title="Sign Up">
            <div className="sign">
            <form action="">
                <fieldset>
                    <legend>Sign Up</legend>
                    <div className="sign__img">
                        <Image layout="responsive" src="/assets/sign-up.svg" width={400} height={400} />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="password">Password</label>
                        <input type="password" />
                    </div>
                <button type="submit">Sign Up</button>
                </fieldset>
            </form>
        </div>
    </Loader>
  )
}

export default SignUp
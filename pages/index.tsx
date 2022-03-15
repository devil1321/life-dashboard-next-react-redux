import React from 'react'
import { NextPage } from 'next'
import  Image from 'next/image'
import Loader from '../components/loader.component'

const Index:NextPage = () => {
  return (
    <Loader title="Log In">
        <div className="sign">
            <form action="">
                <fieldset>
                    <legend>Sign In</legend>
                    <div className="sign__img">
                        <Image layout="responsive" src="/assets/login.svg" width={400} height={400} />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" />
                    </div>
                    <div className="sign__field">
                        <label htmlFor="password">Password</label>
                        <input type="password" />
                    </div>
                <button type="submit">Log In</button>
                </fieldset>
            </form>
        </div>
    </Loader>
  )
}

export default Index
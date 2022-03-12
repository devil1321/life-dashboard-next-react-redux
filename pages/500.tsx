import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Loader from '../components/loader.component'

const ServerError:NextPage = () => {
  return (
    <Loader title="Server Error">
        <div className="server-error">
            <div className="server-error__img">
               <Image
                    src="/assets/500.webp"
                    alt="500"
                    layout="responsive"
                    width={900}
                    height={500}
                    quality={100}
                />
              </div>
        </div>
    </Loader>
  )
}

export default ServerError
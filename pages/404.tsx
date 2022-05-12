import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Loader from '../components/loader.component'

const NotFoundPage:NextPage = () => {
  return (
    <Loader title="Not Found">
        <div className="not-found">
            <div className="not-found__img">
                <Image
                    src="/assets/404.webp"
                    alt="404"
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

export default NotFoundPage
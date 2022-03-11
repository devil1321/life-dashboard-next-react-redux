import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Spinner = () => {
  return (
    <div className="lazy-layout-loader"><HashLoader color="#0f8d6c" size={100} /></div>
  )
}

export default Spinner
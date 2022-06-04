import React from 'react'
import { NavLinkProps } from 'react-router-dom'

interface NavProps{
  setType:(state:boolean) => any
}

const Nav:React.FC<NavProps> = ({setType}) => {
  return (
    <div className="statistics__nav">
      <button className="statitics__btn" onClick={()=>setType(true)}>All Years Analytics By Month</button>
      <button className="statitics__btn" onClick={()=>setType(false)}>Last Year Analytics By Month </button>
    </div>
  )
}

export default Nav
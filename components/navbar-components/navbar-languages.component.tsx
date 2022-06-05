import React, { MutableRefObject } from 'react'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface LanguagesMenuProps{
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(element:MutableRefObject<HTMLDivElement>) => void;
}

const Languages:React.FC<LanguagesMenuProps> = ({innerRef,handleMenu}) => {
  return (
    <div className="navbar__languages" >
        <FontAwesomeIcon icon={faFlag}  onClick={()=>handleMenu(innerRef)}/>
        <div className="navbar__languages-menu --close-modifier" ref={innerRef}>
            <h3 onClick={()=>handleMenu(innerRef)} className="navbar__languages-item">EN</h3>
            <h3 onClick={()=>handleMenu(innerRef)} className="navbar__languages-item">US</h3>
            <h3 onClick={()=>handleMenu(innerRef)} className="navbar__languages-item">PL</h3>
            <h3 onClick={()=>handleMenu(innerRef)} className="navbar__languages-item">GE</h3>
        </div>
    </div>
  )
    
}

export default Languages
import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import logo from '../../animations/icons-json/12-layers.json'
import Link from 'next/link';

interface LogoProps{
    title:string;
    href:string;
}

const Logo:React.FC<LogoProps> = ({title,href}) => {

  const logoRef =  useRef<HTMLDivElement | null>(null)

  const handleIcon = (ref:any) => {
    ref?.current?.play()
    setTimeout(()=>{
      ref?.current?.stop()
    },1500)
  }
    
  return (
    <div className="sidebar__logo" onMouseEnter={()=>handleIcon(logoRef)}>
        <span className='sidebar__logo-anim'>
        <Player
            ref={logoRef}
            loop
            hover={true}
            src={logo}
            style={{ height: '40px', width: '40px' }}
          >
          </Player>
          </span>
          <Link href={href}>
            <h1>{title.toUpperCase()}</h1>
          </Link>
  </div>
  )
}

export default Logo
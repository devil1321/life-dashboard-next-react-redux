import React, { useRef } from 'react'
import gsap from 'gsap'
import { Player } from '@lottiefiles/react-lottie-player';
import logo from '../../animations/icons-json/12-layers.json'
import Link from 'next/link';

interface LogoProps{
    title:string;
    href:string;
    innerRef:any;
}

const Logo:React.FC<LogoProps> = ({innerRef,title,href}) => {

  const logoRef =  useRef<HTMLDivElement | null>(null)

  const handleIcon = (ref:any) => {
    ref?.current?.play()
    setTimeout(()=>{
      ref?.current?.stop()
    },1500)
  }

  const handleSidebar = () =>{
    if(typeof window !== undefined){
      if(window.innerWidth <= 768){
        if(innerRef.current.classList.contains('--sidebar-close')){
          gsap.to(innerRef.current,{width:'30%'})
          innerRef.current.classList.remove('--sidebar-close')
          innerRef.current.classList.add('--sidebar-open')
        }else{
          gsap.to(innerRef.current,{width:'10%'})
          innerRef.current.classList.remove('--sidebar-open')
          innerRef.current.classList.add('--sidebar-close')
        }
      }else if(window.innerWidth <= 1000 && window.innerWidth > 768 && window.innerWidth > window.innerHeight){
        if(innerRef.current.classList.contains('--sidebar-close')){
          gsap.to(innerRef.current,{width:'30%'})
          innerRef.current.classList.remove('--sidebar-close')
          innerRef.current.classList.add('--sidebar-open')
        }else{
          gsap.to(innerRef.current,{width:'8%'})
          innerRef.current.classList.remove('--sidebar-open')
          innerRef.current.classList.add('--sidebar-close')
        }
      }
    }
  }
    
  return (
    <div className="sidebar__logo" onMouseEnter={()=>handleIcon(logoRef)}>
        <span className='sidebar__logo-anim' onClick={()=>handleSidebar()}>
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
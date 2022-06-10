import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link'
import gsap from 'gsap'

interface ItemProps{
    innerRef:any;
    src:any;
    href:string;
    title:string;
}

const Item:React.FC<ItemProps> = ({innerRef,src,href,title}) => {
  
    const iconRef = useRef<HTMLDivElement | null>(null)
  
    const handleIcon = (ref:any) => {
    ref?.current?.play()
    setTimeout(()=>{
      ref?.current?.stop()
    },1500)
  }
 
  return (
      <Link href={href} passHref={true}>
        <a className="sidebar__menu-item"  onClick={()=>gsap.to(innerRef.current,{width:'0%'})}  onMouseEnter={()=>handleIcon(iconRef)}>
          <span className="sidebar__icon">
            <Player
             ref={iconRef}
              loop
              hover={true}
              src={src}
              style={{ height: '40px', width: '40px' }}
            >
            </Player>
          </span>
          <span className="sidebar__link">{title}</span>
      </a>
    </Link>
  )
}

export default Item
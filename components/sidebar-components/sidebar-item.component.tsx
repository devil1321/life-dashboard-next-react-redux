import React, { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link'

interface ItemProps{
    src:any;
    href:string;
    title:string;
}

const Item:React.FC<ItemProps> = ({src,href,title}) => {
  
    const iconRef = useRef<HTMLDivElement | null>(null)
  
    const handleIcon = (ref:any) => {
    ref?.current?.play()
    setTimeout(()=>{
      ref?.current?.stop()
    },1500)
  }
 
  return (
    <div className="sidebar__menu-item"  onMouseEnter={()=>handleIcon(iconRef)}>
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
    <Link href={href} passHref={true}>
      <a className="sidebar__link">{title}</a>
    </Link>
  </div>
  )
}

export default Item
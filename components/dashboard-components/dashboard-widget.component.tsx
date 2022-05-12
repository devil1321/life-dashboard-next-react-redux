import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react'

interface SmalLWidgetProps{
    title:string;
    count:number
    icon:any;
}

const Widget:React.FC<SmalLWidgetProps> = ({title,count,icon}) => {
  return (
    <div className="small-widget">
        <div className="small-widget__content">
            <h3>{title}</h3>
            <h3>{count}</h3>
        </div>
        <Player
            loop
            autoplay
            src={icon}
            style={{ height: '60px', width: '60px' }}
         >
        </Player>
    </div>
  )
}

export default Widget
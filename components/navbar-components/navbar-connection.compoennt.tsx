import React, { MutableRefObject } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import connection from '../../animations/icons-json/726-wireless-connection.json'

interface ConnectionProps{
    innerRef:MutableRefObject<HTMLDivElement>
    handleMenu:(element:MutableRefObject<HTMLDivElement>) => void;
}

const Connection:React.FC<ConnectionProps> = ({innerRef,handleMenu}) => {
  return (
    <div className="navbar__connection" onClick={()=>handleMenu(innerRef)}>
        <Player
            autoplay
            loop
            src={connection}
            style={{ height: '40px', width: '40px' }}
        >
        </Player>
    <div className="navbar__connection-menu --close-modifier" ref={innerRef}>
        <div className="navbar__connection-menu-item"><p>Connected</p></div>
    </div>
</div>
  )
}

export default Connection
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import search from '../../animations/icons-json/19-magnifier-zoom-search.json'

const Search = () => {
    
  return (
    <div className="navbar__search">
            <form action="">
                <div className="navbar__field">
                    <input type="text" />
                    <Player
                        loop
                        hover={true}
                        src={search}
                        style={{ height: '40px', width: '40px' }}
                    >
                    </Player>
                </div>
            </form>
        </div>
  )
}

export default Search
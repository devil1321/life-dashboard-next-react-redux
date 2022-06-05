import React, { MutableRefObject, useRef , useState, useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import search from '../../animations/icons-json/19-magnifier-zoom-search.json'
import { Contact as ContactType, UserDetails } from '../../interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

const Search = () => {
    const { contacts }:{ contacts:ContactType[] } = useSelector((state:State) => state.contacts)
    const { userDetails }:{ userDetails:UserDetails } = useSelector((state:State) => state.user)
    const dispatch = useDispatch()
    const userActions = bindActionCreators(UserActions,dispatch)
    const [matches,setMatches] = useState<ContactType[]>([])
    const [term,setTerm] = useState<ContactType[]>([])
    const playerRef = useRef() as MutableRefObject<any>
  
  const handleSearch = () =>{
      const regex = new RegExp(`^${term}`,'gi')
      const matches = contacts.filter((c:ContactType) => c.name.match(regex) || c.surname.match(regex) || c.email.match(regex))
      console.log(matches)
      if(term.length > 0){
          setMatches(matches)
      }else{
        setMatches([])
      }
  }

  useEffect(()=>{
    handleSearch()
  },[term])
    
  return (
    <div className="navbar__search">
            <form action="">
                <div className="navbar__field" onMouseEnter={()=>playerRef.current.play()} onMouseLeave={()=>playerRef.current.stop()}>
                    <input type="text" onChange={(e:any)=>setTerm(e.target.value)}/>
                    <Player
                        ref={playerRef}
                        loop
                        hover={true}
                        src={search}
                        style={{ height: '40px', width: '40px' }}
                    >
                    </Player>
                </div>
            </form>
            {matches.length > 0 && 
                <div className="navbar__matches">
                    {matches.map((m:ContactType) => 
                    <div className="navbar__search-item">
                        {m.name && m.surname && <h3>{m.name} {m.surname}</h3>}
                        <p>{m.email}</p>
                        <button onClick={()=>userActions.updateUserContacts(userDetails?.id,m)}>Save</button>
                    </div>)}
                </div>}
        </div>
  )
}

export default Search
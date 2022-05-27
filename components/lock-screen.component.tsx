import React,{useState} from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../controllers/action-creators/ui.actions-creators'
import { State } from '../controllers/reducers'

const LockScreen = () => {


  const { userDetails } = useSelector((state:State) => state.user)
  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const [password,setPassword] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    if(userDetails.lock_screen_password === password){
      setPassword('')
      UI.handleLock(false)
    }
  }

  return (
    <div className="sign">
    <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <fieldset>
            <legend>Lock Screen</legend>
            <div className="sign__img">
                <Image layout="responsive" src="/assets/login.svg" width={400} height={400} />
            </div>
            <div className="sign__field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} />
            </div>
        <button type="submit">Unlock</button>
        </fieldset>
    </form>
</div>
  )
}

export default LockScreen
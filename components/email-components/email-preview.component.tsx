import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux' 
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

interface PreviewProps{
    handlePreviewFn:() => void;
    handleHideFn:() => void;
}

const Preview:React.FC<PreviewProps>= ({handlePreviewFn,handleHideFn}) => {

  const { email, user } = useSelector((state:State) => state.user)
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)
 
  if(Object.keys(email).length > 0){
    var { subject, mail } = email
    var name = email.from.value[0].name
    var address = email.from.value[0].address
  }


  return (
    <React.Fragment>
      <div className="emails__preview-item">
         <h3>From : <span>{address} | {name}</span></h3>
         <h3>Subject: <span>{subject}</span></h3>
         <div className="emails__msg-html" dangerouslySetInnerHTML={{ __html:mail}}></div>
       </div>
       <div className="emails__preview-controls">
           <button className="emails__write-btn" onClick={()=>{
             handlePreviewFn()
             userActions.setReplyDetails(address,subject)
            }}>Reply</button>
           <button className="emails__hide-btn" onClick={()=>handleHideFn()}>Hide</button>
        </div>
    </React.Fragment>
  )
}

export default Preview
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

interface WriteProps{
    handleHideFn:() => void;
}

interface FormData{
  from:string;
  to:string,
  subject:string,
  text:string,
}

const Write:React.FC<WriteProps> = ({handleHideFn}) => {
  const { userDetails, replyDetails } = useSelector((state:State) => state.user)
  const { name, surname, email, inbox_password } = userDetails
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UserActions,dispatch)

  const [formData,setFormData] = useState<FormData>({
    from:'',
    to:'',
    subject:'',
    text:''
  })

  const handleChange = (e:any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  useEffect(()=>{
    setFormData((prevState) => ({
      ...prevState,
      to:replyDetails.email,
      subject:replyDetails.subject,
      from:email + " " + surname
    }))
  },[userDetails,replyDetails])

  return (
    <div className="emails__write-item">
        <div className="emails__write-field">
          <label htmlFor="">To:</label>
          <input type="text" name="to" value={formData.to} onChange={(e)=>handleChange(e)} />
        </div>
        <div className="emails__write-field">
          <label htmlFor="">Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={(e)=>handleChange(e)} />
        </div>
        <div className="emails__write-field">
          <textarea id="" name="text" value={formData.text} onChange={(e)=>handleChange(e)}></textarea>
        </div>
        <div className="emails__write-controls">
          <button className="emails__hide-btn" onClick={()=>handleHideFn()}>Hide</button> 
          <button className="emails__send-btn" onClick={()=>{
            userActions.sendEmail(email,inbox_password,formData)
            setFormData((prevState)=> ({  
              ...prevState,
              to:'',
              subject:'',
              text:''
            }))
            setTimeout(()=>{
              userActions.setEmails(email,inbox_password)
            },5000)
          }}>Send</button> 
        </div>
  </div>
  )
}

export default Write
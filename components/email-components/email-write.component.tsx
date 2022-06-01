import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'
import Form from '../form-components/form.components'
import { getBase64 } from '../../modules/convert.module'
import { EmailAttachement } from '../../interfaces'

interface WriteProps{
    handleHideFn:() => void;
}

interface FormData{
  from:string;
  to:string,
  subject:string,
  text:string,
  attachments:EmailAttachement[] | any[];
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
    text:'',
    attachments:[],
  })

  const handleChange = (e:any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const attachChange = (e:any) =>{
    const tempAttachments = [...formData.attachments]
    const tempFiles = Array.from(e.target.files);
    tempFiles.forEach(async(f:any)=>{
      const base64 = await getBase64(f)
      const attachment = {
        filename:f.name as string,
        content:base64 as string,
        encoding: 'base64'
      }
      tempAttachments.push(attachment)
    })
  
    setFormData((prevState) => ({
      ...prevState,
      attachments:tempAttachments
    }))
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const fileInput = document.querySelector('.invoices__input-file input') as HTMLInputElement
    fileInput.value = ""
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
        <Form.File type="file" id="custom-file" iconName="Files Up 20MB" name="files"  multiple attachChange={attachChange} />
          <button className="emails__hide-btn" onClick={()=>handleHideFn()}>Hide</button> 
          <button className="emails__send-btn" onClick={(e)=>{
            userActions.sendEmail(email,inbox_password,formData)
            setFormData((prevState)=> ({  
              ...prevState,
              to:'',
              subject:'',
              text:'',
              attachments:[]
            }))
            handleSubmit(e)
            setTimeout(()=>{
              userActions.setEmails(email,inbox_password)
            },5000)
          }}>Send</button> 
        </div>
  </div>
  )
}

export default Write
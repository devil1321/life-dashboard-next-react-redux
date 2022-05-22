import React, { useState, useEffect } from 'react'
import Form from './form.components'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UserActions from '../../controllers/action-creators/user.actions-creators'

const SettingsForm = () => {
 
 const dispatch = useDispatch()
 const userActions = bindActionCreators(UserActions,dispatch)
 const { userDetails } = useSelector((state:State) => state.user)
 const { id, name, surname, email, employee, company, lock_screen_password, phoneNumber, nip, inbox_email, inbox_password, photoURL } = userDetails

 const [formData,setFormData] = useState({
     name:'',
     surname:'',
     email:'',
     employee:'',
     company:'',
     lock_screen_password:'',
     phoneNumber:'',
     nip:'',
     inbox_email:'',
     inbox_password:'',
     photoURL:null
 })

 const handleChange = (e:any) =>{
     setFormData((prevState)=>({
         ...prevState,
         [e.target.name]:e.target.value
     }))
 }

 const handlePhotoUrlToBase64 = (e:any,data:string) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:data
        }))
 }

 const handleSubmit = (e:any) =>{
     e.preventDefault()
     userActions.updateUserProfile(id,formData)
     setTimeout(()=>{
         setFormData({
            name:'',
            surname:'',
            email:'',
            employee:'',
            company:'',
            lock_screen_password:'',
            phoneNumber:'',
            nip:'',
            inbox_email:'',
            inbox_password:'',
            photoURL:null
         })
     },100)
 }

 useEffect(()=>{
     if(userDetails !== null){
         setFormData({
            name:name,
            surname:surname,
            email:email,
            employee:employee,
            company:company,
            lock_screen_password:lock_screen_password,
            phoneNumber:phoneNumber,
            nip:nip,
            inbox_email:inbox_email,
            inbox_password:inbox_password,
            photoURL:photoURL,
        })
    }
 },[userDetails])

  return (
    <div className="settings__form-wrapper">
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <div className="settings__form-split">
                <Form.Field name="name" type="text" label="Name" value={formData.name}  handleChange={handleChange}/>
                <Form.Field name="surname" type="text" label="Surname" value={formData.surname}  handleChange={handleChange} />
            </div>
            <div className="settings__form-split">
                <Form.Field name="employee" type="text" label="Employee" value={formData.employee}  handleChange={handleChange}/>
                <Form.Field name="company" type="text" label="Company" value={formData.company}  handleChange={handleChange}/>
            </div>
            <div className="settings__form-split">
                <Form.Field name="phoneNumber" type="number" label="Phone Number" value={formData.phoneNumber}  handleChange={handleChange}/>
                <Form.Field name="nip" type="text" label="Nip" value={formData.nip}  handleChange={handleChange}/>
            </div>
            <div className="settings__form-split">
                <Form.Field name="inbox_email" type="text" label="Inbox Email" value={formData.inbox_email}  handleChange={handleChange}/>
                <Form.Field name="inbox_password" type="password" label="Inbox Password" value={formData.inbox_password}  handleChange={handleChange}/>
            </div>
            <Form.Field name="lock_screen_password" type="password" label="Lock Screen Password" value={formData.lock_screen_password}  handleChange={handleChange}/>
            <Form.File type="file" id="custom-file" label="Photo" iconName="JPG" name="photoURL" accept=".jpg" handleChange={handlePhotoUrlToBase64} />
            <button type="submit" className="settings__form-submit-btn">Update Profile</button>
        </form>
    </div> 
  )
}

export default SettingsForm
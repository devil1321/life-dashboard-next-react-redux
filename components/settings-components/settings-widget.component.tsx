import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { UserDetails } from '../../interfaces'

const Widget = () => {
  const {  userDetails }:{ userDetails:UserDetails } = useSelector((state:State) => state.user)

  const {  email , name, surname, company, employee , phoneNumber, photoURL } = userDetails

  return (
    <div className="settings__widget">
        <div className="settings__image">
            {photoURL !== null
                ? <img src={photoURL} alt="profile-pic" />
                : <img src="/assets/user.png" alt="" />}
        </div>
        <div className="settings__main-info">
            <h3>{name} {surname}</h3>
            <p><span className="font-bold">Email:</span> {email}</p>
            {company.length !== 0 && <p><span className="font-bold">Company:</span> {company}</p>}
            {employee.length  !== 0 && <p><span className="font-bold">Employee:</span> {employee}</p>}
            {phoneNumber !== null && <p><span className="font-bold">PhoneNumber:</span> {phoneNumber}</p>}
        </div>
    </div>
  )
}

export default Widget
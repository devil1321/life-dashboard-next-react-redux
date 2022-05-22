import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'

const Widget = () => {
  const { user, userDetails } = useSelector((state:State) => state.user)

  const { id, email , name, surname, company, employee , phoneNumber, photoURL } = userDetails

  return (
    <div className="settings__widget">
        <div className="settings__image">
            {photoURL !== null
                ? <img src={photoURL} alt="profile-pic" />
                : <img src="/assets/user.png" alt="" />}
        </div>
        <div className="settings__main-info">
            <h3>{name} {surname}</h3>
            <p>{email}</p>
            {company.length !== 0 && <p>Company: {company}</p>}
            {employee.length  !== 0 && <p>Employee: {employee}</p>}
            {phoneNumber !== null && <p>PhoneNumber: {phoneNumber}</p>}
        </div>
    </div>
  )
}

export default Widget
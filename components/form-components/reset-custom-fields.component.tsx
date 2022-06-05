import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UsersActions from '../../controllers/action-creators/user.actions-creators'
import { Field } from '../../interfaces'

const ResetCustomFields = () => {
  const { id } = useSelector((state:State) => state.user.userDetails)
  const dispatch = useDispatch()
  const userActions = bindActionCreators(UsersActions,dispatch)

  const handleResetFields = () =>{
    userActions.updateUserInvoiceFields(id,[])
  }

  return (
    <button type="button" className="invoices__custom-field-btn invoices__green-btn" onClick={()=>handleResetFields()}>Reset Fields</button>
  )
}

export default ResetCustomFields
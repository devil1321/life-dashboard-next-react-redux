import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as UsersActions from '../../controllers/action-creators/user.actions-creators'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'
import { Field } from '../../interfaces'

const SaveCustomFields = () => {
  const { id, invoice_fields } = useSelector((state:State) => state.user.userDetails)
  const { fields } = useSelector((state:State) => state.invoices)
  const [customFields,setCustomFields] = useState<Field[]>([])

  const dispatch = useDispatch()
  const userActions = bindActionCreators(UsersActions,dispatch)
  const invoicesActions = bindActionCreators(InvoicesActions,dispatch)

  const handleFields = () => {
      const tempFields:Field[] = []
      fields.map((field:Field) => {
          tempFields.push({
              name:field.name,
              isHeading:field.isHeading
            })
      })
      setCustomFields(tempFields)
  }

  useEffect(()=>{
    handleFields()
    console.log(customFields)
  },[fields.length])

  return (
    <button type="button" className="invoices__custom-field-btn invoices__green-btn" 
      onClick={()=>{
        userActions.updateUserInvoiceFields(id,customFields)
        invoicesActions.resetFields()
      }}
    >Save Fields</button>
  )
}

export default SaveCustomFields
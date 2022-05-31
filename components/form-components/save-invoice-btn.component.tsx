import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '../../controllers/reducers' 
import { bindActionCreators } from 'redux'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'

const SaveBtn = () => {
  const { userDetails } = useSelector((state:State)=>state.user)
  const { formData } = useSelector((state:State) => state.invoices)
  const dispatch = useDispatch()
  const invoicesActions = bindActionCreators(InvoicesActions, dispatch)

  return (
    <button type="submit" className="invoices__green-btn invoices__save" onClick={()=>{
        invoicesActions.addInvoice(formData,formData.file,userDetails?.id)
      }}>Save Invoice</button>
  )
}

export default SaveBtn
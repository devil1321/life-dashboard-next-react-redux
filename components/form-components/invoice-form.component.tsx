import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'

import Form from './form.components'

interface InvoiceFormProps {
    customFormFn:(name:string,val:string,blob:any) => void;
  }

const InvoiceForm:React.FC<InvoiceFormProps> = ({customFormFn}) => {

const dispatch = useDispatch()
const invoicesActions = bindActionCreators(InvoicesActions,dispatch)

const handleForm = (e:any) => {
    e.preventDefault()
}

  return (

    <form action="" onSubmit={(e)=>handleForm(e)}>
     <Form.File type="file" id="custom-file" label="PDF File" iconName="PDF" name="file" accept=".pdf" onChange={customFormFn} />
     <Form.Field type="text" label="Invoice Nr." name="invoiceNR" onChange={invoicesActions.handleFormData} />
     <Form.Field type="number" label="Money" name="money" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="Tax" name="" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="Tax" name="tax" onChange={invoicesActions.handleFormData} />
     <Form.Field type="number" label="Bonuses" name="bonuses" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="NIP" name="nip" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="First Name" name="firstName" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="Last Name" name="lastName" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="Adress" name="adress" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="Zip Code" name="zipCode" onChange={invoicesActions.handleFormData} />
     <Form.Field type="text" label="City" name="city" onChange={invoicesActions.handleFormData} />
     <Form.SaveBtn />    
   </form>

  )
}

export default InvoiceForm
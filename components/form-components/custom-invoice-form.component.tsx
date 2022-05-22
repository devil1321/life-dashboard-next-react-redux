import React from 'react'
import * as Converter from '../../modules/convert.module'
import Form from './form.components'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controllers/reducers'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'

interface CustomFormProps {
  customFormFn:(name:string,val:string,blob:any) => void;
}

const CustomForm:React.FC<CustomFormProps> = ({customFormFn}) => {

  const dispatch = useDispatch()
  const invoicesActions = bindActionCreators(InvoicesActions,dispatch)
  const { invoiceFields } = useSelector((state:State) => state.user.userDetails)

  const handleSubmit = (e:any) => {
    e.preventDefault()
  }

  return (
    <form action="" onSubmit={(e)=>handleSubmit(e)}>
      <Form.File type="file" id="custom-file" label="PDF File" iconName="PDF" name="file" accept=".pdf" onChange={customFormFn} />
      <Form.Field type="text" label="Invoice Nr." name="invoiceNR" onChange={invoicesActions.handleFormData} />
      <Form.Field type="date" label="Date" name="date" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Money" name="money" onChange={invoicesActions.handleFormData} />
      <Form.Field type="number" label="Tax" name="tax" onChange={invoicesActions.handleFormData} />
      <Form.Field type="number" label="Bonuses" name="bonuses" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="NIP" name="nip" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="First Name" name="firstNam" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Last Name" name="lastName" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Adress" name="adress" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Zip Code" name="zipCode" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="City" name="city" onChange={invoicesActions.handleFormData} />
      {invoiceFields.length > 0 && invoiceFields.map((field:any) => <Form.Field type="text" label={field.name} name={field.name} onChange={invoicesActions.handleFormData} />)}
      <Form.CustomMenu />
      <Form.SaveBtn />
   </form>
  )
}

export default CustomForm
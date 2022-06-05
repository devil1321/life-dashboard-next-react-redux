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
  const { formData } = useSelector((state:State) => state.invoices)
  const { userDetails } = useSelector((state:State) => state.user)

  const handleSubmit = (e:any) => {
    e.preventDefault()
    invoicesActions.addInvoice(formData,formData.file,userDetails?.id)
    const form = document.querySelector('form') as HTMLFormElement
    form.reset()
  }
    

  return (
    <form action="" onSubmit={(e)=>handleSubmit(e)}>
      <Form.File type="file" id="custom-file" label="PDF File" iconName="PDF" name="file" accept=".pdf" onChange={customFormFn} />
      <Form.Field type="text" label="Invoice Nr." name="invoiceNR" onChange={invoicesActions.handleFormData} />
      <Form.Field type="date" label="Date" name="date" onChange={invoicesActions.handleFormData} />
      <Form.Field type="number" label="Tax" name="tax" onChange={invoicesActions.handleFormData} />
      <Form.Field type="number" label="Bonuses" name="bonuses" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Money" name="money" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="NIP" name="nip" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="First Name" name="firstNam" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Last Name" name="lastName" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Company" name="company" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Adress" name="adress" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="Zip Code" name="zipCode" onChange={invoicesActions.handleFormData} />
      <Form.Field type="text" label="City" name="city" onChange={invoicesActions.handleFormData} />
      <Form.CustomMenu />
   </form>
  )
}

export default CustomForm
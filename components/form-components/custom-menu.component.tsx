import React, { useState, useRef, MutableRefObject } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'
import Form from './form.components'

const CusomMenu = ({}) => {

    const [isMenuField,setIsMenuField] = useState<boolean>(false)
    const [isHeading,setIsHeading] = useState<boolean>(false)
    const [fieldText,setFieldText] = useState<string>('')
    const [fieldName,setFieldName] = useState<string>('')

    const dispatch = useDispatch()
    const invoicesActions = bindActionCreators(InvoicesActions,dispatch)

    const invoicesFieldMenuRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>


    const handleFieldMenu = (e:any) =>{
     e.preventDefault()
     if(!isMenuField){
       setIsMenuField(true)
     }else{
       invoicesFieldMenuRef.current.classList.add('close')
       setTimeout(()=>{
         setIsMenuField(false)
       },1000)
     }
   }

   const addCustomField = (e:any,name:string,text:string) => {
    e.preventDefault()
    const customField = document.querySelector('.invoices__custom-fields') as HTMLDivElement
    const field = document.createElement('div')
          field.classList.add('invoices__field')
    const fieldElements = `
                      <label>${name}:</label>
                      <input name="${name}" value="${text}">
                   `
    field.innerHTML = fieldElements 
    const customFieldInstance = {
      name:name,
      isHeading:isHeading,
      text:text
    }
    if(customFieldInstance.name !== '' && customFieldInstance.text !== ''){
      customField?.append(field)
      invoicesActions.setField(customFieldInstance)
      setFieldName('')
      setFieldText('')
  }
}


  return (
      <React.Fragment>

    <h2 className="invoices__field invoices__heading">Custom Fields</h2>
    <div className="invoices__custom-fields">
    
    </div>
     <Form.Field type="text" label="Field Name" name="field-text" value={fieldName} onChangeCustom={setFieldName}/>
     <Form.Field type="text" label="Field Text" name="field-name" value={fieldText} onChangeCustom={setFieldText}/>
    <div className="invoices__field invoices__custom">
        <button onClick={(e)=>handleFieldMenu(e)}>Field Type</button>
        {isMenuField && 
          <div className="invoices__field-type" ref={invoicesFieldMenuRef}>
            <p onClick={(e)=>{
              setIsHeading(true)
              handleFieldMenu(e)
              }}>Heading</p>
            <p onClick={(e)=>{
              setIsHeading(false)
              handleFieldMenu(e)
              }}>Text</p>
          </div>}
          <Form.AddCustomFieldBtn fn={addCustomField} fieldName={fieldName} fieldText={fieldText}/>
          <Form.SaveCustomFields />
          <Form.ResetCustomFields />
        </div>
      </React.Fragment>

  )
}

export default CusomMenu
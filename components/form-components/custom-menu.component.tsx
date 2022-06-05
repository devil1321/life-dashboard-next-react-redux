import React, { useState, useRef, MutableRefObject } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'
import { bindActionCreators } from 'redux'
import * as InvoicesActions from '../../controllers/action-creators/invoices.actions-creators'
import Form from './form.components'

const CustomMenu = ({}) => {

    const [isMenuField,setIsMenuField] = useState<boolean>(false)
    const [isHeading,setIsHeading] = useState<boolean>(false)
    const [fieldName,setFieldName] = useState<string>('')

    const { fields } = useSelector((state:State) => state.invoices)

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

   const addCustomField = (e:any,name:string) => {
    e.preventDefault()
   
    const customFieldInstance = {
      name:name,
      isHeading:isHeading,
    }
    if(customFieldInstance.name !== ''){
      invoicesActions.setField(customFieldInstance)
      setFieldName('')
  }
}


  return (
      <React.Fragment>

    <h2 className="invoices__field invoices__heading">Custom Fields</h2>
    <div className="invoices__custom-fields">
      {fields.length > 0 && fields.reverse().map((field:any,index:number) => <Form.Textarea key={index} label={field.name} name={field.name} onChange={invoicesActions.handleFormData} />)}
    </div>
     <Form.Field type="text" label="Field Name" name="field-text" value={fieldName} onChangeCustom={setFieldName}/>
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
          <Form.AddCustomFieldBtn fn={addCustomField} fieldName={fieldName} />
          <Form.SaveCustomFields />
          <Form.ResetCustomFields />
          <Form.SaveBtn />
        </div>
      </React.Fragment>

  )
}

export default CustomMenu
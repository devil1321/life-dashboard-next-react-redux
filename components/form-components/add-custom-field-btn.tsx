import React from 'react'

interface AddBtnProps{
    fn:(e:any,fieldName:string,fieldText:string)=>void;
    fieldName:string;
    fieldText:string;
}

const AddBtn:React.FC<AddBtnProps> = ({fn,fieldName,fieldText}) => {
  return (
    <button onClick = {(e)=>fn(e,fieldName,fieldText)} className="invoices__custom-field-btn invoices__green-btn">Add Custom Field</button>
  )
}

export default AddBtn
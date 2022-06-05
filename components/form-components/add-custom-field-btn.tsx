import React, { useEffect, useState } from 'react'

interface AddBtnProps{
    fn:(e:any,fieldName:string)=>void;
    fieldName:string;
}

const AddBtn:React.FC<AddBtnProps> = ({fn,fieldName}) => {

  return (
    <button type="button" onClick = {(e)=>{
      fn(e,fieldName)
    }} className="invoices__custom-field-btn invoices__green-btn">Add Custom Field</button>
  )
}

export default AddBtn
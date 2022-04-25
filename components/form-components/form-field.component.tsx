import React from 'react'
import { Dispatch } from 'redux'

interface FieldProps{
  label:string;
  type:string
  name:string;
  value?:any;
  onChange?:(name:string,val:string)=> (dispatch:Dispatch<any>) => void
  onChangeCustom?:(val:string) => any
}

const Field:React.FC<FieldProps> = ({label,type,name,value,onChange,onChangeCustom}) => {
  return (
    <div className="invoices__field">
        <label htmlFor="">{label}</label>
        <input type={type} name={name} value={value} onChange={(e)=>{
          if(onChange){
            onChange(e.target.name,e.target.value)
          }
          if(onChangeCustom){
            onChangeCustom(e.target.value)
           }
        }} />
    </div>
  )
}

export default Field
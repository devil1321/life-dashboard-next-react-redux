import React from 'react'
import { Dispatch } from 'redux'

interface FieldProps{
  label:string;
  name:string;
  value?:any;
  onChange?:(name:string,val:string)=> (dispatch:Dispatch<any>) => void
  onChangeCustom?:(val:string) => any
  handleChange?:(e:any) => any
}

const Textarea:React.FC<FieldProps> = ({label,name,value,onChange,onChangeCustom,handleChange}) => {
  return (
    <div className="invoices__field">
        <label htmlFor="">{label}</label>
        <textarea required  name={name.toLocaleLowerCase()} value={value} onChange={(e)=>{
          if(onChange){
              onChange(e.target.name,e.target.value)
          }
          if(onChangeCustom){
            onChangeCustom(e.target.value)
           }
           if(handleChange){
             handleChange(e)
           }
        }} />
    </div>
  )
}

export default Textarea
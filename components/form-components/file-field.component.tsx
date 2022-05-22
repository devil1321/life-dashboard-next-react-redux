import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons' 
import * as Converter from '../../modules/convert.module'

interface FileProps{
    type:string;
    label:string;
    iconName:string;
    id:string;
    name:string;
    accept:string;
    onChange?:(name:string,val:string,blob:any) => void;
    handleChange?:(e:any,data:string)=>any
}

const File:React.FC<FileProps> = ({type,label,iconName,id,name,accept,onChange,handleChange}) => {
  return (
    <div className="invoices__field">
    <label htmlFor="file">{label}</label>
    <label htmlFor="" className="invoices__input-file">
      <FontAwesomeIcon icon ={faFileInvoice} />{iconName}
      <input type={type} id={id} name={name} accept={accept} onChange={async(e)=>{
        // @ts-ignore
        const data = await Converter.getBase64(e.target.files[0]).then((data:any) =>data)
        const blob = await Converter.base64toUrl(data)
        if(onChange){
          onChange(e.target.name,data,blob)
        }
        if(handleChange){
          handleChange(e,data)
        }
      }} />
    </label>
    </div>
  )
}

export default File
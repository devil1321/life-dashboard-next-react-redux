import React, { SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import {  } from 'react';

interface InvoiceItemProps{
    file:string;
    setPdfUrl:(state:string) => void
    isAnim:boolean;
    setIsInvoice:(state:boolean) => void
    setIsInvoiceLoad:(state:boolean) => void
    setIsAnim:(state:boolean) => void
    comesIn:(item:string) => void
}

const InvoiceItem:React.FC<InvoiceItemProps> = ({file,setPdfUrl,isAnim,setIsInvoice,setIsInvoiceLoad,setIsAnim,setIsAdd,comesIn}) => {
  return (
    <div className="invoice-item">
        <div className="invoice-item__icon">
            <FontAwesomeIcon icon={faFileInvoice} />
        </div>
        <div className="invoice-item__info">
            <h3>Invoice NR</h3>
            <p>Date</p>
        </div>
        <h3>First Name Last Name</h3>
        <p>Money</p>
        <div className="invoice-item__controls">
            <button onClick={(e:any)=>{
                setIsInvoice(true)
                setIsInvoiceLoad(false)
                setPdfUrl(file)
                setIsAdd(false)
                if(isAnim){
                    comesIn('.invoice-item')
                    setIsAnim(false)
                    e.target.setAttribute('disabled','disabled')
                    setTimeout(()=>{
                      e.target.removeAttribute('disabled','false')
                    },3000)
                    
                }
            }}>View</button>
        </div>
    </div>
  )
}

export default InvoiceItem
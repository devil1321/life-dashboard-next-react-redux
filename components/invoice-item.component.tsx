import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

const InvoiceItem = ({file,setPdfUrl,isAnim,setIsInvoice,setIsInvoiceLoad,setIsAnim,comesIn}) => {
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
            <button onClick={(e)=>{
                setIsInvoice(true)
                setIsInvoiceLoad(false)
                setPdfUrl(file)
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
import React, { SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

interface InvoiceItemProps{
    fn:(e:any) => void
    comesIn:(item:string) => void
}

const Item:React.FC<InvoiceItemProps> = ({fn,comesIn}) => {
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
               fn(e)
            }}>View</button>
        </div>
    </div>
  )
}

export default Item
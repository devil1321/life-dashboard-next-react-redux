import React, { SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { Invoice } from '../../interfaces'

interface InvoiceItemProps{
    fn:(e:any,id:string) => void
    comesIn:(item:string) => void
    invoice:Invoice;
}

const Item:React.FC<InvoiceItemProps> = ({fn,comesIn,invoice}) => {

    const { id, invoiceNR, firstName, lastName, money, date } = invoice
  
    return (
    <div className="invoice-item">
        <div className="invoice-item__icon">
            <FontAwesomeIcon icon={faFileInvoice} />
        </div>
        <div className="invoice-item__info">
            <h3>{invoiceNR}</h3>
            <p>{date}</p>
        </div>
        <h3>{firstName} {lastName}</h3>
        <p>{money}</p>
        <div className="invoice-item__controls">
            <button onClick={(e:any)=>{
               fn(e,id)
            }}>View</button>
        </div>
    </div>
  )
}

export default Item
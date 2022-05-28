import React, { SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { Invoice } from '../../interfaces'

interface InvoiceItemProps{
    id:string;
    fn:(e:any,id:any) => void
    comesIn:(item:string) => void
    invoice:Invoice;
    setInvoices:(id:string) => any
    removeInvoice:(id:any) => any
}

const Item:React.FC<InvoiceItemProps> = ({id,fn,comesIn,invoice,setInvoices,removeInvoice}) => {

    const { firebaseId, invoiceNR, firstName, lastName, money, date } = invoice
  
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
            <button className="invoice-item__remove-btn" onClick={()=>{
                removeInvoice(firebaseId as string)
                setInvoices(id)
                }}>Remove</button>
            <button onClick={(e:any)=>{
               fn(e,firebaseId as string)
            }}>View</button>
        </div>
    </div>
  )
}

export default Item
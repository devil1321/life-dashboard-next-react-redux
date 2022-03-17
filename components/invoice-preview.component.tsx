import React,{ useEffect, useState } from 'react'
import { usePDF } from '@react-pdf/renderer'
import Invoice from './invoice.component';
import { InvoicesFormDataParams } from '../interfaces';


interface InvoicePreviewProps {
    isInvoice:boolean;
    isInvoiceLoad:boolean;
    pdfUrl:string;
    formData:{
        file:string;
        invoiceNR:string;
        money:number;
        tax:number;
        bonuses:number;
        nip:string;
        firstName:string;
        lastName:string;
        adress:string;
        zip:string
        city:string;
    }
}

const InvoicePreview:React.FC<InvoicePreviewProps> = ({isInvoice,isInvoiceLoad,pdfUrl,formData}) => {
  
  const document = <Invoice formData={formData} />
  const [instance, update] = usePDF({ document });

  useEffect(()=>update(document),[formData])

  return (
    <div className="invoices__invoice">
      {isInvoice && !isInvoiceLoad &&
        <embed  width="500" src={instance.url} height="375" type="application/pdf" />
      }
      {isInvoice && isInvoiceLoad &&
        <embed  width="500" src={pdfUrl} height="375" type="application/pdf" />
      }
    </div>
  )
}

export default InvoicePreview
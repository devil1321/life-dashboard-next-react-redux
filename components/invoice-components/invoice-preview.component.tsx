// @ts-ignore
import React,{ useEffect, useImperativeHandle, useState } from 'react'
import { usePDF } from '@react-pdf/renderer'
import Invoice from './invoice.components';
import { Field } from '../../interfaces';


interface PreviewProps {
      isInvoice:boolean;
      isInvoiceLoad:boolean;
      isCustomInvoice:boolean;
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
          company:string;
      }
      fields:Field[]
}

const Preview = React.forwardRef<PreviewProps,any> = ((props,ref) => {
  
  const document = <Invoice.InvoicePDF formData={props.formData} />
  const customDocument = <Invoice.CustomInvoicePDF formData={props.formData} fields={props.fields} />
  const [instance, update] = usePDF({ document });
  const [customInstance,updateCustomInstance] = usePDF({ document:customDocument })

  useEffect(()=>{
    update(document)
    updateCustomInstance(customDocument)
  },[props.formData,props.fields.length])

  return (
    <div className="invoices__invoice" >
      {props.isInvoice && !props.isInvoiceLoad && !props.isCustomInvoice &&
        <embed  width="500" src={instance.url} height="375" type="application/pdf" />
      }
      {props.isInvoice && props.isInvoiceLoad && !props.isCustomInvoice &&
        <embed  width="500" src={props.pdfUrl} height="375" type="application/pdf" />
      }
      {props.isInvoice && !props.isInvoiceLoad && props.isCustomInvoice &&
        <embed  width="500" src={customInstance.url} height="375" type="application/pdf" />
      }
    </div>
  )
})

export default Preview
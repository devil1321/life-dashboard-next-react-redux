// @ts-ignore
import React,{ useEffect } from 'react'
import { usePDF } from '@react-pdf/renderer'
import Invoice from './invoice.components';
import { Field } from '../../interfaces';
import { useSelector } from 'react-redux'
import { State } from '../../controllers/reducers'


interface PreviewProps {
      isInvoice:boolean;
      isInvoiceLoad:boolean;
      isCustomInvoice:boolean;
      pdfUrl:string;
      formData:{
          file:string;
          invoiceNR:string;
          date:string;
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

const Preview = React.forwardRef<any,PreviewProps>((props,ref) => {

  const { userDetails } = useSelector((state:State) => state.user)
  const ivoiceDocument = <Invoice.InvoicePDF formData={props.formData} userDetails={userDetails}/>
  const customDocument = <Invoice.CustomInvoicePDF formData={props.formData} fields={props.fields} userDetails={userDetails}/>
  const [instance, update] = usePDF({ document:ivoiceDocument });
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
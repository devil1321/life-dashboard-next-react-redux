import { NextPage } from 'next'
import React, { useState,useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../controllers/reducers'
import * as InvoicesActions from '../controllers/action-creators/invoices.actions-creators'
import Layout from '../components/layout.component'

import { BlobProvider } from '@react-pdf/renderer'

interface PDF{
  blob:string;
  url:string;
  loading:boolean;
  error:string;
}
import dynamic from "next/dynamic";
const InvoicePreview = dynamic(() => import("../components/invoice-preview.component"), { ssr: false });

const Invoices:NextPage = () => {

  
    const [isForm,setIsForm] = useState<boolean>(true)
    const [isInvoice,setIsInvoice] = useState<boolean>(true)
    const [isInvoiceLoad,setIsInvoiceLoad] = useState<boolean>(false)
    const [pdfUrl,setPdfUrl] = useState<string>("")
    const dispatch = useDispatch()
    const invoicesActions = bindActionCreators(InvoicesActions,dispatch)
    const { formData } = useSelector((state:State) => state.invoices)
  
  
  
  
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }:{ numPages:any}) {
      setNumPages(numPages);
    }
    
    function getBase64(file:any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  
    const b64toUrl = async (base64Data:string) => {
      const r = await fetch(base64Data);
      const blob = await r.blob();
      return URL.createObjectURL(blob);
    }
  
  
    return (
      <Layout title="Invoices">
          <div className="invoices">
            <div className="invoices__inner">
              <div className="invoices__left-panel">
             {isForm && 
             <div className="invoices__form-wraper">
                <form action="">
                  <div className="invoices__field">
                    <label htmlFor="">Invoice PDF</label>
                    <input type="file" name="file" accept=".pdf" onChange={async(e)=>{
                      const data = await getBase64(e.target.files[0]).then((data:any) =>data)
                      const blob = await b64toUrl(data)
                      invoicesActions.handleFormData(e.target.name,data)
                      setIsInvoiceLoad(true)
                      setPdfUrl(blob)
                    }} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Invoice Nr.</label>
                    <input type="text" name="invoiceNR"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)}  />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Money</label>
                    <input type="number" name="money" onChange={(e)=>{
                      invoicesActions.handleFormData(e.target.name,e.target.value)
                    }}/>
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Tax</label>
                    <input type="number" name="tax"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Bonuses</label>
                    <input type="number" name="bonuses"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">NIP</label>
                    <input type="text" name="nip"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstName"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="lastName"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Adress</label>
                    <input type="text" name="adress"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">Zip Code</label>
                    <input type="text" name="zip-code"onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                  <div className="invoices__field">
                    <label htmlFor="">City</label>
                    <input type="text"name="city" onChange={(e)=>invoicesActions.handleFormData(e.target.name,e.target.value)} />
                  </div>
                 </form>
                 {!isInvoice 
                  ? <button onClick={()=>{
                       setIsInvoice(true)
                     }}>Preview Invoice</button>
                  : <button onClick={()=>{
                      setIsInvoice(false)
                      }}>Hide Invoice</button>}
                </div>}
                
              
              </div>
              <div className="invoices__right-panel">
                      
              </div>
            </div>
            <InvoicePreview isInvoice={isInvoice} isInvoiceLoad={isInvoiceLoad} formData={formData} pdfUrl={pdfUrl} />

          </div>
      </Layout>
    )
  }

export default Invoices
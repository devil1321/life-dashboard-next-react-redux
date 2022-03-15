import { NextPage } from 'next'
import React, { useState,useEffect, useRef } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../controllers/reducers'
import * as InvoicesActions from '../controllers/action-creators/invoices.actions-creators'
import Layout from '../components/layout.component'
import { PDFViewer,PDFDownloadLink,BlobProvider } from '@react-pdf/renderer';
import Invoice from '../components/invoice.component'




const Invoices:NextPage = () => {
  const [isLoad,setIsLoad] = useState<boolean>(false)
  const [isForm,setIsForm] = useState<boolean>(true)
  const [isInvoice,setIsInvoice] = useState<boolean>(true)

  const dispatch = useDispatch()
  const invoicesActions = bindActionCreators(InvoicesActions,dispatch)
  


  return (
    <Layout title="Invoices">
        <div className="invoices">
          <div className="invoices__left-panel">
           {isForm && 
              <form action="">
              <div className="invoices__field">
                <label htmlFor="">Invoice</label>
                <input type="file" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Invoice Nr.</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Money</label>
                <input type="number" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Tax</label>
                <input type="number" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Bonuses</label>
                <input type="number" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">NIP</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">First Name</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Last Name</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Adress</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">Zip Code</label>
                <input type="text" />
              </div>
              <div className="invoices__field">
                <label htmlFor="">City</label>
                <input type="text" />
              </div>
               </form>}
              <div className="invoices__invoice">
            
                {isInvoice && 
                  <BlobProvider document={<Invoice />}>
                    {({ blob, url, loading, error }) => (
                      <embed  width="500" src={url} height="375" type="application/pdf" />
                    )}
                  </BlobProvider>}   
                  <PDFDownloadLink document={<Invoice />} fileName={"invoice"}>
                    <button>Download</button>
                  </PDFDownloadLink>
              </div>
            
          </div>
          <div className="invoices__right-panel">
           
          </div>
        </div>
    </Layout>
  )
}

export default Invoices
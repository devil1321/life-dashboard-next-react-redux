import { NextPage } from 'next'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState,useEffect,useRef, MutableRefObject } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../controllers/reducers'
import * as InvoicesActions from '../controllers/action-creators/invoices.actions-creators'
import gsap from 'gsap'
import Layout from '../components/layout.component'
import InvoiceItem from '../components/invoice-item.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
interface PDF{
  blob:string;
  url:string;
  loading:boolean;
  error:string;
}
import dynamic from "next/dynamic";
const InvoicePreview = dynamic(() => import("../components/invoice-preview.component"), { ssr: false });

const Invoices:NextPage = () => {
    const [isAdd,setIsAdd] = useState<boolean>(false)
    const [isAnim,setIsAnim] = useState<boolean>(false)
    const [isInvoice,setIsInvoice] = useState<boolean>(false)
    const [isInvoiceLoad,setIsInvoiceLoad] = useState<boolean>(false)
    const [pdfUrl,setPdfUrl] = useState<string>("")
    const dispatch = useDispatch()
    const invoicesActions = bindActionCreators(InvoicesActions,dispatch)
    const { formData } = useSelector((state:State) => state.invoices)
  
    const tempInArr = [1,2,3,5,6,7,8,9,10]
  
    
    function getBase64(file:any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  
    const base64toUrl = async (base64Data:string) => {
      const r = await fetch(base64Data);
      const blob = await r.blob();
      return URL.createObjectURL(blob);
    }
    const comesIn = (el:string | HTMLDivElement) => {
    
      const tl = gsap.timeline()
      
      tl.fromTo('.invoices__field', 
      {
           x: 0,
      },{
        x:-550,
        stagger: { 
          each: 0.15,
          from: "start",
          grid: "auto",
          ease: "power2.inOut",
        }})
        tl.to('.invoices__left-panel',{minWidth:"0%",width:"0%",duration:0});
        tl.to('.invoices__right-panel',{minWidth:"100%",width:"100%",duration:0})
        tl.to(el, {width:"50%",minWidth:"50%",duration:0})
        tl.to(el,{
          width:"100%",
          stagger: { 
            each: 0.15,
            from: "start",
            grid: "auto",
            ease: "power2.inOut",
          }
        })
        tl.to('.invoices__inner',{maxHeight:'100vh',duration:0})
    }

    const comesOut = (el:string | HTMLDivElement) => {
      const invoices = document.querySelectorAll('.invoice-item') as NodeListOf<HTMLDivElement>
      let invArr:HTMLDivElement[]
      invoices.forEach((invoice) => invArr.push(invoice))
      const tl = gsap.timeline()
      const formTL = gsap.timeline()
      tl.to(el, {
        width: "50%",
        stagger: { 
          each: 0.15,
          from: "start",
          grid: "auto",
          ease: "power2.inOut",
        },
      });
  
      setTimeout(()=>{
          formTL.to(el,{minWidth:"100%",duration:0})
          formTL.to('.invoices__left-panel',{minWidth:"50%",duration:0})
          formTL.to('.invoices__right-panel',{minWidth:"50%",width:"50%",duration:0})

        formTL.fromTo('.invoices__field', 
        {
          x: -550,
        },{
          x:0,
          stagger: { 
            each: 0.15,
            from: "start",
            grid: "auto",
            ease: "power2.inOut",
          }
        });
      },2500)
    }
    
    const setInnerContainer = (size:string):void => {
      const innerContainer = document.querySelector('.invoices__inner') as HTMLDivElement
      innerContainer.style.height = size
      innerContainer.style.maxHeight = size
    }
  

    return (
      <Layout title="Invoices">
          <div className="invoices">
          {!isAdd 
            ? <button className="invoices__green-btn" onClick={(e:any)=>{
                setInnerContainer("130vh")
                if(!isAnim){
                  comesOut('.invoice-item')
                  setIsAnim(true)
                  setIsAdd(true)
                  e.target.setAttribute('disabled','disabled')
                  setTimeout(()=>{
                    e.target.setAttribute('disabled','false')
                  },3000)
                }
                }}>Add Invoices</button>
              : <button className="invoices__red-btn" onClick={(e:any)=>{
                if(isAnim){
                  setIsAdd(false)
                  comesIn('.invoice-item')
                  setIsAnim(false)
                  e.target.setAttribute('disabled','disabled')
                  setTimeout(()=>{
                    e.target.setAttribute('disabled','false')
                  },3000)
                }
                }}>Hide Form</button>}
            <div className="invoices__inner">
              <div className="invoices__left-panel">
                  <div className="invoices__form-wraper">
                <form action="">
                  <div className="invoices__field">
                    <label htmlFor="file">Invoice PDF</label>
                    <label htmlFor="" className="invoices__input-file">
                      <FontAwesomeIcon icon ={faFileInvoice} /> PDF File
                      <input type="file" id="file" name="file" accept=".pdf" onChange={async(e)=>{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const data = await getBase64(e.target.files[0]).then((data:any) =>data)
                        const blob = await base64toUrl(data)
                        invoicesActions.handleFormData(e.target.name,data)
                        setIsInvoiceLoad(true)
                        setPdfUrl(blob)
                      }} />
                    </label>
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
                 
                   </div>              
              </div>
              <div className="invoices__right-panel">
                {tempInArr.map((item:any)=>(
                  <InvoiceItem file={"asdasds"} setPdfUrl={setPdfUrl} isAnim={isAnim} setIsInvoice={setIsInvoice} setIsInvoiceLoad={setIsInvoiceLoad}  setIsAnim={setIsAnim} comesIn = {comesIn} />
                ))}
              </div>
            </div>
            <div className="invoices__pdf-viewer">
            {!isInvoice 
                  ? <button className="invoices__green-btn" onClick={()=>{
                       setIsInvoice(true)
                     }}>Preview Invoice</button>
                  : <button className="invoices__red-btn" onClick={()=>{
                      setIsInvoice(false)
                      }}>Hide Invoice</button>}
              <InvoicePreview isInvoice={isInvoice} isInvoiceLoad={isInvoiceLoad} formData={formData} pdfUrl={pdfUrl} />
            </div>
          </div>
      </Layout>
    )
  }

export default Invoices
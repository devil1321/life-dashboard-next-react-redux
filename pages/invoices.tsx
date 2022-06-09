import { NextPage } from 'next'
// @ts-ignore
import React, { useState,useEffect,useRef, MutableRefObject } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../controllers/reducers'
import * as InvoicesActions from '../controllers/action-creators/invoices.actions-creators'
import gsap from 'gsap'
import Layout from '../components/layout.component'
import Form from '../components/form-components/form.components'

import Search from '../components/search.component'

interface PDF{
  blob:string;
  url:string;
  loading:boolean;
  error:string;
}

import dynamic from "next/dynamic";
import Invoice from '../components/invoice-components/invoice.components'
const InvoicePreview = dynamic(() => import("../components/invoice-components/invoice-preview.component"), { ssr: false });

const InvoicesPage:NextPage = () => {

    const dispatch = useDispatch()
    const { formData,fields,invoice,invoices } = useSelector((state:State) => state.invoices)
    const { userDetails } = useSelector((state:State) => state.user)
    const invoicesActions = bindActionCreators(InvoicesActions,dispatch)

    const [tempInvoices,setTempInvoices] = useState<any[]>([])
    const [isLoad,setIsLoad] = useState<boolean>(false)
    const [isAdd,setIsAdd] = useState<boolean>(false)
    const [isAnim,setIsAnim] = useState<boolean>(false)
    const [isInvoice,setIsInvoice] = useState<boolean>(false)
    const [isInvoiceLoad,setIsInvoiceLoad] = useState<boolean>(false)
    const [isCustomInvoice,setIsCustomInvoice] = useState<boolean>(false)
    const [pdfUrl,setPdfUrl] = useState<string>("")
    const [file,setFile] = useState<string>('')

    const comesIn = (el:string | HTMLDivElement) => {
    
      const tl = gsap.timeline()
      if(typeof window !== undefined){
        if(window.innerWidth > 767){

     
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
        tl.to('.invoices__inner',{maxHeight:'100%',duration:0})
      }else{
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
          tl.to(el, {width:"0%",minWidth:"0%",duration:0})
          tl.to(el,{
            width:"100%",
            stagger: { 
              each: 0.15,
              from: "start",
              grid: "auto",
              ease: "power2.inOut",
            }
          })
          tl.to('.invoices__inner',{maxHeight:'100%',duration:0})
      }
      }
    }

    const comesOut = (el:string | HTMLDivElement) => {
      const invoices = document.querySelectorAll('.invoice-item') as NodeListOf<HTMLDivElement>
      let invArr:HTMLDivElement[] = []
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
        if(typeof window !== undefined){
          if(window.innerWidth > 767){
            formTL.to('.invoice-item',{minWidth:"100%",duration:0})
            formTL.to('.invoices__left-panel',{minWidth:"50%",duration:0})
            formTL.to('.invoices__right-panel',{minWidth:"50%",width:"50%",duration:0})
          }else{
            formTL.to('.invoice-item',{minWidth:"100%",duration:0})
            formTL.to('.invoices__left-panel',{minWidth:"100%",duration:0})
            formTL.to('.invoices__right-panel',{minWidth:"100%",width:"100%",duration:0})
          }
        }

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
     
    const handleCustomFormFn = (name:string,data:any,blob:any) =>{
      invoicesActions.handleFormData(name,data)
      setIsInvoiceLoad(true)
      setPdfUrl(blob)
    }

    const handleItemFn = (e:any,id:string) => {
      setIsInvoice(true)
      setIsInvoiceLoad(true)
      setIsCustomInvoice(false)
      setIsAdd(false)
      setPdfUrl(file)

      invoicesActions.viewInvoice(id)
      if(isAnim){
          comesIn('.invoice-item')
          setIsAnim(false)
          e.target.setAttribute('disabled','disabled')
          setTimeout(()=>{
            e.target.removeAttribute('disabled','false')
          },3000)
          
      }

    }

    const setInnerContainer = (size:string):void => {
      const innerContainer = document.querySelector('.invoices__inner') as HTMLDivElement
      innerContainer.style.height = size
      innerContainer.style.maxHeight = size
    }
  
    const comesFromDown = (el:string) => {
      gsap.fromTo(el,{y:600},{y:0, stagger: { 
        each: 0.15,
        from: "start",
        grid: "auto",
        ease: "power2.inOut",
      }})
    }


      useEffect(()=>{
        invoicesActions.setInvoices(userDetails?.id)
        if(isInvoice && isInvoiceLoad && !isCustomInvoice && !isAdd){
          setPdfUrl(file)
        }
        if(isLoad){
          setTimeout(()=>{
            setFile(invoice.file)
          },1000)
          setTempInvoices(invoices)
        }
        if(!isLoad){
          setTimeout(()=>{
            comesFromDown('.invoice-item')
            setIsLoad(true)
          },2000)
        }
      },[invoice,invoices.length,isLoad,file])

    return (
      <Layout title="Invoices">
          <div className="invoices">
          <div className="invoices__header">

          {!isAdd 
            ? (
              <React.Fragment>
                <button className="invoices__green-btn" onClick={(e:any)=>{
                setInnerContainer("142vh")
                if(!isAnim){
                  comesOut('.invoice-item')
                  setIsAnim(true)
                  setIsAdd(true)
                  setIsCustomInvoice(false)
                  e.target.setAttribute('disabled','disabled')
                  setTimeout(()=>{
                    e.target.removeAttribute('disabled','false')
                  },3000)
                }
                }}>Add Invoice</button>
                <button className="invoices__green-btn" onClick={(e:any)=>{
                setInnerContainer("110%")
                if(!isAnim){
                  comesOut('.invoice-item')
                  setIsAnim(true)
                  setIsAdd(true)
                  setIsCustomInvoice(true)
                  e.target.setAttribute('disabled','disabled')
                  setTimeout(()=>{
                    e.target.removeAttribute('disabled','false')
                  },3000)
                }
                }}>Add Custom Invoice</button>
              </React.Fragment>
            )
              : <button className="invoices__red-btn" onClick={(e:any)=>{
                setIsAdd(false)
                if(isAnim){
                  comesIn('.invoice-item')
                  setIsAnim(false)
                  e.target.setAttribute('disabled','disabled')
                  setTimeout(()=>{
                    e.target.removeAttribute('disabled','false')
                  },3000)
                }
              }}>Hide Form</button>}
              <Search invoices={invoices} setInvoices={setTempInvoices} name="Search All Invoices" />
            </div>
            <div className="invoices__inner">
              <div className="invoices__left-panel">
                <div className="invoices__form-wrapper">
                {!isCustomInvoice 
                ? <Form.InvoiceForm customFormFn={handleCustomFormFn}/>
                : <Form.CustomForm customFormFn={handleCustomFormFn} />}
                </div>              
              </div>
              <div className="invoices__right-panel">
                {tempInvoices.length > 0 
                  ? <React.Fragment>
                 {tempInvoices.map((item:any)=>(
                  <Invoice.Item key={item} id={userDetails?.id} fn={handleItemFn} invoice={item} setInvoices={invoicesActions.setInvoices} removeInvoice={invoicesActions.removeInvoice} comesIn = {comesIn}  />
                    ))}
                  </React.Fragment> 
                  : <div className="invoices__empty">
                      <h2>Invoices Empty</h2>
                    </div>}
              </div>
            </div>
            <div className="invoices__pdf-viewer" style={isCustomInvoice ? {top:'-10px'} : {top:"60px"}}>
            {!isInvoice 
                  ? <button className="invoices__green-btn" onClick={()=>{
                       setIsInvoice(true)
                     }}>Preview Invoice</button>
                  : <button className="invoices__red-btn" onClick={()=>{
                      setIsInvoice(false)
                      }}>Hide Invoice</button>}
              <Invoice.Preview  
                isInvoice={isInvoice} 
                isInvoiceLoad={isInvoiceLoad} 
                isCustomInvoice={isCustomInvoice} 
                formData={formData} 
                fields={fields} 
                pdfUrl={pdfUrl} 
                />
            </div>
          </div>
      </Layout>
    )
  }

export default InvoicesPage
import React,{Dispatch, useState} from 'react'
import { Contact, Invoice } from '../interfaces'

interface SearchParams {
    name:string;
    emails?:any[],
    contacts?:Contact[],
    unknownContacts?:any[],
    invoices?:Invoice[]
    setEmails?:(state:any) => any
    setContacts?:(state:any) => any
    setTempUnknown?:(state:any) => any
    setInvoices?:(state:any) => any
}

const Search:React.FC<SearchParams> = ({name,emails,setEmails,invoices,setInvoices,contacts,setContacts,unknownContacts,setTempUnknown}) => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>('')

  const handleSearch = (val:string) =>{
    const regex = new RegExp(`^${val}`,'gi')
    if(emails && setEmails){
      const matches = emails.filter((e:any)=> e.from.value[0].address.match(regex) || e.from.value[0].name.match(regex))
      setEmails(matches)
    }
   
    if(contacts && setContacts){
      const matches = contacts.filter((c:any)=>{
        return c.email.match(regex)
      })
      setContacts(matches)
    }
    if(invoices && setInvoices){
      const matches = invoices.filter((i:Invoice)=>{
        return i.firstName.match(regex) || i.lastName.match(regex)
      })
      setInvoices(matches)
    }
    if(unknownContacts && setTempUnknown){
      const matchesUnkown = unknownContacts.filter((c:any)=>{
        return c.email.match(regex)
      })
      // @ts-ignore
      setTempUnknown(matchesUnkown)
    }
  } 

  const handleFilterAZ = () => {
    if(invoices && setInvoices){
      setInvoices(invoices.sort((a, b) => a.lastName.localeCompare(b.lastName)))
    }
    if(emails && setEmails){
      setEmails(emails.sort((a, b) => a.from.value[0].address.localeCompare(b.from.value[0].address)))
    }
   
    if(contacts && setContacts){
      setContacts(contacts.sort((a, b) => a.email.localeCompare(b.email)))
    }
    if(unknownContacts && setTempUnknown){
      // @ts-ignore
      setTempUnknown(unknownContacts.sort((a, b) => a.email.localeCompare(b.email)))
    }
    setIsFilter(false)
  }
  const handleFilterZA = () => {
    setIsFilter(true)
    if(invoices && setInvoices){
      setInvoices(invoices.sort((a, b) => a.lastName.localeCompare(b.lastName)).reverse())
    }
    if(emails && setEmails){
      setEmails(emails.sort((a, b) => a.from.value[0].address.localeCompare(b.from.value[0].address)).reverse())
    }
    
    
    if(contacts && setContacts){
      setContacts(contacts.sort((a, b) => a.email.localeCompare(b.email)).reverse())
    }
    if(unknownContacts && setTempUnknown){
      // @ts-ignore
      setTempUnknown(unknownContacts.sort((a, b) => a.email.localeCompare(b.email)).reverse())
    }
  }

  return (
    <div className="search">
       {!isFilter 
            ? <button className="search__a-z-btn" onClick={()=>{
                handleFilterZA()
            }}>A-Z</button>
            : <button className="search__a-z-btn" onClick={()=>{
                handleFilterAZ()
                }}>Z-A</button>}
                {/* @ts-ignore */}
        <input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} />
        <button className="search__search-all-contacts" onClick={()=>handleSearch(searchVal)}>{name}</button>
    </div>
  )
}

export default Search
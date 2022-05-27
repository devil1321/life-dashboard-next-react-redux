import React,{Dispatch, useState} from 'react'
import { Contact } from '../interfaces'

interface SearchParams {
    contacts:Contact[],
    unknownContacts?:any[],
    setContacts:(state:any) => any
    setTempUnknown?:(state:any) => any
}

const Search:React.FC<SearchParams> = ({contacts,setContacts,unknownContacts,setTempUnknown}) => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>('')

  const handleSearch = (val:string) =>{
    const regex = new RegExp(`^${val}`,'gi')
    const matches = contacts.filter((c:any)=>{
        return c.email.match(regex)
    })
    setContacts(matches)
    if(unknownContacts){
      const matchesUnkown = unknownContacts.filter((c:any)=>{
        return c.email.match(regex)
      })
      // @ts-ignore
      setTempUnknown(matchesUnkown)
    }
  } 

  const handleFilterAZ = () => {
    setContacts(contacts.sort((a, b) => a.email.localeCompare(b.email)))
    if(unknownContacts){
      // @ts-ignore
      setTempUnknown(unknownContacts.sort((a, b) => a.email.localeCompare(b.email)))
    }
    setIsFilter(false)
  }
  const handleFilterZA = () => {
    setIsFilter(true)
    setContacts(contacts.sort((a, b) => a.email.localeCompare(b.email)).reverse())
    if(unknownContacts){
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
        <button className="search__search-all-contacts" onClick={()=>handleSearch(searchVal)}>Search Contacts</button>
    </div>
  )
}

export default Search
import React,{Dispatch, useState} from 'react'

interface SearchProps {
    isSearchAll?:boolean;
    fn?:(params:any) => any | void 
    params?:any[]
}

const Search:React.FC<SearchProps> = ({isSearchAll,fn,params}) => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>("")

  return (
    <div className="search">
       {!isFilter 
            ? <button className="search__a-z-btn" onClick={()=>{
                if(fn && params){
                    // @ts-ignore
                    fn(searchVal,...params)
                }
                setIsFilter(true)
            }}>A-Z</button>
            : <button className="search__a-z-btn" onClick={()=>{
                if(fn && params){
                    // @ts-ignore
                    fn(searchVal,...params)
                }
                setIsFilter(false)
                }}>Z-A</button>}
                {/* @ts-ignore */}
        <input className={!isSearchAll ? "search__contacts" : null} type="text" value={searchVal} onChange={(e)=>{
            setSearchVal(e.target.value) 
            if(fn && params){
                // @ts-ignore
                fn(e.target.value,...params)
            }
        }} />
        {isSearchAll && <button className="search__search-all-contacts">Search New Contacts</button>}
    </div>
  )
}

export default Search
import React,{Dispatch, useState} from 'react'

interface SearchProps {
    fn?:(params:any) => any | void 
    params?:any[]
}

const Search:React.FC<SearchProps> = ({fn,params}) => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>("")

  return (
    <div className="search">
       {!isFilter 
            ? <button onClick={()=>{
                if(fn && params){
                    // @ts-ignore
                    fn(searchVal,...params)
                }
                setIsFilter(true)
            }}>A-Z</button>
            : <button onClick={()=>{
                if(fn && params){
                    // @ts-ignore
                    fn(searchVal,...params)
                }
                setIsFilter(false)
                }}>Z-A</button>}
        <input type="text" value={searchVal} onChange={(e)=>{
            setSearchVal(e.target.value) 
            if(fn && params){
                // @ts-ignore
                fn(searchVal,...params)
            }
        }} />
    </div>
  )
}

export default Search
import React,{useState,useCallback,useEffect} from 'react'

interface SearchProps {
    fn:() => any | void;
    params?:any[]
}

const Search:React.FC<SearchProps> = ({fn,params}) => {
  const [isFilter,setIsFilter] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<string>("")

  return (
    <div className="search">
       {!isFilter 
            ? <button onClick={()=>{
                fn(searchVal,...params)
                setIsFilter(true)
            }}>A-Z</button>
            : <button onClick={()=>{
                fn(searchVal,...params)
                setIsFilter(false)
                }}>Z-A</button>}
        <input type="text" value={searchVal} onChange={(e)=>{
            setSearchVal(e.target.value) 
            fn(searchVal,...params)
        }} />
    </div>
  )
}

export default Search
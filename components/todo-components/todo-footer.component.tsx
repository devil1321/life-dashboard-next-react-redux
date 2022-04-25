import React, { MutableRefObject } from 'react'

interface FooterProps{
    innerRef:MutableRefObject<HTMLButtonElement | null>;
    handleActiveButtonFn:(e:any)=>void
    handleCompletedButtonFn:(e:any)=>void
    handleAllButtonFn:(e:any)=>void
    handleClearButtonFn:(e:any)=>void
}

const Footer:React.FC<FooterProps> = ({innerRef,handleActiveButtonFn,handleCompletedButtonFn,handleAllButtonFn,handleClearButtonFn}) => {
  return (
    <div className="todo__footer">
      <button onClick={(e)=>{
        handleActiveButtonFn(e)
      }} ref={innerRef}>Active</button>
      <button onClick={(e)=>{
        handleCompletedButtonFn(e)
        }}>Completed</button>
      <button onClick={(e)=>{
        handleAllButtonFn(e)
        }}  className="active">All</button>
      <button onClick={(e)=>{
        handleClearButtonFn(e)
       }}>Clear</button>
    </div>
  )
}

export default Footer
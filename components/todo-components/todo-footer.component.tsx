import React, { MutableRefObject } from 'react'

interface FooterProps{
    isOrder:boolean;
    innerRef:MutableRefObject<HTMLButtonElement | null>;
    handleActiveButtonFn:(e:any)=>void
    handleCompletedButtonFn:(e:any)=>void
    handleFullfiledButtonFn:(e:any)=>void
    handleAllButtonFn:(e:any)=>void
    handleClearButtonFn:(e:any)=>void
    handleRejectedButtonFn:(e:any)=>void
}

const Footer:React.FC<FooterProps> = ({isOrder,innerRef,handleActiveButtonFn,handleCompletedButtonFn,handleFullfiledButtonFn,handleAllButtonFn,handleRejectedButtonFn,handleClearButtonFn}) => {
  return (
    <div className="todo__footer">
      <button onClick={(e)=>{
        handleActiveButtonFn(e)
      }} ref={innerRef}>Active</button>
      
        <button onClick={(e)=>{
            handleCompletedButtonFn(e)
         }}>Completed</button>
          {isOrder &&
         <button onClick={(e)=>{
            handleFullfiledButtonFn(e)
          }}>Fullfiled</button>}
       {isOrder && 
        <button onClick={(e)=>{
          handleRejectedButtonFn(e)
        }}>Rejected</button>}
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
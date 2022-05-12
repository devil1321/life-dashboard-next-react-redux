import React from 'react'

interface WriteProps{
    handleHideFn:() => void;
}

const Write:React.FC<WriteProps> = ({handleHideFn}) => {
  return (
    <div className="emails__write-item">
        <div className="emails__write-field">
          <label htmlFor="">To:</label>
          <input type="text" />
        </div>
        <div className="emails__write-field">
          <label htmlFor="">Subject:</label>
          <input type="text" />
        </div>
        <div className="emails__write-field">
          <textarea name="" id="" ></textarea>
        </div>
    <button className="emails__hide-btn" onClick={()=>handleHideFn()}>Hide</button>
  </div>
  )
}

export default Write
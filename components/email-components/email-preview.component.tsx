import React from 'react'

interface PreviewProps{
    handlePreviewFn:() => void;
    handleHideFn:() => void;
}

const Preview:React.FC<PreviewProps>= ({handlePreviewFn,handleHideFn}) => {
  return (
    <div className="emails__preview-item">
       <h3>From : email@gmail.com</h3>
       <h3>Subject: simple subject</h3>
       <p>FirstName LastName</p>
       <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae quam deleniti asperiores dolore eos omnis aperiam eius magni nihil ratione ex tenetur sapiente dolor excepturi voluptas sint minus iusto obcaecati quod officia, sed ab. Quod culpa, veniam doloremque maxime ad accusamus itaque doloribus esse laboriosam ipsam mollitia nobis illum, quibusdam laborum nulla, voluptates magni eligendi minus exercitationem consequatur voluptatem nihil. Non quibusdam distinctio asperiores inventore vero itaque, mollitia perspiciatis animi in labore? Perferendis pariatur iure iusto accusamus iste expedita reprehenderit officia explicabo sequi, at odio illum aspernatur sunt amet inventore id ducimus quo porro voluptatem distinctio dolor ab? Nisi, assumenda.</p>
       <div className="emails__preview-controls">
         <button className="emails__write-btn" onClick={()=>handlePreviewFn()}>Reply</button>
         <button className="emails__hide-btn" onClick={()=>handleHideFn()}>Hide</button>
       </div>
     </div>
  )
}

export default Preview
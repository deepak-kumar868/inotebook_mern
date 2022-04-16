import React, { useContext } from 'react'
import Notecontext from '../context/notes/Notecontext'

const Noteitem=(props)=>{
  const context=useContext(Notecontext);
  const {deletenote}=context;
  const {note,update,showalert}=props;
  const handleonclick=()=>{
    deletenote(note._id);
    showalert('success','Note deleted successfully')
  }

  const handleonupdate=()=>{
    update(note)
  }
  return (
    <>
    <div className="card col-md-3 mx-3 my-2">
    <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash" onClick={handleonclick}></i>
    <i className="fa-solid fa-pen-to-square mx-4" onClick={handleonupdate}></i>
   </div>
   </div>
    </>
  )
}

export default Noteitem

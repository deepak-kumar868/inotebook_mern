import React,{useContext,useEffect,useRef,useState} from 'react'
import { useHistory } from 'react-router-dom';
import notescontext from '../context/notes/Notecontext'
import Noteitem from './Noteitem';

const Notes=(props)=>{
  let history=useHistory();
  const {showalert}=props;
  const context = useContext(notescontext);
  const {notes,getnotes,updatenote}=context;
  const [note, setnote] = useState({etitle:"",edescription:"",etag:""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes()
  }else{
   history.push("/login")
  }
  }, [])

  const ref=useRef(null);
  const refClose=useRef(null);

  const update=(curr)=>{
     ref.current.click();
     setnote({id:curr._id,etitle:curr.title,edescription:curr.description,etag:curr.tag})
  }

  const handleonclick=(e)=>{
    e.preventDefault();
    updatenote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    showalert()
    showalert('success','Note updated successfully')
}

  const onchange=(event)=>{
    setnote({...note,[event.target.name]:event.target.value})
 }
  
  
  return (
    <>
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <div className='container'>
    <h1 className='text-center'>Add note</h1>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='etitle' minLength={3} onChange={onchange} aria-describedby="emailHelp" value={note.etitle}/>
  </div>
  <div className="mb-3">
    <label htmlFor="des" className="form-label">Description</label>
    <input type="text" className="form-control"name='edescription' minLength={5} onChange={onchange} id="description" value={note.edescription}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name='etag'onChange={onchange} id="tag" value={note.etag}/>
  </div>
    <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
</form>
    </div>

      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleonclick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
      <h2>Your Notes</h2>
    <div className='container mx-3'>
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note)=>{
      return <Noteitem key={note._id} note={note} update={update} showalert={showalert}/>
    })}
    </div>
    </>
  )
}

export default Notes
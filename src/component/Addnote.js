import React,{useContext,useState} from 'react'
import Notecontext from '../context/notes/Notecontext'
import Notes from './Notes';

const Addnote = (props) => {
    const context = useContext(Notecontext);
    const {showalert}=props;
    const {addnote}=context;

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleonclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        showalert('success','Note added successfully');
    }
    const onchange=(event)=>{
       setnote({...note,[event.target.name]:event.target.value})
    }
  return (
        <div className='container'>
    <h1 className='text-center'>Add note</h1>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" minLength={3} value={note.title} name='title' onChange={onchange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="des" className="form-label">Description</label>
    <input type="text" className="form-control"minLength={5} name="description" value={note.description} id="description" onChange={onchange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" value={note.tag} name="tag" id="tag" onChange={onchange} required/>
  </div>
    <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
  <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={handleonclick}>Add note</button>
</form>
    </div>
  )
}

export default Addnote

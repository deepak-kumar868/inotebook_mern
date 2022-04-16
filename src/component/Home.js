import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

const Home=(props)=>{
  const {showalert}=props;
  return (
    <>
    <div className='container'>
      <Addnote showalert={showalert}/>
    <Notes showalert={showalert}/>
    </div>
    </>
  )
}

export default Home
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const {showalert}=props;
    const [crediantals, setcrediantals] = useState({naam:"",email:"",password:"",cpassword:""})
    let history=useHistory();
    const handleonsubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({naam:crediantals.naam,email:crediantals.email,password:crediantals.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            showalert('success','Account created successfully')
            history.push('/')
        }else{
          showalert('danger','This email already have account')
        }
    }

    const onchange=(event)=>{
        setcrediantals({...crediantals,[event.target.name]:event.target.value})
     }


  return (
    <div className='container'>
      <h1>Create an account to user iNotebook</h1>
    <form onSubmit={handleonsubmit}>
    <div className="mb-3">
    <label htmlFor="text" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='naam' onChange={onchange} minLength={5} value={crediantals.name} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onchange} required value={crediantals.email}/>
    </div>
    <div className='mb-3'>
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onchange} value={crediantals.password} required/></div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} value={crediantals.cpassword} required/>
  </div>
  <button disabled={crediantals.password!==crediantals.cpassword} type="submit" className="btn btn-primary">Signup</button>
</form>
    </div>
  )
}

export default Signup
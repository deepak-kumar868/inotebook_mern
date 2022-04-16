import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
  const {showalert}=props
    const [crediantals, setcrediantals] = useState({email:"",password:""})
    let history=useHistory();
    const handleonclick=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({email:crediantals.email,password:crediantals.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
              //Save the auth token and redirect
              localStorage.setItem('token',json.authtoken)
              showalert('success','Login successfully')
              history.push('/')
          }else{
              showalert('danger','Please enter valid crediantals')
          }
    }

    const onchange=(event)=>{
        setcrediantals({...crediantals,[event.target.name]:event.target.value})
     }

  return (
    <div className='container'>
      <h1>Login to continue to iNotebook</h1>
    <form onSubmit={handleonclick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={onchange} value={crediantals.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onchange} value={crediantals.password}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
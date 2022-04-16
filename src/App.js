
import './App.css';
import React,{useState} from 'react';
import Home from './component/Home';
import Navbar from './component/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Notestate from './context/notes/Notestate';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  const [alert, setalert] = useState(null)
  const showalert=(type,message)=>{
    setalert({
      msg:message,
      typ:type
    })

    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <Notestate>
     <Router>
    <div>
      <Navbar/>
      <Alert alert={alert}/>
      <Switch>
          <Route exact path="/">
            <Home showalert={showalert} />
          </Route>
          <Route exact path="/login">
            <Login showalert={showalert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showalert={showalert}/>
          </Route>
        </Switch>
      </div>
    </Router>
    </Notestate>
  );
}

export default App;

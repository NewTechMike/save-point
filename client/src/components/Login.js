import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/user'

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);

  function handleSubmit(e){
    e.preventDefault();
    fetch('/login', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if(r.ok) { 
        r.json().then((user) => setUser(user));
        setLoggedIn(true)
        setTimeout (() => {
          checkRender()
          history.push('/home');
        }, 500);
      } else {
        r.json().then((errorData) => setErrors(errorData.error))
      }
    });
  }
  function checkRender(){
    fetch('/me')
    .then((r)=>r.json())
    .then(setUser)
  }

if(!loggedIn){
  return(
    <div>
      <h1>Login Page</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="username">Username</label>
        <br/>
        <input 
          type="text"
          id="username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          /> <br/>
          
        <label htmlFor="password">Password</label>
        <br/>
        <input 
          type="password"
          id="password"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          /> <br/>

      {errors.length > 0 && (
        <ul style={{color: "red"}}>
          
            <li key={errors}>{errors}</li>
            
        </ul>
      )}
  
          <button type="submit">Login</button>
      </form>
    </div>
  )} else {
    return(
      <div style={{color: "orange"}}>
        <h2>You are already Logged In</h2>
      </div>
    )
  }
}

export default Login;
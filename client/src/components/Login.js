import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function Login({setUser}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

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
        setTimeout (() => {
          history.push('/home');
        }, 500);
      } else {
        r.json().then((errorData) => setErrors(errorData.error))
      }
    });
  }


  return(
    <div>
      Login Page
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
            {errors.map((error)=>(
              <li key={error}>{error}</li>
              ))}
          </ul>
        )}
          <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
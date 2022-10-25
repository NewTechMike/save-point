import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/user'

function SignUp (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([])
  const history = useHistory();

  const { user, setUser, loggedIn } = useContext(UserContext);

  function handleSubmit(e){
    e.preventDefault()

    fetch('/signup', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }), 
    })
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user))
        setTimeout (()=>{
          history.push('/profile');
        }, 250);
      } else {
        r.json().then((errorData)=> setErrors(errorData.errors))
      }
    })
  }
  console.log("errors: ", errors)
  
  if(!loggedIn){
  return(
    <div>
      <h1>Welcome to SignUp Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={{color: "gold"}}>Username: </label>
          <br/>
          <input 
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          /> <br/>

          <label htmlFor="password" style={{color: "gold"}}>Password: </label>
          <br/>
          <input 
             type="password"
             id="password"
             autoComplete="off"
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
           /><br/>

          <label htmlFor="password" style={{color: "gold"}}>Password Confirmation: </label>
          <br/>
          <input 
             type="password"
             id="passwordConfirmation"
             autoComplete="off"
             value={passwordConfirmation}
             onChange={(e)=> setPasswordConfirmation(e.target.value)}
           /><br/>
        {errors.length > 0 && (
        <ul style={{color: "red"}}>
          {errors.map((error)=>(
            <li key={error}>{error}</li>
            ))}
        </ul>
      )}
        <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )} else {  
  return (
    <div style={{color: "orange"}}>
      <h2>You have already Signed up and are currently Logged In, {user.username}</h2>
    </div>
  )}
}

export default SignUp;
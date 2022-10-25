import React, { useState, useContext } from 'react'
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';

function Profile(){
  const {user, loggedIn, setLoggedIn} = useContext(UserContext);
  const [newLoc, setNewLoc] = useState("")
  const [newBio, setNewBio] = useState("")
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault()
    
    if(user.location === null && user.bio === null){  
      fetch('/me', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({location: newLoc, bio: newBio})
      })
      .then((r)=>r.json())
      .then((data)=> console.log("P data: ", data)) 
      console.log("Profile info Submitted")
      goHome()
    } else {
      console.log("It didn't work")    
    }
  }
  function goHome(){
    if(loggedIn){
      console.log(loggedIn)
      setTimeout (()=>{
        history.push('/home');
      }, 1000);
    } else {
    setLoggedIn(true)
    setTimeout (()=>{
      history.push('/home');
    }, 1000);

  }
  }
  if(loggedIn){
  if(user.location === null && user.bio === null){
    return (
      <div>
         <h2> Welcome new user, Here you can add your location and bio about yourself</h2>
      <div style={{color: "gold"}}>
        From:
        <br></br>
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          onChange={(e)=>setNewLoc(e.target.value)}
          /> <br></br>
          About Me:
          <br></br>
          <textarea
            type="text"
            onChange={(e)=>setNewBio(e.target.value)}
          >
          </textarea>
          <br></br>
          <button
            value="submit"
          >Submit</button>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{color: "orange"}}> 
        <h2>You can change your profile info on the Home page</h2>
      </div>
    )
  }
} else {
  history.push('/welcome');
}
}

export default Profile;
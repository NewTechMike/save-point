import React, { useState, useContext } from 'react'
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';

function Profile(){
  const {user, setUser, loggedIn, setLoggedIn} = useContext(UserContext);
  const [newLoc, setNewLoc] = useState("")
  const [newBio, setNewBio] = useState("")
  const history = useHistory();
  const [count, setCount] = useState(0)

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
      setTimeout (()=>{
        setCount(count+1)
        history.push('/home');
      }, 500);
    } else {
      console.log("It didn't work")    
    }
  }
  
  if(user.location === null && user.bio === null){
    return (
      <div>
          Welcome new user, Here you can add your location and bio about yourself
      <div>
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
      <div> 
        You can change your profile info on the Home page
      </div>
    )
  }
}

export default Profile;
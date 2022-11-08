import React, { useState, useContext } from 'react'
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';

function Profile(){
  const {user, setUser, loggedIn, setLoggedIn} = useContext(UserContext);
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
      .then((data)=> setUser(data)) 
      console.log("Profile info Submitted")
      setTimeout(()=>{
      goHome()
    }, 500)
    } else {
      console.log("It didn't work")    
    }
  }
  function goHome(){
    if(loggedIn){
      console.log(loggedIn)
      console.log("P user: ", user)
      setTimeout (()=>{
        history.push('/home');
      }, 1000);
    } else {
    setLoggedIn(true)
    console.log("P user 2: ", user)
    setTimeout (()=>{
      history.push('/home');
    }, 1000);

    }
  }

  const [newLocation, setNewLocation] = useState("")
  const [info, setInfo] = useState(false)
  const [editLoc, setEditLoc] = useState(false)
  const [editBio, setEditBio] = useState(false)
  const [homeCount, setHomeCount] = useState(0)
  
  console.log("home user: ", user)

  function handleUpdateSubmit(e){
    e.preventDefault()
    
      if(editLoc === true || editBio === true){  
      setHomeCount(homeCount+1)
      fetch('/me', {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({location: newLocation, bio: newBio})
      })
      .then((r)=>r.json())
      .then((data)=> console.log("H data: ", data)) 
      setInfo(true)
      checkRender()
    } else {
      console.log("It didn't work")
      setInfo(false)
    }
  }

  function checkRender(){
    fetch('/me')
    .then((r)=>r.json())
    .then(setUser)
  }

  const [editLocButton, setEditLocButton] = useState("Edit")
  const [editBioButton, setEditBioButton] = useState("Edit")
  
  function handleEditLocClick(){
    setEditLoc(!editLoc)
    {editLoc ? setEditLocButton("Edit"): setEditLocButton("Save")}
  }
  
  function handleEditBioClick(){
    setEditBio(!editBio)
    {editBio ? setEditBioButton("Edit"): setEditBioButton("Save")}
  }

  function handleDelete(user){
   fetch(`/me/${user.id}`,{
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })
    console.log("Delete clicked", user.id)
    setTimeout(()=>{
      checkRender()
    }, 250)
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
        <p> From: </p>    
      {editLoc ? <textarea 
        
        defaultValue={`${user.location}`}
        onChange={(e) => setNewLocation(e.target.value)}
        /> :
        <div>
        <p>{user.location}</p>
        </div>
        }
      <form onClick={handleUpdateSubmit}>
      <button 
        type="button" 
        value={`${editLocButton}`}
        onClick={handleEditLocClick}>{editLocButton}
      </button>
      
      </form>
       <br></br>
        <p>About: </p>
        
        {editBio ? <textarea 
          defaultValue={`${user.bio}`}
          onChange={(e)=>setNewBio(e.target.value)}
          ></textarea>:
        <div>
         <p>{user.bio}</p> 
        </div>
        }
        <form onClick={handleUpdateSubmit}>
      <button 
        type="button" 
        value={`${editBioButton}`}
        onClick={handleEditBioClick}>{editBioButton}
      </button>
      </form>
      <div>
        <button 
          
          onClick={()=>handleDelete(user)}
          >Delete</button>
      </div>
      </div>
    )
  }
} else {
  history.push('/welcome');
}
}

export default Profile;
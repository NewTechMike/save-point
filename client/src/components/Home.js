import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';
import List from './List';

function Home(){
  const {user, setUser, loggedIn } = useContext(UserContext);
  const history = useHistory();
  const [newLocation, setNewLocation] = useState("")
  const [newBio, setNewBio] = useState("")
  const [info, setInfo] = useState(false)
  const [editLoc, setEditLoc] = useState(false)
  const [editBio, setEditBio] = useState(false)
  const [homeCount, setHomeCount] = useState(0)
  
  
  function handleUpdateSubmit(e){
    e.preventDefault()
    //setHomeCount(homeCount+1)
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
      console.log("info: ", info)
      console.log("Location Submit")
      //setHomeCount(homeCount+2)
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
    console.log("User ID L: ", user.location)
  }
  
  function handleEditBioClick(){
    setEditBio(!editBio)
    {editBio ? setEditBioButton("Edit"): setEditBioButton("Save")}
    console.log("User ID B: ", user.bio)
  }

  function handleDelete(user){
   fetch(`/me/${user.id}`,{
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })
    console.log("Delete clicked", user.id)
  }

  if(loggedIn){
  return(
    <div>
      Welcome to your Home Page, { user.username }
      <br></br>
      
      From: 
      <br></br>
      {editLoc ? <input 
        type="text"
        defaultValue={`${user.location}`}
        onChange={(e) => setNewLocation(e.target.value)}
        /> :
      <div>
        {user.location}
        </div>
        }
      <form onClick={handleUpdateSubmit}>
      <input 
        type="button" 
        value={`${editLocButton}`}
        onClick={handleEditLocClick}>
      </input>
      
      </form>
      
        About: 
        <br></br>
        {editBio ? <textarea 
          defaultValue={`${user.bio}`}
          onChange={(e)=>setNewBio(e.target.value)}
          ></textarea>:
        <div>
          {user.bio}
        </div>
        }
        <form onClick={handleUpdateSubmit}>
      <input 
        type="button" 
        value={`${editBioButton}`}
        onClick={handleEditBioClick}>
      </input>
      </form>
      <div>
        <button 
          
          onClick={()=>handleDelete(user)}
          >Delete</button>
        </div>

      <List  />
    </div>
  )} else {
    history.push('/welcome')
  }
  
}

export default Home;
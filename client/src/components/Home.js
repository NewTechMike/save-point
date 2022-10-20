import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';

function Home(){
  const {user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [newLocation, setNewLocation] = useState("")
  const [newBio, setNewBio] = useState("")
  const [info, setInfo] = useState(false)
  const [editLoc, setEditLoc] = useState(false)
  const [editBio, setEditBio] = useState(false)
  
  
  function handleLocationSubmit(e){
    e.preventDefault()
    if(user.location !== newLocation){  
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
      console.log("info: ", info)
      console.log("Location Submit")
    } else {
      console.log("It didn't work")
      setInfo(false)
    }
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
      <form onSubmit={handleLocationSubmit}>
      <input 
        type="button" 
        value={`${editLocButton}`}
        onClick={handleEditLocClick}>
      </input>
      <button type="submit" >Submit</button>
      </form>
      <br></br>


        About: 
        <br></br>
        {editBio ? <textarea 
          placeholder={`${user.bio}`}
          onChange={(e)=>setNewBio(e.target.value)}
          ></textarea>:
        <div>
          {user.bio}
        </div>
        }
        <form onSubmit={handleLocationSubmit}>
      <input 
        type="button" 
        value={`${editBioButton}`}
        onClick={handleEditBioClick}>
      </input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )} else (
    history.push('/welcome')
  )
}

export default Home;
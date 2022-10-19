import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';

function Home(){
  const {user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [newLocation, setNewLocation] = useState("")
  const [newBio, setNewBio] = useState("")
  const [info, setInfo] = useState(false)
  const [edit, setEdit] = useState(false)

  function handleLocationSubmit(e){
    e.preventDefault()
    
    if(user.location !== newLocation){

    console.log("User L: ", user.location)
    console.log("State L: ", newLocation)   
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
  console.log("info2: ", info)
  console.log("H location: ", newLocation)

  const [editButton, setEditButton] = useState("Edit")
  function handleEditClick(){
    setEdit(!edit)
    {edit ? setEditButton("Edit"): setEditButton("Save")}
    console.log("User ID L: ", user.location)
  }

  if(loggedIn){
  return(
    <div>
      Welcome to your Home Page, { user.username }
      <br></br>
      From: 
      <br></br>
      {edit ? <input 
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
        value={`${editButton}`}
        onClick={handleEditClick}>
      </input>
      </form>
      <br></br>


        <div>
        About: {user.bio}
      </div>
      <form onSubmit={handleLocationSubmit}>
      <br></br>
        <textarea 
          placeholder={"This is the bio"}
          onChange={(e)=>setNewBio(e.target.value)}
          ></textarea>
          <br></br>
          <input 
          type="submit" 
          value="Submit" 
        />
          </form>
    </div>
  )} else (
    history.push('/welcome')
  )
}

export default Home;
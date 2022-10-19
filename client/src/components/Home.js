import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';

function Home(){
  const {user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [location, setLocation] = useState(" ")
  const [bio, setBio] = useState(" ")

   useEffect(()=>{
    fetch("/me")
    .then((r)=>r.json())
    .then((data)=> console.log("Data: ", data))
  },[])   

  function handleLocationSubmit(e){
    e.preventDefault()
    console.log("Sumbitted: ", e)
     /* const obj = {
      location: location, 
      bio: bio
    } */
    fetch('/me', {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({location: location, bio: bio})
    })
    .then((r)=>r.json())
    .then((data)=> console.log("data: ", data)) 
    console.log("Location Submit")
  }

  console.log("location: ", location)
  if(loggedIn){
  return(
    <div>
      Welcome to your Home Page, { user.username }
      <br></br>
      <div>
        From: {location}
        </div>
        <div>
        About: {bio}
      </div>
      <form onSubmit={handleLocationSubmit}>
      <input 
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        /> <br></br>
        <textarea 
          defaultValue={"This is the bio"}
          onChange={(e)=>setBio(e.target.value)}
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
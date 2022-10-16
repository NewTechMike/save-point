import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';

function Home(){
  const {user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [location, setLocation] = useState(" ")

  function handleLocationSubmit(){
    console.log("Location Submit")
  }

  console.log("location: ", location)
  if(loggedIn){
  return(
    <div>
      Welcome to your Home Page, { user.username }
      <br></br>
      <form onSubmit={handleLocationSubmit}>
      <input 
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        />
        </form>
        {location}

        <textarea defaultValue={"This is the bio"}></textarea>
    </div>
  )} else (
    history.push('/welcome')
  )
}

export default Home;
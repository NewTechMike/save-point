import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'

function Home(){
  const {user, setUser} = useContext(UserContext);
  console.log("H User: ", user)

  useEffect(()=>{
    fetch('/me')
    .then((r)=>r.json())
    .then((user) => setUser(user))
  }, [])
  console.log(user.username)
  
  return(
    <div>
      Home Page, { user.username }
    </div>
  )
}

export default Home;
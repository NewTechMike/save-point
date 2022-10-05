import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'

function Home(){
  const {user, setUser} = useContext(UserContext);
  console.log("H User: ", user)

  return(
    <div>
      Home Page, { user.username }
    </div>
  )
}

export default Home;
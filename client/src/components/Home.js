import React, { useState, useEffect } from 'react'

function Home(){
  const [user, setUser] = useState("")

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
import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/user'

function Users({loggedIn}){

  const [users, setUsers] = useState([])
  const {user, setUser} = useContext(UserContext);

  console.log("U: ", loggedIn)

  const currentUser = (() =>{
    if(loggedIn === true)
    return <text>You are logged in</text>
  })

  useEffect(()=>{
    fetch('/users')
    .then((r)=>r.json())
    .then((userList)=>setUsers(userList))
  }, [])

  const ListOfUsers = users.map((userData) =>
     <li key={userData.id}>{userData.username}</li>
  )

  return(
    <div>Hey {user.username}, This is the Users page
      <h1>{currentUser}</h1>
    
      <ul>{ListOfUsers}</ul>
    
    </div>
  )
}

export default Users;
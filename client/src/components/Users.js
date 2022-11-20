import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/user'

function Users(){
  const [users, setUsers] = useState([])
  const {user, loggedIn} = useContext(UserContext);

  useEffect(()=>{
    fetch('/users')
    .then((r)=>r.json())
    .then((userList)=>console.log("UL: ", userList))
  }, [])

  const ListOfUsers = users.map((userData) =>
     <li key={userData.id}>{userData.username}</li>
  )

  if(loggedIn){
  return(
    <div>Hey {user.username}, This is the Users page
      <ul>{ListOfUsers}</ul>
    </div>
  )} else {
    return(
    <div>This is the Users page
      <ul>{ListOfUsers}</ul>
    </div>
  )}
}

export default Users;
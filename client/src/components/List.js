import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'

function List({onCount}){
  const {user, loggedIn} = useContext(UserContext);
  const [lists, setLists] = useState([])

  useEffect(()=>{

    fetch('/lists')
    .then((r)=>r.json())
    .then((listData)=>console.log("LD: ", listData))

  },[])

  function handleListClick(id){
    console.log("Button has been Clicked", id)
    fetch(`/lists/${id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify()
    })
    .then((r)=>r.json())
    .then((data)=>console.log("list data: ",data))
  }

  return(
    <div>
      This will be the list component

      Counter: {onCount}

      <button onClick={handleListClick(user.id)}>Generate Lists</button>
    </div>
  )
}

export default List;
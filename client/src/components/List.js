import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'

function List(){
  const {user, loggedIn} = useContext(UserContext);
  const [lists, setLists] = useState([])
  const [count, setCount] = useState(0)

  const [gen, setGen] = useState(false)

  useEffect(()=>{
    fetch('/lists')
    .then((r)=>r.json())
    .then(setLists)
  },[])

    console.log("The Lists: ", lists)

    const showLists = lists.map((listObj) => 
      <li key={listObj.id}>{listObj.list_name}</li>)
    
  function handleListClick(){
    console.log("Button has been Clicked", user.id) 
    fetch(`/lists/${user.id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify()
    })
    .then((r)=>r.json())
    .then((data)=>console.log("list data: ",data)) 
    setGen(true) 
  } 

  if(lists.length > 0 && count == 0){
    setGen(true)
    setCount(1)
  }//Too many rerenders, Most likely because
  //of gen set to "true"
  console.log("Gen: ", gen)
  return(
    <div>
      <br></br>
      This will be the list component
      {gen ? null:
      <button onClick={handleListClick}>Generate Lists</button>} 
      {showLists}
    </div>
  )
}

export default List;
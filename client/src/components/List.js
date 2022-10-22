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
    .then((listData)=>setLists(listData))
  },[])

  if(lists.length >0){
    const listID = lists[0].id
    fetch(`/lists/${listID}`)
    .then((r)=>r.json())
    .then((LGdata)=>console.log("list games: ", LGdata))
  }

  //console.log("Lists: ", lists[0].id)

    const showLists = lists.map((listObj) => 
      <span key={listObj.id}>{listObj.list_name }{"  "}&nbsp;</span>)
    
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
  }
  console.log("Gen: ", gen)

  setTimeout(()=>{
   console.log("The Lists: ", lists[0].id)
   
  },[])
 


  return(
    <div>
      <br></br>
      This will be the list component
      <br></br>
      <br></br>
      {gen ? null:
      <button onClick={handleListClick}>Generate Lists</button>} 
      {showLists} 
    </div>
  )

}

export default List;
import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'

function List(){
  const {user, loggedIn} = useContext(UserContext);
  const [lists, setLists] = useState([])

  const [games, setGames] = useState([])
  const [gameCount, setGameCount] = useState(0)
  
  const [count, setCount] = useState(0)
  const [gen, setGen] = useState(false)
  
  useEffect(()=>{
    fetch('/lists')
    .then((r)=>r.json())
    .then((listData)=>setLists(listData))
  },[])
  
    const showLists = lists.map((listObj) => 
      <span key={listObj.id} >{listObj.list_name }{"  "}&nbsp;</span>)

  if(lists.length > 0 && gameCount === 0){
    fetch(`${user.id}/lists/${lists[0].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames(data))
    setGameCount(1)
  }

  console.log("Game Count: ", gameCount)
  console.log("Games: ", games)

  const showGames = games.map((gameObj) => 
    <ul key={"a"+gameObj.id} style={{textAlign: 'left'}}>{gameObj.title}{" "}</ul>
  ) 
  
  console.log("SG: ", showGames)
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

  if(lists.length > 0 && count === 0){
    setGen(true)
    setCount(1)
  }
  console.log("Gen: ", gen)
 
  return(
    <div>
      <br></br>
      This will be the list component
      <br></br>
      <br></br>
      {gen ? null:
      <button onClick={handleListClick}>Generate Lists</button>} 
      {showLists} 
      {showGames}
    </div>
  )

}

export default List;
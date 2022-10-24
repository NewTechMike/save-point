import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import ListedGames from './ListedGames';

function List(){
  const {user, setUser, loggedIn} = useContext(UserContext);
  const [lists, setLists] = useState([])
  const [games, setGames] = useState([])  
  const [gameCount, setGameCount] = useState(0)
  const [count, setCount] = useState(0)
  const [check, setCheck] = useState()
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

 function handleRemoveWantGame(id){
  fetch(`${user.id}/lists/${"Want to Play"}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((r)=>r.json())
  .then((data)=>setCheck(data))
  checkRender()
  setCount(count+1)
  console.log(count)
}

function checkRender(){
  fetch('/me')
    .then((r)=>r.json())
    .then(setUser)
}
  const showGames = games.map((gameObj) => 
    <li key={"a"+gameObj.id} style={{textAlign: 'left'}}>{gameObj.title}{" "}
    <button onClick={()=>handleRemoveWantGame(gameObj.id)}>X</button></li>
  ) 
  
  function handleListClick(){
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
 
  if(lists.length >0){
  return(
    <div>
      <br></br>
      <br></br>
      <br></br>
      {gen ? null:
      <button onClick={handleListClick}>Generate Lists</button>} 
      <div style={{color: "Green"}}>
        {showLists} 
      <ul>
        {showGames}      
      </ul>
      <ListedGames lists={lists} />
      </div>
    </div>
  )
  } else {
    return (
      <div> Loading </div>
    )
  }
}

export default List;
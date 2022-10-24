import React, { useState, useEffect, useContext} from 'react'
import { UserContext} from "../context/user"

function ListedGames({lists}){
  const [games1, setGames1]= useState([])
  const [games2, setGames2]= useState([])
  const { user } = useContext(UserContext);
 
  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[1].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames1(data))
  },[])

  function handleRemoveStartGame(id){
    console.log("Remove Clicked", id)
    fetch(`${user.id}/lists/${"Started Playing"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  function handleRemoveReplayGame(id){
    console.log("Remove Clicked", id)
    fetch(`${user.id}/lists/${"To Replay"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  
  const showGames1 = games1.map((gameObj)=>
    <li key={gameObj.id} style={{textAlign: 'center'}}>{gameObj.title}
    <button onClick={()=>handleRemoveStartGame(gameObj.id)}>X</button></li>
  )

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[2].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames2(data))
  },[])

  const showGames2 = games2.map((gameObj)=>
    <li key={gameObj.id} style={{textAlign: 'right'}}>{gameObj.title} 
    <button onClick={()=>handleRemoveReplayGame(gameObj.id)}>X</button></li>
  )
  
  return(
    <div>   
    <br></br>
      <text style={{textAlign: 'center'}}>This is center{"  "}</text>
      <text style={{textAlign: 'right'}}>{" "}This is right   </text>
      <ul>{showGames1}</ul> <ul>{showGames2}</ul>
    </div>
  )
}

export default ListedGames;
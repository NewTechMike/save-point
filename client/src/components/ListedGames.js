import React, { useState, useEffect, useContext} from 'react'
import { UserContext} from "../context/user"

function ListedGames({lists}){
  const [games1, setGames1]= useState([])
  const [games2, setGames2]= useState([])
  const { user } = useContext(UserContext);

  const [clicked, setClicked] = useState(false)
  
 
  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[1].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames1(data))
  },[])

  function handleRemoveStartGame(id){
    fetch(`${user.id}/lists/${"Started Playing"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTimeout(()=>{
      checkRender1()
    }, 250)
  }
  function checkRender1(){
    fetch(`${user.id}/lists/${lists[1].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames1(data))
  }
  function handleRemoveReplayGame(id){
    fetch(`${user.id}/lists/${"To Replay"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTimeout(()=>{
      checkRender2()
    }, 250)
  }
  function checkRender2(){
    fetch(`${user.id}/lists/${lists[2].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames2(data))
  }
  
  const showGames1 = games1.map((gameObj)=>
    <li key={gameObj.id} style={{textAlign: "center"}}>{gameObj.title}
    <button onClick={()=>handleRemoveStartGame(gameObj.id)}>X</button></li>
  )

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[2].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames2(data))
  },[])

  const showGames2 = games2.map((gameObj)=>
  <div >
    <li key={gameObj.id} style={{textAlign: "right"}}>{gameObj.title} 
    <button onClick={()=>handleRemoveReplayGame(gameObj.id)}>X</button></li>
  
  </div>
  )
  
  return(
    <div>   
    <br></br>
      {showGames1}
      {showGames2}

    </div>
  )
}

export default ListedGames;
import React, { useState, useEffect, useContext} from 'react'
import { UserContext} from "../context/user"

function ListedGames({lists}){
  const [games1, setGames1]= useState([])
  const [games2, setGames2]= useState([])
  const { user } = useContext(UserContext);
  console.log("LG user: ", user)

  console.log("LG: ", lists[1].id)

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[1].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames1(data))
  },[])

  const showGames1 = games1.map((gameObj)=>{
    <ul key={gameObj.id} style={{textAlign: 'center'}}>{gameObj.title}</ul>
  })

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[2].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames2(data))
  },[])

  const showGames2 = games2.map((gameObj)=>{
    <ul key={gameObj.id} style={{textAlign: 'right'}}>{gameObj.title}</ul>
  })

  return(
    <div>
      
    <br></br>
      <text style={{textAlign: 'center'}}>This is center{"  "}</text>
      <text style={{textAlign: 'right'}}>{" "}This is right   </text>
      {showGames1}
      {showGames2}
    </div>
  )
}

export default ListedGames;
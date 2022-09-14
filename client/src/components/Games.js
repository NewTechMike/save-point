import React, { useEffect, useState } from "react";

function Games(){

  const [gameList, setGameList ] = useState([]) 
  useEffect(()=>{
    fetch('/games')
    .then((r)=>r.json())
    .then((gameData)=>setGameList(gameData))
    },[])

    const theGames =  gameList.map((gameItem) =>
      
    <li key={gameItem.id}>
      <ul>{gameItem.title} </ul>
      <ul> Platform: {gameItem.platform}</ul>
      <ul> Release Date: {gameItem.release_date}</ul>
      <ul> Genre: {gameItem.genre}</ul>
      <img src={gameItem.cover_art} />
    </li>
  )
   
  return (
    <div>
      <h1>Games Page</h1>
      <ul>{theGames}</ul>
      
    </div>
  )
}

export default Games;
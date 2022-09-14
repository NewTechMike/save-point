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
        <img src={gameItem.cover_art} />
        <ul>{gameItem.title} </ul>
        <ul> Platform: {gameItem.platform}</ul>
        <ul> Release Date: {gameItem.release_date}</ul>
        <ul> Genre: {gameItem.genre}</ul>
      </li>
    )
  
    function handleSomething(){
    const gameObj = {
      title: title, 
      platform: platform, 
      genre: genre
    }  
    fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791', {

      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(gameObj)
    })
    .then((r)=> console.log(r))

}
  return (
    <div>
      <h1>Games Page</h1>
      <ul>{theGames}</ul>
      
    </div>
  )
}

export default Games;
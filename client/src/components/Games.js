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
  
    const [title, setTitle] = useState()
    function handleSomething(){
      console.log("something")
    }
    const gameObj = {
      title: title
    }  

    const [rawgGames, setRawgGames]= useState({
      title: "", 
      platform: "",
      release_date: "",
      genre: "",
      cover_art: ""
    })
    useEffect(()=>{ 
    fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791')
    .then((r)=> r.json())
    .then((gameData)=>setRawgGames(
      gameData.results
      //platform: gameData.results[8].parent_platform[1],
      //release_date: gameData.results[8].release_date,
      //genre: gameData.Results[8].genres[0],
     // cover_art: gameData.results[8].background_image
    ))
    },[])

    console.log("RG: ", rawgGames)

    //<img src= {rawgData.short_screenshots[0].image} />
      const theRawgGames = rawgGames.map((rawgData) => 
        <li key={rawgData.id}>

          <ul>{rawgData.name}</ul>   
          <ul>{rawgData.genres[0].name}</ul>
          <ul>{rawgData.released}</ul>
          <ul>{rawgData.parent_platforms[0].platform.name}</ul>
        </li> 
      )

    console.log(rawgGames)
  return (
    <div>
      <h1>Games Page</h1>
      <ul>{theGames}</ul>
      <ul>{theRawgGames}</ul>
      <button onClick={handleSomething}>Something</button>
    </div>
  )
}

export default Games;
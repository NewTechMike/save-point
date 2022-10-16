import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/user'

function Games(){
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const [gameList, setGameList ] = useState([]) 
  console.log("G User: ", user)

  const [rawgGames, setRawgGames]= useState([{
    title: "", 
    platform: [""],
    release_date: "",
    genres: [""],
    cover_art: ""
  }])

  useEffect(()=>{ 
    fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791')
      .then((r)=> r.json())
      .then((gameData) => setRawgGames(gameData.results))
  },[])

    useEffect(()=>{
      fetch('/games')
      .then((r)=>r.json())
      .then((gameData)=>setGameList(gameData))
    },[])

    const theGames =  gameList.map((gameItem) =>
      <ul key={gameItem.id}>
        <img src={gameItem.cover_art} style={{width: "75%", height: "75%"}}/>
        <li>{gameItem.title} </li>
        <li> Platform: {gameItem.platform}</li>
        <li> Release Date: {gameItem.release_date}</li>
        <li> Genre: {gameItem.genre}</li>
        <button onClick={handleSomething}>Want to Play</button>
        <button onClick={handleSomething}>Started Playing</button>
        <button onClick={handleSomething}>To Replay</button>
      </ul>
    )
  
    function handleSomething(e){
      console.log("something", e)
    }
  
    console.log("RG: ", rawgGames)
    const [theRawgGames, setTheRawgGames] = useState([]);
    useEffect(()=>{
    
      setTimeout (() => {
   
       setTheRawgGames(rawgGames.map((rawgData) => 
        <ul key={rawgData.id}>
          <img src={rawgData.background_image} style={{width: "75%", height: "75%"}}/>
          <li>{rawgData.name}</li>   
          <li>Platform: {rawgData.parent_platforms[0].platform.name}</li>
          <li>/ {rawgData.parent_platforms[1].platform.name}</li>
          <li>Release Date: {rawgData.released}</li>
          <li>Genre: {rawgData.genres[0].name}</li>
          <button onClick={handleSomething(rawgData.name)}>Want to Play</button>
          <button onClick={handleSomething}>Started Playing</button>
          <button onClick={handleSomething}>To Replay</button>
        </ul>)) 
   
      },25) 
    
    }, [rawgGames])

  console.log("RG L: ", rawgGames.length)
       
  console.log("TRG: ", theRawgGames)
  return (
    <div>
      <h1>Welcome to the Games Page, {user.username}</h1>
      <ul>{theGames}</ul>
      <ul>{theRawgGames}</ul>
    </div>
  )
}

export default Games;
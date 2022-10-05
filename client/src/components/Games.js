import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/user'

function Games(){
  const { user, setUser } = useContext(UserContext);
  const [gameList, setGameList ] = useState([]) 
  console.log("G User: ", user)

    useEffect(()=>{
      fetch('/games')
      .then((r)=>r.json())
      .then((gameData)=>setGameList(gameData))
    },[])

    const theGames =  gameList.map((gameItem) =>
      <ul key={gameItem.id}>
        <img src={gameItem.cover_art} />
        <li>{gameItem.title} </li>
        <li> Platform: {gameItem.platform}</li>
        <li> Release Date: {gameItem.release_date}</li>
        <li> Genre: {gameItem.genre}</li>
        <button onClick={handleSomething}>Something1</button>
        <button onClick={handleSomething}>Something2</button>
        <button onClick={handleSomething}>Something3</button>
      </ul>
    )
  
    function handleSomething(e){
      console.log("something", e)
    }

    const [rawgGames, setRawgGames]= useState([{
      title: "", 
      platform: [{}],
      release_date: "",
      genres: [{}],
      cover_art: ""
    }])

    useEffect(()=>{ 
      fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791')
        .then((r)=> r.json())
        .then((gameData) => setRawgGames(gameData.results))
    },[])
        
    console.log("RG: ", rawgGames)
    //console.log("RG Platform: ", rawgGames[0].parent_platforms[0].platform.name)
    const theRawgGames = rawgGames.map((rawgData, index) => 
        <ul key={rawgData.id}>
          <img src={rawgData.background_image} style={{width: "75%", height: "75%"}}/>
          <li>{rawgData.name}</li>   
          <li>Platform: {rawgData.parent_platforms[0].platform.name}</li>
          <li>/ {rawgData.parent_platforms[1].platform.name}</li>
          <li>Release Date: {rawgData.released}</li>
          <li>Genre: {rawgData.genres[0].name}</li>
          <button onClick={handleSomething(rawgData.name)}>Something1</button>
          <button onClick={handleSomething}>Something2</button>
          <button onClick={handleSomething}>Something3</button>
    
        </ul>
      );

  return (
    <div>
      <h1>Welcome to the Games Page, {user.username}</h1>
      <ul>{theGames}</ul>
      <ul>{theRawgGames}</ul>
    </div>
  )
}

export default Games;
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

    const [rawgGames, setRawgGames]= useState([{
      title: "", 
      platform: "",
      release_date: "",
      genres: [],
      cover_art: ""
    }])

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
        const theRawgGames = rawgGames.map((rawgData) => 
        <ul key={rawgData.id}>
          <li>{rawgData.name}</li>   
          <li>{rawgData.genres.name}</li>
         
        </ul>
      ) 
        
    //<img src= {rawgData.short_screenshots[0].image} />
      
      /*  <ul>{rawgData.genres[0].name}</ul>
          <ul>{rawgData.released}</ul>
          <ul>{rawgData.parent_platforms[0].platform.name}</ul>
      */
    console.log(rawgGames)

    /**!!! 
     * Currently Running into an issue where the api fetch
     * seems to be taking longer than the const + Map assigment
     * data is unable to render unless the page is refreshed ...
     * sometimes
     */
  return (
    <div>
      <h1>Welcome to the Games Page, {user.username}</h1>
      <ul>{theGames}</ul>
     <ul>{theRawgGames}</ul>
      <button onClick={handleSomething}>Something</button>
    </div>
  )
}

export default Games;
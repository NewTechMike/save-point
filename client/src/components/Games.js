import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/user'

function Games(){
  const { user, loggedIn } = useContext(UserContext);
  const [gameList, setGameList] = useState([]) 
  const [showWant, setShowWant] = useState(true)
  const [showStart, setShowStart] = useState(true)
  const [showReplay, setShowReplay] = useState(true)
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

    /* useEffect(()=>{
      fetch('/games')
      .then((r)=>r.json())
      .then((gameData)=>setGameList(gameData))
    },[]) */

    const theGames =  gameList.map((gameItem) =>
      <ul key={gameItem.id}>
        <img src={gameItem.cover_art} style={{}}/>
        <li>{gameItem.title} </li>
        <li> Platform: {gameItem.platform}</li>
        <li> Release Date: {gameItem.release_date}</li>
        <li> Genre: {gameItem.genre}</li>
        <button onClick={()=>handleWantClick(
          gameItem.title, 
          gameItem.platform, 
          gameItem.release_date, 
          gameItem.genre
        )}>Want to Play</button>
        <button onClick={()=>handleStartClick(
          gameItem.title, 
          gameItem.platform, 
          gameItem.release_date, 
          gameItem.genre
        )}>Started Playing</button>
        <button onClick={()=>handleReplayClick(
          gameItem.title, 
          gameItem.platform, 
          gameItem.release_date, 
          gameItem.genre
        )}>To Replay</button>
      </ul>
    )
  
    function handleWantClick(id, name, platform, genre, release_date, cover_art){
      
      fetch(`${user.id}/lists/${"Want to Play"}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          list_id: 1, 
          title: name,
          platform: platform,
          genre: genre,
          release_date: release_date,
          cover_art: cover_art
        })
      })
      .then((r)=>r.json())
      .then((data)=>console.log("Want list: ",data))
      hideWant(id);
      {showWant ? console.log("2",showWant) : console.log("false", id)}
    }

     function hideWant(id){
      setShowStart(true)
      setShowReplay(true)
      setShowWant(false);
      console.log("Why!!!!")
      {showWant ? console.log("1",showWant) : console.log("false", id)}
      checkRender();
    } 

    function checkRender(){
        fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791')
          .then((r)=> r.json())
          .then((gameData) => setRawgGames(gameData.results))
    }

    function handleStartClick(id, name, platform, genre, release_date){
      fetch(`${user.id}/lists/${"Started Playing"}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          list_id: 1, 
          title: name,
          platform: platform,
          genre: genre,
          release_date
        })
      })
      .then((r)=>r.json())
      .then((data)=>console.log("Start List: ", data)) 
      hideStart(id);
    }

    function hideStart(id){
      setShowWant(true);
      setShowReplay(true);
      setShowStart(false);
      console.log("Why!!!!")
      {showStart ? console.log("1",showStart) : console.log("false", id)}
      checkRender();
    } 

    function handleReplayClick(id, name, platform, genre, release_date){
      fetch(`${user.id}/lists/${"To Replay"}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          list_id: 1, 
          title: name,
          platform: platform,
          genre: genre,
          release_date
        })
      })
      .then((r)=>r.json())
      .then((data)=>console.log("Replay List: ", data))
      hideReplay(id);
    }

    function hideReplay(id){
      setShowWant(true);
      setShowStart(true);
      setShowReplay(false);
      console.log("Why!!!!")
      {showReplay ? console.log("1",showReplay) : console.log("false", id)}
      checkRender();
    } 

    const [theRawgGames, setTheRawgGames] = useState([]);
    useEffect(()=>{
      setTimeout (() => {
       setTheRawgGames(rawgGames.map((rawgData) => 
        <ul key={rawgData.id} >
          <img src={rawgData.background_image} style={{}}/>
          <li>{rawgData.name}</li>   
          <li>Platform: {rawgData.parent_platforms[0].platform.name}</li>
          <li>/ {rawgData.parent_platforms[1].platform.name}</li>
          <li>Release Date: {rawgData.released}</li>
          <li>Genre: {rawgData.genres[0].name}</li>

          {showWant ? 
          <button 
            key={rawgGames.id} 
            className={showWant ? "wantButton" : "wantButtonHidden"}
            onClick={() => handleWantClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
            rawgData.background_image
            )}>Want to Play</button>
          : " "}

          {showStart ?
          <button onClick={()=>handleStartClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
          )}>Started Playing</button>
          : " "}

          {showReplay ?
          <button onClick={()=>handleReplayClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
          )}>To Replay</button>
          : " "} 

        </ul>)) 
      },25) 
    }, [rawgGames])

  if(loggedIn){
  return (
    <div>
      <h1>Welcome to the Games Page, {user.username}</h1>
      <h4>When you're done adding games, click "Home" to see your list</h4>
      <ul>{theRawgGames}</ul>
      <ul>{theGames}</ul>
    </div>
  )} else {
    return(
      <div>
        <h2>Welcome to the Games Page. Please login or sign up</h2>
      </div>
    )
  }
}

export default Games;
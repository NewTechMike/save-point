import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/user'

function Games(){
  const { user, loggedIn } = useContext(UserContext);
  const [gameList, setGameList] = useState([]) 
  const [errors, setErrors] = useState([])
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

    const theGames =  gameList.map((gameItem) =>
      <ul key={gameItem.id}>
        <img src={gameItem.cover_art} alt={gameItem.cover_art}/>
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
      .then((r)=>{ 
        if(!r.ok){
        r.json().then((data)=>console.log("Want list: ",data))
        //alert("Added to Want List")
        }
       else {
        r.json().then((errorData) => setErrors(errorData.errors))
        //alert("Already Added to List") 
        }
      });
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
      .then((r)=>{ 
        if(!r.ok){
        r.json().then((data)=>console.log("Start list: ",data))
        //alert("Added to Started List")
        }
       else {
        r.json().then((errorData) => setErrors(errorData.errors))
        //alert("Already Added to List")
      }
      });
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
      .then((r)=>{ 
        if(!r.ok){
        r.json().then((data)=>console.log("Replay list: ",data))
          //alert("Added to Replay List")
      } else {
        r.json().then((errorData) => setErrors(errorData.errors))
       // alert("Already Added to List")  
      }
      });
    }

    const [theRawgGames, setTheRawgGames] = useState([]);
    useEffect(()=>{
      setTimeout (() => {
       setTheRawgGames(rawgGames.map((rawgData) => 
        <ul key={rawgData.id} >
          <img src={rawgData.background_image} alt={rawgData.background_image}/>
          <li>{rawgData.name}</li>   
          <li>Platform: {rawgData.parent_platforms[0].platform.name}</li>
          <li>/ {rawgData.parent_platforms[1].platform.name}</li>
          <li>Release Date: {rawgData.released}</li>
          <li>Genre: {rawgData.genres[0].name}</li>
 
          <button 
            onClick={() => handleWantClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
            rawgData.background_image
            )}>Want to Play</button>
        
          <button onClick={()=>handleStartClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
          )}>Started Playing</button>
          
          <button onClick={()=>handleReplayClick(
            rawgData.id,
            rawgData.name,
            rawgData.parent_platforms[0].platform.name,
            rawgData.genres[0].name,
            rawgData.released,
          )}>To Replay</button>

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
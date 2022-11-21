import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../context/user'
import GameCard from "./GameCard";

function Games(){
  const { user, loggedIn } = useContext(UserContext);
  const [gameList, setGameList] = useState([]) 
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
        <GameCard
          key={gameItem.id}
          img={gameItem.cover_art}
          title={gameItem.title}
          platform1={gameItem.platform}
          platform2={gameItem.platform}
          released={gameItem.release_date}
          genre={gameItem.genre}
       />
      </ul>
    )

    function checkRender(){
      fetch('https://api.rawg.io/api/games?key=c8ab624f5d4247418c0a9614841a0791')
      .then((r)=> r.json())
      .then((gameData) => setRawgGames(gameData.results))
    }

    const [theRawgGames, setTheRawgGames] = useState([]);
    useEffect(()=>{
      setTimeout (() => {
       setTheRawgGames(rawgGames.map((rawgData) => 
        <ul>
       <GameCard
          key={rawgData.id}
          img={rawgData.background_image}
          title={rawgData.name}
          platform1={rawgData.parent_platforms[0].platform.name}
          platform2={rawgData.parent_platforms[1].platform.name}
          released={rawgData.released}
          genre={rawgData.genres[0].name}
       />
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
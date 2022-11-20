import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user'

function Button({id, title, platform, genres, released, background, show}){
  const { user, loggedIn } = useContext(UserContext);
  const [showWant, setShowWant] = useState(true)
  function handleWantClick(id, name, platform, genre, release_date, cover_art, clicked){
    console.log("button: ", show)
    setShowWant(show)
 
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
    setShowWant(false)
  }
  /** function hideWant(id){
      setShowStart(true)
      setShowReplay(true)
      setShowWant(false);
      {showWant ? console.log("1",showWant) : console.log("false", id)}
      checkRender();
    }  */
  if(!showWant){
  return(
    <div>
      <button 
            onClick={() => handleWantClick(
            id,
            title,
            platform,
            genres,
            released,
            background
            )}>Want to Play 2</button>
    </div>
  )} else {
    return(
      <div></div>
    )
  }
}


export default Button;
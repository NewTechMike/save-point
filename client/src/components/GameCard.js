import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

function GameCard({key, img, title, platform1, platform2, released, genre}){
const [errors, setErrors] = useState([])
const [showWant, setShowWant] = useState(true)
const [showStart, setShowStart] = useState(true)
const [showReplay, setShowReplay] = useState(true)
const { user, loggedIn } = useContext(UserContext);

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
  } else {
    r.json().then((errorData) => setErrors(errorData.errors))}
  });
 setShowWant(false)
 setShowStart(true)
 setShowReplay(true)
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
    } else {
    r.json().then((errorData) => setErrors(errorData.errors))}
  });
  setShowStart(false)
  setShowWant(true)
  setShowReplay(true)
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
  } else {
    r.json().then((errorData) => setErrors(errorData.errors))}
  });
  setShowReplay(false)
  setShowStart(true)
  setShowWant(true)
}

  return(
    <ul key={key} >
      <img src={img} alt={img}/>
      <li>{title}</li>   
      <li>Platform: {platform1}</li>
      <li>/ {platform2}</li>
      <li>Release Date: {released}</li>
      <li>Genre: {genre}</li>
      
      {showWant ? 
      <button 
        onClick={()=>handleWantClick(
          key, title, platform1, genre, released, img
        )}>Want to Play</button>
      : " "}
      
      {showStart ? 
      <button 
        onClick={()=>handleStartClick(
          key, title, platform1, genre, released, img
        )}>Started Playing</button>
        : " "}
      
      {showReplay ? 
      <button 
        onClick={()=>handleReplayClick(
          key, title, platform1, genre, released, img
        )}>To Replay</button>
        : " "}

    </ul>
  )
}

export default GameCard;
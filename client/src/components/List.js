import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import ListedGames from './ListedGames';

function List(){
  const {user} = useContext(UserContext);
  const [lists, setLists] = useState([])
  const [games, setGames] = useState([])  
  const [gameCount, setGameCount] = useState(0)
  const [count, setCount] = useState(0)
  const [gen, setGen] = useState(false)
  const [forceRender, setForceRender] = useState([])
  
  useEffect(()=>{
    fetch('/lists')
    .then((r)=>r.json())
    .then((listData)=>setLists(listData))
  },[])

  const showLists = lists.map((listObj) => 
    <span key={listObj.id} style={{margin: '6rem'}}>{"   "}&nbsp;{listObj.list_name}&nbsp;{"   "}</span>
  )

  if(lists.length > 0 && gameCount === 0){
    fetch(`${user.id}/lists/${lists[0].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames(data))
    setGameCount(1)
  }

 function handleRemoveWantGame(id){
  fetch(`${user.id}/lists/${"Want to Play"}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  setTimeout(()=>{
    checkRender()
  }, 250)
}

function checkRender(){
  fetch(`${user.id}/lists/${lists[0].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames(data))
}
  const showGames = games.map((gameObj) => 
  <div >   
    <li key={"a"+gameObj.id}>{gameObj.title}{" "}</li>
    <button onClick={()=>handleRemoveWantGame(gameObj.id)}>X</button>
    <button 
      style={{flexDirection: "row" ,marginLeft: 20}} 
      onClick={()=>handleMoveToStart(gameObj.id, 0, gameObj.title)}>
        Started</button>
    <button onClick={()=>handleMoveToReplay(gameObj.id, 0, gameObj.title)}>Replay</button>  
     <div></div>
     <br></br>
  </div>
  ) 

  function handleMoveToStart(id, list, name){
    if(list === 0){
    handleRemoveWantGame(id)
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"Started Playing"}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 300)
      console.log("Removed from Want, added to Start")
      checkRender()
    } else {
    console.log("did not move to start")
    }
    setForceRender([...forceRender, 0])
    /* checkRender()
    setTimeout(()=>{
    }, 250) */
  }

  function handleMoveToReplay(id, list, name){
    if(list === 0){
      handleRemoveWantGame(id)
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"To Replay"}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 300)
      checkRender()
    } else {
      console.log("Did not Move To Replay")
    }

    //checkRender()
    /* setTimeout(()=>{
    }, 250) */
  }
  
  function handleListClick(){
    fetch(`/lists/${user.id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify()
    })
    .then((r)=>r.json())
    .then((data)=>console.log("list data: ",data)) 
    setGen(true) 
    setTimeout(()=>{
      checkListRender()
  }, 250)
  } 
  
  function checkListRender(){
    fetch('/lists')
    .then((r)=>r.json())
    .then((listData)=>setLists(listData))
  }

  if(lists.length > 0 && count === 0){
    setGen(true)
    setCount(1)
  }
 
  if(lists.length > 0){
  return(
    <div id="wrapper">
        <br></br>
      <h4>Click "Games" and start adding to your lists</h4>
        <br></br>
        <th>{showLists} </th>
      <div >
          <br></br>
        <table class="table">
          <tbody>
            <td>{showGames}</td>
            <ListedGames lists={lists} />
          </tbody>
        </table>
      </div>
    </div>
  )
  } else {
    return (
      <div>
        {gen ? null:
        <button onClick={handleListClick}>Generate Lists</button>}
      </div>
    )
  }
}

export default List;
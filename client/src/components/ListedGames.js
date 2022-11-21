import React, { useState, useEffect, useContext} from 'react'
import { UserContext} from "../context/user"

function ListedGames({lists}){
  const [games, setGames] = useState([])  
  const [games1, setGames1]= useState([])
  const [games2, setGames2]= useState([])
  const { user } = useContext(UserContext);
  
  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[0].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames(data))
  },[])

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
    .then((r)=> r.json())
    .then((data)=>setGames(data))       
   }

   const showGames = games.map((gameObj) => 
  <div style={{paddingLeft: "4rem"}}>   
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

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[1].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames1(data))
  },[])

  function handleRemoveStartGame(id){
    fetch(`${user.id}/lists/${"Started Playing"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTimeout(()=>{
      checkRender1()
    }, 250) 
  }
  function checkRender1(){
    fetch(`${user.id}/lists/${lists[1].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames1(data))
  }

  const showGames1 = games1.map((gameObj)=>
  <div style={{paddingLeft: "12rem"}}>
    <li key={gameObj.id} >{gameObj.title}</li>
    <button onClick={()=>handleRemoveStartGame(gameObj.id)}>X</button>
    <button 
      style={{flexDirection: "row" ,marginLeft: 20}} 
      onClick={()=>handleMoveToWant(gameObj.id, 1, gameObj.title)}>
        Want</button>
    <button onClick={()=>handleMoveToReplay(gameObj.id, 1, gameObj.title)}>Replay</button>  
    <div></div>
    <br></br>
  </div>
  )

  useEffect(()=>{
    fetch(`${user.id}/lists/${lists[2].id}`)
      .then((r)=>r.json())
      .then((data)=>setGames2(data))
  },[])

  function handleRemoveReplayGame(id){
    fetch(`${user.id}/lists/${"To Replay"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTimeout(()=>{
      checkRender2()
    }, 250) 
  }
  function checkRender2(){
    fetch(`${user.id}/lists/${lists[2].id}`)
    .then((r)=>r.json())
    .then((data)=>setGames2(data))
  }

  const showGames2 = games2.map((gameObj)=>
  <div className = "ReplayList" style={{paddingLeft: "21rem"}}>
    <li key={gameObj.id} >{gameObj.title}</li>
    <button  onClick={()=>handleRemoveReplayGame(gameObj.id)}>X</button>
    <button  
      style={{flexDirection: "row" ,marginLeft: 20}} 
      onClick={()=>handleMoveToWant(gameObj.id, 2, gameObj.title)}>
        Want</button>
    <button  onClick={()=>handleMoveToStart(gameObj.id, 2, gameObj.title)}>Started</button>    
    <div></div>
    <br></br>
  </div>
)
  function handleMoveToWant(id, list, name){
    if(list === 2){
      handleRemoveReplayGame(id);
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"Want to Play"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 250)
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    } else {
      handleRemoveStartGame(id);
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"Want to Play"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 250)
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    }
    setTimeout(()=>{
      checkRender()
      checkRender1()
      checkRender2()
    }, 400)
  }

  function handleMoveToStart(id, list, name){
    if(list === 2){
      handleRemoveReplayGame(id);
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"Started Playing"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 250)
      console.log("Removed from Replay, added to Start")
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    } else {
      handleRemoveWantGame(id)
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"Started Playing"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 250)
      console.log("Removed from Want, added to Start")
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    }
    setTimeout(()=>{
      checkRender()
      checkRender1()
      checkRender2()
    }, 400)
  }

  function handleMoveToReplay(id, list, name){
    if(list === 1){
    handleRemoveStartGame(id)
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"To Replay"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 300)
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    } else { 
      handleRemoveWantGame(id)
      console.log("Did not Move To Replay")
      setTimeout(()=>{
        fetch(`${user.id}/lists/${"To Replay"}`, {
          method: "PATCH", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            list_id: 1, 
            title: name
          })
        })
      }, 300)
      setTimeout(()=>{
        checkRender()
        checkRender1()
        checkRender2()
      }, 400)
    }
    setTimeout(()=>{
      checkRender()
      checkRender1()
      checkRender2()
    }, 400)
  }
  
  return(
    <div >   
      <table class="table"  > 
        <tbody >   
          <td>{showGames}</td>
            <br></br>
          <td>{showGames1}</td>
            <br></br>
          <td>{showGames2}</td>
        </tbody>
      </table>     
    </div>
  )
}

export default ListedGames;
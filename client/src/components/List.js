import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import ListedGames from './ListedGames';

function List(){
  const {user, setUser, loggedIn} = useContext(UserContext);
  const [lists, setLists] = useState([])
  const [games, setGames] = useState([])  
  const [gameCount, setGameCount] = useState(0)
  const [count, setCount] = useState(0)
  const [check, setCheck] = useState([])
  const [gen, setGen] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useEffect(()=>{
    fetch('/lists')
    .then((r)=>r.json())
    .then((listData)=>setLists(listData))
  },[])

  const showLists = lists.map((listObj) => 
  <td>
    <span key={listObj.id} style={{margin: '6rem'}}>{"   "}&nbsp;{listObj.list_name}&nbsp;{"   "}</span>    
    </td>
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
      
    <li key={"a"+gameObj.id} style={{}}>{gameObj.title}{" "}
    <button onClick={()=>handleRemoveWantGame(gameObj.id)}>X</button></li> 
    
  </div>
  ) 
  
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
    <div >
      <br></br>
      <h4>Click on the Games button and start adding to your lists</h4>
      <br></br>
      <thead>
      <th>{showLists} </th>
      </thead>
        <br></br>
      <tbody>
      <td>{showGames} </td>
      <ListedGames lists={lists} />
      </tbody>
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
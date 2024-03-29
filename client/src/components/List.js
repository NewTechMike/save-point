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
//added comment
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
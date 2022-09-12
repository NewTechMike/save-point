import React from "react";
import { useHistory } from "react-router-dom"

function Logout(){
  const history = useHistory()

  function handleLogout(){
    fetch('/logout', {
      method:"DELETE"
    })
    .then((r)=>{
      if(r.ok){
        setUser(null);
      }
    });
    history.push('/welcome')
  }
  console.log("what")

  return(
    <div style={{float: "right"}}> 
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;
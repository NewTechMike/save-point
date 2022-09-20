import React, {useContext} from 'react';
import {UserContext} from "../context/user";

function Welcome(){

  const user = useContext(UserContext);

  console.log("W UserContext: ", UserContext)
  console.log("W User: ", user)

  return(
    <div>This is the Welcome Page, {user}</div>
  )
}

export default Welcome;
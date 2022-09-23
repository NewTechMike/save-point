import React, {useContext} from 'react';
import {UserContext} from "../context/user";

function Welcome(){

  const {user, setUser} = useContext(UserContext);

  //console.log("W UserContext: ", UserContext)
  console.log("W User: ", user)

  return(
    <div>This is the Welcome Page, {user.username}</div>
  )
}

export default Welcome;
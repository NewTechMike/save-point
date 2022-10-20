import React, {useContext} from 'react';
import {UserContext} from "../context/user";

function Welcome(){

  const { user, loggedIn } = useContext(UserContext);

  console.log("W User: ", user)

  if(loggedIn){
  return( 
    <div>Welcome back, {user.username}</div>
  )} else{
    return(
      <div>Welcome to Save Point. Please Login or Sign Up</div>
    )
  }
}

export default Welcome;
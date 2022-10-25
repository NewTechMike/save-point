import React, {useContext} from 'react';
import {UserContext} from "../context/user";

function Welcome(){
  const { user, loggedIn } = useContext(UserContext);

  if(loggedIn){
  return( 
    <div>
      <h1>Welcome back, {user.username}</h1>
    </div>
  )} else{
    return(
      <div>
        <h1>Welcome to Save Point.</h1>
        <h2>A place you can always come back to</h2>
        <p>
          Here you will be able move games to lists 
          that you Want to play, started playing and want to replay
          </p>
          
        <h3>Please Login or Sign Up</h3></div>
    )
  }
}

export default Welcome;
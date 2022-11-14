import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';
import List from './List';

function Home(){
  const {user, loggedIn } = useContext(UserContext);
  const history = useHistory();

  if(loggedIn){
  return(
    <div>
      <h1>Welcome to your Home Page, { user.username }</h1>
     
      <div style={{textAlign:"left", color: "yellow", paddingLeft: "5rem"}}>
        From:{" "}
        {user.location}
        <br></br>
        About:{" "}
        {user.bio}
      </div>
          <br></br>
      <List  />
    </div>
  )} else {
    history.push('/welcome')
  }
  
}

export default Home;
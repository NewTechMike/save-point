import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user'
import { useHistory } from 'react-router-dom';

function Home(){
  const {user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);
  const history = useHistory();

  if(loggedIn){
  return(
    <div>
      Welcome to your Home Page, { user.username }
    </div>
  )} else (
    history.push('/welcome')
  )
}

export default Home;
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';


function NavBar({setUser}){
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

  return(
    <div>
      <NavLink
        to="/signup"
        activeStyle={{
          background: "darkblue",
        }}
        >
          <button type="button">
            SignUp
          </button>
        </NavLink>

      <NavLink
        to="/welcome"
        activeStyle={{
          background: "darkblue",
        }}
        >
          <button type="button">
            Welcome
          </button>
        </NavLink>

      <NavLink
        to="/home"
        activeStyle={{
          background: "darkblue",
        }}
        >
          <button type="button">
            Home
          </button>
        </NavLink>
      
      <NavLink
        to="/login"
        activeStyle={{
          background: "darkblue",
        }}
        >
          <button type="button">
            Login Page
          </button>
        </NavLink>

        <header>
          <button onClick={handleLogout}>Logout</button>
        </header>

    </div>
  )
}

export default NavBar;
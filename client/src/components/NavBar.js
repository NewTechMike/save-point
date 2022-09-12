import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(){

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
      
        <NavLink
        to="/logout"
        activeStyle={{
          background: "darkblue",
        }}
        >
          <button type="button">
            Logout
        </button>

        </NavLink>


    </div>
  )
}

export default NavBar;
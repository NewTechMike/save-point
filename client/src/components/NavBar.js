import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user'


function NavBar(){
  const history = useHistory()
  const { user, setUser } = useContext(UserContext);

  function handleLogout(){
    fetch('/logout', {
      method:"DELETE"
    })
    .then((r)=>{
      if(r.ok){
        setUser(null);
      }
    });
    history.push('/login')
  }

  return(
    <div>
      <NavLink
        to="/welcome"
        activeStyle={{
          background: "darkblue",
        }}>
        <button type="button">
          Welcome
        </button>
      </NavLink>

      <NavLink
        to="/home"
        activeStyle={{
          background: "darkblue",
        }}>
        <button type="button">
          Home
        </button>
      </NavLink>
      
      <NavLink
        to="/games"
        activeStyle={{
          background: "darkblue",
        }}>
        <button type="button">
          Games
        </button>
      </NavLink>

      <NavLink
        to="/users"
        activeStyle={{
            background: "darkblue",
        }}>
        <button type="button">
          Users
        </button>
      </NavLink>
      
      <NavLink
        to="/login"
        activeStyle={{
          background: "darkblue",
        }}>
        <button type="button">
          Login Page
        </button>
      </NavLink>

      <NavLink
        to="/signup"
        activeStyle={{
            background: "darkblue",
        }}>
        <button type="button">
          SignUp
        </button>
      </NavLink>
      <header>
        <button onClick={handleLogout}>Logout</button>
      </header>

    </div>
  )
}

export default NavBar;
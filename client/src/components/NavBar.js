import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user'


function NavBar(){
  const history = useHistory()
  const { setUser, setLoggedIn } = useContext(UserContext);

  function handleLogout(){
    fetch('/logout', {
      method:"DELETE"
    })
    .then((r)=>{
      if(r.ok){
        setUser(null);
      }
    });
    setLoggedIn(false)
    history.push('/login')
  }

  /**<NavLink
        to="/users"
        activeStyle={{
            background: "darkblue",
        }}>
        <button type="button">
          Users
        </button>
      </NavLink> */

  return(
    <div>

      <NavLink
      bg="light"
      variant="dark"
        to="/welcome"
        className="brand-name"
        style={{}}
        activeStyle={{}}
          >SavePoint</NavLink>

      <NavLink
        to="/home"
       
        activeStyle={{
          color: "lightblue",
        }}>Home</NavLink>
      
      <NavLink
        to="/profile"
        style={{}}
        activeStyle={{}}
        >Profile</NavLink>
      
      <NavLink
        to="/games"
        style={{}}
        activeStyle={{}}
        >Games</NavLink>

      <NavLink
        to="/login"
        style={{}}
        activeStyle={{}}
        >Login</NavLink>

      <NavLink
        to="/signup"
        style={{}}
        activeStyle={{}}
        >SignUp</NavLink>
      <header>
        <button onClick={handleLogout}>Logout</button>
      </header>

    </div>
  )
}

export default NavBar;
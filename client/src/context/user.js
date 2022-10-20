import React, {createContext, useState, useEffect} from 'react'

const UserContext = createContext("");

function UserProvider({children}){
  const [user, setUser] = useState(" ")
  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user));
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });
  }, [])
  
  return (
  <UserContext.Provider value={{user, setUser, loggedIn, setLoggedIn}}>
    {children}
  </UserContext.Provider>
  );
}

export {UserContext, UserProvider};
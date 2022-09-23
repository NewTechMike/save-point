import { useState, useEffect, useContext} from "react";
//import './App.css'
import { BrowserRouter, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from './SignUp';
import Welcome from "./Welcome";
import Home from './Home';
import Login from './Login';
import Games from './Games';

import { UserProvider, UserContext } from "../context/user";

//const UserContext = createContext("");

function App() {
  const [count, setCount] = useState(0);
  const {user, setUser} = useContext(UserContext);
  console.log("?: ", user)


  useEffect(() => {
    fetch("/hello")
    .then((r) => r.json())
    .then((data) => setCount(data.count));
  }, []);
  
  console.log("A1: ", user)
  
  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user.username));
      }
    });
  }, [])

  console.log("A2: ", user)

  return (
   
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/signup">
            <SignUp user={user} />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/games">
            <Games />
          </Route>
        </Switch>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
import { useState, useEffect, createContext, useContext} from "react";
//import './App.css'
import { BrowserRouter, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from './SignUp';
import Welcome from "./Welcome";
import Home from './Home';
import Login from './Login';
import Games from './Games';
import ReactDom from "react-dom/client";

import { UserProvider, UserContext } from "../context/user";

//const UserContext = createContext("");

const { user, setUser } = useContext(UserContext);

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  
  //const [user, setUser] = useState(" Something ");
  console.log("A1: ", {user})
  
  useEffect(() => {
    fetch("/users")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user));
      }
    });
  }, [])

  console.log("A2: ", {user})

  return (
    <UserProvider>
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser}/>
        <Switch>
          <Route path="/signup">
            <SignUp user={user} setUser={setUser}/>
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
            <Games user={user}/>
          </Route>
        </Switch>
      </div>

    </BrowserRouter>
      </UserProvider>
  );
}

export default App;
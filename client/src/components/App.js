import { useState, useEffect, useContext} from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from './SignUp';
import Welcome from "./Welcome";
import Home from './Home';
import Login from './Login';
import Games from './Games';
import Users from './Users';
import { UserContext } from "../context/user";

function App() {
  //const [count, setCount] = useState(0);
  const {user, setUser, loggedIn, setLoggedIn} = useContext(UserContext);

  console.log("A Logged: ", loggedIn)
/* 
  useEffect(() => {
    fetch("/hello")
    .then((r) => r.json())
    .then((data) => setCount(data.count));
  }, []); */
  
  /* useEffect(() => {
    fetch("/me")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user.username));
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });
  }, []) */
  console.log("A: ", loggedIn)

  return (
   
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/signup">
            <SignUp />
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
          <Route path="/users">
            <Users loggedIn={loggedIn}/>
          </Route>
        </Switch>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
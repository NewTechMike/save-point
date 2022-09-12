import { useState, useEffect } from "react";
//import './App.css'
import { BrowserRouter, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from './SignUp';
import Welcome from "./Welcome";
import Home from './Home';
import Login from './Login';


function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  const [user, setUser] = useState(" ");

  useEffect(() => {
    fetch("/users")
    .then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user));
      }
    });
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar setUser={setUser}/>
        <Switch>
          <Route path="/signup">
            <SignUp setUser={setUser}/>
          </Route>
          <Route path="/welcome">
            <Welcome setUser={setUser}/>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>

    
    </BrowserRouter>
  );
}

export default App;
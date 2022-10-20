import { useContext} from "react";
import { Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from './SignUp';
import Welcome from "./Welcome";
import Home from './Home';
import Login from './Login';
import Games from './Games';
import Users from './Users';
import Profile from "./Profile";
import { UserContext } from "../context/user";

function App() {
  const { loggedIn } = useContext(UserContext);

  return (
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
          <Route path="/profile">
            <Profile />
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
  );
}

export default App;
import React, { Component } from "react";
import "./styles/App.css";
import Home from "./Home";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Login from "./components/login.component";
import UserEdit from "./UserEdit";
import UserList from "./UserList";
import SignUp from "./components/signup.component";
import Navbar from "./components/navBar.component";
import CustomFoter from "./components/footer.component"
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/main" component={Home} />
            <Route path="/users" exact={true} component={UserList} />
            <Route path="/users/:id" component={UserEdit} />
            
          </Switch>
          <footer><CustomFoter/></footer>
          
          {/* </div> */}
          {/* </div> */}
        </div>
      </Router>
    );
   
  }
}

export default App;

import React, { Component } from "react";
import "./styles/App.css";
import Home from "./Home";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Login from "./components/login.component";
import { UserEdit } from "./UserEdit";
import UserList from "./UserList";
import SignUp from "./components/signup.component";
import Navbar from "./components/navBar.component";
import CustomFoter from "./components/footer.component";
import { AccountsList } from "./AccountsList";
import { LedgerList } from "./LedgersList";
import { LedgerEdit } from "./LedgerEdit";
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
            <Route path="/home" component={Home} />
            <Route path="/users/:username" exact={true} component={UserList} />
            <Route path="/accounts/:username" component={AccountsList} />
            <Route path="/users/id/:id" component={UserEdit} />
            <Route path="/ledgers/:username" exact={true} component={LedgerList} />
            <Route path="/ledgers/id/:id" component={LedgerEdit} />
          </Switch>
          <footer>
            <CustomFoter />
          </footer>

          {/* </div> */}
          {/* </div> */}
        </div>
      </Router>
    );
  }
}

export default App;

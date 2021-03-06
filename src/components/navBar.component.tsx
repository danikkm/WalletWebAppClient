import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import history from "../history";

export default class NavBar extends Component {

  handleClick() {
   history.push("/home")
  }

  render() {
    return (
      <div className="naBar">
        <AppBar position="static" className="appBar">
          <Toolbar >
            <Typography  variant="h2" className="navBar-title" onClick={this.handleClick} style={{ color: '#FFF'}}>
              Wallet
            </Typography>
            <Button color="inherit" component={Link} to="/sign-in" style={{ color: '#FFF' }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/sign-up" style={{ color: '#FFF' }}>
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

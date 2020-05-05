import React, { Component, useState } from "react";
import history from "../history";
// import MainPage from "../MainPage";
import "../styles/App.css";
import { createApiClient, User } from "../api";

const api = createApiClient();

export default class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showComponent: false,
      login: "",
      password: "",
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  async _onButtonClick() {
    this.setState({
      showComponent: true,
    });

    console.log(this.state.password);

    const user = await api.getUsersWithLogin(
      this.state.login,
      this.state.password
    );
    console.log(user);

    history.push({
      pathname: "/users",
      state: {
        users: user,
      },
    });
  }

  handleLoginChange(event: { target: { value: any } }) {
    this.setState({ login: event.target.value });
  }

  handlePasswordChange(event: { target: { value: any } }) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Login</label>
              <input
                id="login"
                type="login"
                className="form-control"
                placeholder="Enter login"
                value={this.state.login}
                onChange={(event) => this.handleLoginChange(event)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={this.state.password}
                onChange={(event) => this.handlePasswordChange(event)}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this._onButtonClick}
            >
              Submit
            </button>

            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

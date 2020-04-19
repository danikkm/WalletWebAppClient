import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// interface User {
//   id: string;
//   username: string;
//   password: string;
//   email: string;
//   name: string;
//   surname: string;
//   accounts: Account[];
// }

// interface Account {
//   id: string;
//   name: string;
//   type: string;
//   currency: string;
// }

class App extends Component {
  state = {
    users: [],
    isLoading: false,
  };

  async componentDidMount() {
    //this.setState({isLoading: true})
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => this.setState({ users, isLoading: false }));
  }
  render() {
    const { users, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const resume = users.map((user: any) => (
      <div key={user.id}>{user.name}</div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {resume}
          </div>
        </header>
      </div>
    );
  }
}

export default App;

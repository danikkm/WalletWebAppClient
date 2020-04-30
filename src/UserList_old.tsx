import React, { Component } from "react";
import "./App.css";

class UserList extends Component {
  state = {
    users: [],
    isLoading: true,
  };

  async componentDidMount() {
    const response = await fetch("/api/users");
    const body = await response.json();
    this.setState({ users: body, isLoading: false });
  }
  render() {
    const { users, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map((user: any) => (
      <div key={user.id}>{user.name}</div>
    ));

    return (
      <div>
        <h2>User list</h2>
        {userList}
      </div>
    );
  }
}

export default UserList;

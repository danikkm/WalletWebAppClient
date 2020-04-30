import React, { useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { createApiClient, User } from "./api";

export type AppState = {
  users?: User[];
};

const api = createApiClient();

export class UserList extends React.PureComponent<{}, AppState> {
  state: AppState = {};
  async componentDidMount() {
    this.setState({
      users: await api.getUsers(),
    });
  }

  async remove(username: string) {
    await api.deleteUser(username)
    let realUsers: User[] = this.state.users || [];
    let updatedUsers = [...realUsers].filter(user => user.username !== username);
    this.setState({users: updatedUsers});
  }
  renderUsers = (users: User[]) => {
    const filteredUsers = users.filter(
      (u) => u.name.toLowerCase() + u.surname.toUpperCase()
    );

    return filteredUsers.map((user) => (
      <tr key={user.id}>
        <td style={{ whiteSpace: "nowrap" }}>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <ButtonGroup>
            {/* <Button size="sm" color="secondary" tag={Link} to={"/users/" + user.id}>Edit</Button> */}
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/users/" + user.id}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.remove(user.username)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));
  };

  render() {
    const { users } = this.state;

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">
              Add user
            </Button>
          </div>
          <h3>
            {users ? (
              <div className="results">Showing {users.length} users</div>
            ) : null}
          </h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Username</th>
                <th style={{ width: "20%" }}>Name</th>
                <th>Email</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                this.renderUsers(users)
              ) : (
                <Container>Loading...</Container>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;

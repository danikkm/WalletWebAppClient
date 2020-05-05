import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { createApiClient, User } from "../api";
import "../styles/UserMenu.css";
import { Button, ButtonGroup, Container } from "reactstrap";
import { Link } from "react-router-dom";

const api = createApiClient();

export type AppState = {
  users?: User[];
};

export default class UserTable extends React.Component<{}, AppState> {
  state: AppState = {};
  async componentDidMount() {

    this.setState({
      users: await api.getUsers(),
    });
  }

  async remove(username: string) {
    await api.deleteUser(username);
    let realUsers: User[] = this.state.users || [];
    let updatedUsers = [...realUsers].filter(
      (user) => user.username !== username
    );
    this.setState({ users: updatedUsers });
  }

  renderUsers = (users: User[]) => {
    const filteredUsers = users.filter(
      (u) => u.name.toLowerCase() + u.surname.toUpperCase()
    );

    return filteredUsers.map((user) => (
      <TableRow key={user.id}>
        <TableCell component="th" scope="row">
          {user.id}
        </TableCell>
        <TableCell align="right">{user.username}</TableCell>
        <TableCell align="right">{user.name}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">
          <ButtonGroup>
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
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const { users } = this.state;

    return (
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User id</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              this.renderUsers(users)
            ) : (
              <Container>Nothing yet...</Container>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

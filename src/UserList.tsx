import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { createApiClient, User } from "./api";
import "./styles/UserMenu.css";
import UserTable from "./components/usersTable.component";

export type AppState = {
  users?: User[];
};

export class UserList extends React.PureComponent<{}, AppState> {
  state: AppState = {};
  async componentDidMount() {
    this.setState({
      users: [],
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="user-wrapper">
        <Container fluid className="container">
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
        </Container>
        <UserTable />
      </div>
    );
  }
}

export default UserList;

import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { createApiClient, User } from "./api";
import history from "./history";

import MaterialTable from "material-table";

import "./styles/UserMenu.css";

export type AppState = {
  users?: User[];
  item: any;
  account: any;
  edditing: boolean;
  columns: any;
};

const api = createApiClient();

interface MatchParams {
  id: string;
}

export class UserEdit extends React.Component<
  RouteComponentProps<MatchParams>,
  AppState
> {
  emptyItem = {
    username: "",
    password: "",
    email: "",
    name: "",
    surname: "",
    accounts: "",
  };

  emptyAccount = {
    name: "",
    type: "",
    currency: "",
  };

  state: AppState = {
    item: "",
    account: {},
    edditing: false,
    columns: {},
  };

  constructor(props: RouteComponentProps<MatchParams>) {
    super(props);
    this.state = {
      item: this.emptyItem,
      account: [],
      edditing: false,
      columns: [
        { title: "Name", field: "name" },
        { title: "Type", field: "type" },
        { title: "Currency", field: "currency" },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.accountHandleChange = this.accountHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      console.log(this.props.match.params.id);

      const id = this.props.match.params.id;
      const user = ((await api.getUserById(id)) as unknown) as User;
      const accounts = user.accounts;
      this.setState({ item: user, account: accounts, edditing: true });
    }
    this.setState({
      users: await api.getUsers(),
    });

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: any }) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  accountHandleChange(event: { target: any }) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let account = { ...this.state.account };
    account[name] = value;
    this.setState({ account });
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const { item, account } = this.state;
    item.accounts = account;
    //item.accounts.push(account);
    console.log(item);
    await api.saveOrUpdateUser(item);
    history.push("/users");
    //this.props.history.push('/users')
  }

  renderMainView = (item: any, account: any) => {
    const title = <h2>{item.id ? "Edit user" : "Add user"}</h2>;

    return (
      <div>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="usernmae"
                value={item.username || ""}
                onChange={this.handleChange}
                autoComplete="username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={item.password || ""}
                onChange={this.handleChange}
                autoComplete="password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={item.email || ""}
                onChange={this.handleChange}
                autoComplete="email"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-6 mb-3">
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={item.name || ""}
                  onChange={this.handleChange}
                  autoComplete="name"
                />
              </FormGroup>
              <FormGroup className="col-md-6 mb-3">
                <Label for="surname">Surname</Label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  value={item.surname || ""}
                  onChange={this.handleChange}
                  autoComplete="surname"
                />
              </FormGroup>
            </div>

            {this.renderAccountsTable(account)}
            <FormGroup className="form-group">
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/users">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  };

  renderAccountsTable = (account: any) => {
    return (
      <MaterialTable
        columns={this.state.columns}
        data={account}
        options={{
          selection: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData: any) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.account];
                  data.push(newData);
                  console.log(data);
                  this.setState({ account: data });
                  // return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData: any, oldData: any) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState((prevState) => {
                    const data = [...prevState.account];

                    data[data.indexOf(oldData)] = newData;

                    this.setState({ account: data });
                    console.log(this.state.account);

                    // return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.account];
                  data.splice(data.indexOf(oldData), 1);
                  console.log(data);
                  this.setState({ account: data });
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
        title="Accounts"
      />
    );
  };

  render() {
    const { item, account, edditing } = this.state;
    const title = <h2>{item.id ? "Edit user" : "Add user"}</h2>;

    return (
      <div className="user-wrapper">{this.renderMainView(item, account)}</div>
    );
  }
}

export default withRouter(UserEdit as any);

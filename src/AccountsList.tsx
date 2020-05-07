import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { createApiClient, Account } from "./api";
import "./styles/UserMenu.css";
import Cookies from "js-cookie";
import MaterialTable from "material-table";

const api = createApiClient();

export type AppState = {
  accounts: Account[];
  columns: any;
};

export class AccountsList extends React.PureComponent<{}, AppState> {
  state: AppState = {
    accounts: [],
    columns: {},
  };
  constructor(props: any) {
    super(props);
    this.state = {
      accounts: [],
      columns: [
        { title: "Name", field: "name" },
        { title: "Type", field: "type" },
        { title: "Currency", field: "currency" },
      ],
    };
  }
  async componentDidMount() {
    this.setState({
      accounts: await api.getUserAccounts(Cookies.get("username") as string),
    });
  }

  render() {
    const { accounts } = this.state;
    console.log(accounts);
    return (
      <div className="user-wrapper">
        <Container fluid className="container">
          <h3>
            {accounts ? (
              <div className="results">Showing {accounts.length} accounts</div>
            ) : null}
          </h3>
        </Container>
        <MaterialTable
          columns={this.state.columns}
          data={accounts}
          options={{
            selection: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData: Account) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.accounts];
                    data.push(newData);
                    this.setState({ accounts: data });
                    api.putNewAccount(
                      newData,
                      Cookies.get("username") as string
                    );
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData: any, oldData: any) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.accounts];
                      data[data.indexOf(oldData)] = newData;
                      this.setState({ accounts: data });
                      api.updateAccounts(
                        data,
                        Cookies.get("username") as string
                      );
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData: any) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.accounts];
                    data.splice(data.indexOf(oldData), 1);
                    console.log(data);
                    this.setState({ accounts: data });
                    api.deleteAccounts(data, Cookies.get("username") as string);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
          title="Accounts"
        />
      </div>
    );
  }
}

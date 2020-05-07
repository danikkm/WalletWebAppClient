import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { createApiClient, Ledger } from "./api";
import "./styles/UserMenu.css";
import Cookies from "js-cookie";
import MaterialTable from "material-table";
import history from "./history";

const api = createApiClient();

export type AppState = {
  ledgers: Ledger[];
  columns: any;
};

export class LedgerList extends React.PureComponent<{}, AppState> {
  state: AppState = {
    ledgers: [],
    columns: {},
  };
  constructor(props: any) {
    super(props);
    this.state = {
      ledgers: [],
      columns: [
        { title: "Title", field: "title" },
        { title: "Description", field: "description" },
        { title: "Date", field: "date" },
        { title: "Amount", field: "amount" },
        { title: "Transaction type", field: "transactionType" },
        { title: "Account", field: "account.name" },
        { title: "Category", field: "subcategory.title" },
      ],
    };
  }
  async componentDidMount() {
    this.setState({
      ledgers: await api.getLedgers(),
    });
    console.log(this.state.ledgers);
  }

  render() {
    const { ledgers } = this.state;
    console.log(ledgers);
    return (
      <div className="user-wrapper">
        <Container fluid className="container">
          <div className="float-right"></div>
          <div className="float-right">
            <Button color="success" tag={Link} to="/ledgers/id/new">
              Add new
            </Button>
          </div>
          <h3>
            {ledgers ? (
              <div className="results">Showing {ledgers.length} ledgers</div>
            ) : null}
          </h3>
        </Container>
        <MaterialTable
          columns={this.state.columns}
          data={ledgers}
          options={{
            selection: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowUpdate: (newData: any, oldData: any) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.ledgers];
                      data[data.indexOf(oldData)] = newData;
                        this.setState({ ledgers: data });
                      console.log("Data", newData);
                      api.saveLedger(newData);
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData: Ledger) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.ledgers];
                    data.splice(data.indexOf(oldData), 1);
                    console.log(data);
                    this.setState({ ledgers: data });
                    api.deleteLedger(oldData.id);
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

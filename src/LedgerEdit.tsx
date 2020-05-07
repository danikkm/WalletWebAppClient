import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { createApiClient, Account, Subcategory, Ledger } from "./api";
import history from "./history";

import "./styles/UserMenu.css";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import MaterialTable from "material-table";
import Cookies from "js-cookie";

export type AppState = {
  accounts: Account[];
  subcategories: Subcategory[];
  item: any;
  transactionTypes: any;
  categories: any;
  accountColumns: any;
  subcategoriesColumns: any;
  selectedTransactionType: any;
  selectedCategory: any;
  selectedAccount: any;
  selectedSubcategory: any;
};

const api = createApiClient();

interface MatchParams {
  id: string;
}

export class LedgerEdit extends React.Component<
  RouteComponentProps<MatchParams>,
  AppState
> {
  emptyItem = {
    id: "",
    title: "",
    decsription: "",
    date: "",
    amount: "",
    subcategory: "",
    account: "",
    transactionType: "",
  };

  emptyAccount = {
    name: "",
    type: "",
    currency: "",
  };

  emptyCategory = {
    title: "",
  };

  state: AppState = {
    accounts: [],
    subcategories: [],
    item: {},
    transactionTypes: {},
    categories: {},
    accountColumns: {},
    subcategoriesColumns: {},
    selectedTransactionType: "",
    selectedCategory: "",
    selectedAccount: "",
    selectedSubcategory: "",
  };

  constructor(props: RouteComponentProps<MatchParams>) {
    super(props);
    this.state = {
      accounts: [],
      subcategories: [],
      item: {},
      transactionTypes: [
        { id: 1, type: "income" },
        { id: 2, type: "expense" },
      ],
      categories: [
        { id: 1, title: "Food & Drinks", jsonFileName: "foodAndDrinks.json" },
        { id: 2, title: "Housing", jsonFileName: "housing.json" },
        {
          id: 3,
          title: "Communication, PC",
          jsonFileName: "communicationPC.json",
        },
        {
          id: 4,
          title: "Financial expenses",
          jsonFileName: "financialExpenses.json",
        },
        { id: 5, title: "Income", jsonFileName: "income.json" },
        { id: 6, title: "Investments", jsonFileName: "investments.json" },
        {
          id: 7,
          title: "Life & Entertainment",
          jsonFileName: "lifeAndEntertainment.json",
        },
        { id: 8, title: "Shopping", jsonFileName: "shopping.json" },
        { id: 9, title: "Transportation", jsonFileName: "transportation.json" },
        { id: 10, title: "Vehicle", jsonFileName: "vehicle.json" },
      ],
      accountColumns: [
        { title: "Name", field: "name" },
        { title: "Type", field: "type" },
        { title: "Currency", field: "currency" },
      ],
      subcategoriesColumns: [{ title: "Title", field: "title" }],
      selectedTransactionType: "",
      selectedCategory: "",
      selectedAccount: "",
      selectedSubcategory: "",
    };

    this.handleChangeOfDropDown = this.handleChangeOfDropDown.bind(this);
    this.handleChangeOfCategoriesDropDown = this.handleChangeOfCategoriesDropDown.bind(
      this
    );

    this.handleAccountSelectedRow = this.handleAccountSelectedRow.bind(this);
    this.handleSubcategorySelectedRow = this.handleSubcategorySelectedRow.bind(
      this
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({
      accounts: await api.getUserAccounts(Cookies.get("username") as string),
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

  handleChangeOfDropDown(event: { target: any }) {
    this.setState({ selectedTransactionType: event.target.value });
  }

  async handleChangeOfCategoriesDropDown(event: { target: any }) {
    this.setState({
      selectedCategory: event.target.value,
      subcategories: await api.getSubcategoryByCategoryName(
        event.target.value as string
      ),
    });
    console.log(this.state.selectedCategory);
  }

  handleAccountSelectedRow(value: any) {
    this.setState({
      selectedAccount: value[0],
    });
    console.log(value[0]);
  }

  handleSubcategorySelectedRow(value: any) {
    this.setState({
      selectedSubcategory: value[0],
    });
    console.log(value[0]);
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const {
      item,
      selectedAccount,
      selectedSubcategory,
      selectedTransactionType,
    } = this.state;
    item.account = selectedAccount;
    item.subcategory = selectedSubcategory;
    item.transactionType = selectedTransactionType;
    console.log(item);
    await api.saveLedger(item);
    history.push("/ledgers/" + Cookies.get("username" as string));

    //this.props.history.push('/users')
  }

  renderMainView = (item: any) => {
    const title = <h2>{item.id ? "Edit ledger" : "Add ledger"}</h2>;

    return (
      <div>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={item.title || ""}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={item.description || ""}
                onChange={this.handleChange}
                autoComplete="description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={item.date || ""}
                onChange={this.handleChange}
                autoComplete="date"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-6 mb-3">
                <Label for="amount">Amnount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={item.amount || ""}
                  onChange={this.handleChange}
                  autoComplete="amount"
                />
              </FormGroup>
              <FormGroup className="col-md-6 mb-3">
                <div>
                  <FormControl required style={{ minWidth: 320 }}>
                    <InputLabel htmlFor="age-native-required">
                      Transaction type
                    </InputLabel>
                    <Select
                      native
                      // value={state.age}
                      onChange={this.handleChangeOfDropDown}
                      name="transactionType"
                      inputProps={{
                        id: "transaction-native-required",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.state.transactionTypes.map((transaction: any) => (
                        <option key={transaction.id} value={transaction.type}>
                          {" "}
                          {transaction.type}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </div>
              </FormGroup>
            </div>

            <div>
              <h3>Account</h3>
            </div>

            <MaterialTable
              title="Available accounts"
              columns={this.state.accountColumns}
              data={this.state.accounts}
              options={{
                selection: true,
              }}
              onSelectionChange={(rows) => this.handleAccountSelectedRow(rows)}
            />

            <div>
              <h3>Category</h3>
            </div>

            <div className="row">
              <FormGroup className="col-md-4 mb-6">
                <Label for="amount">Categories</Label>
                <div>
                  <FormControl required style={{ minWidth: 320 }}>
                    <InputLabel htmlFor="age-native-required">
                      Categories
                    </InputLabel>
                    <Select
                      native
                      // value={state.age}
                      onChange={this.handleChangeOfCategoriesDropDown}
                      name="Categories"
                      inputProps={{
                        id: "categories-native-required",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.state.categories.map((category: any) => (
                        <option key={category.id} value={category.jsonFileName}>
                          {" "}
                          {category.title}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </div>
              </FormGroup>
              <MaterialTable
                title="Available accounts"
                columns={this.state.subcategoriesColumns}
                data={this.state.subcategories}
                options={{
                  selection: true,
                }}
                onSelectionChange={(rows) =>
                  this.handleSubcategorySelectedRow(rows)
                }
              />
            </div>

            <FormGroup className="form-group">
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/ledgers">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  };

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit user" : "Add user"}</h2>;

    return <div className="user-wrapper">{this.renderMainView(item)}</div>;
  }
}

export default withRouter(LedgerEdit as any);

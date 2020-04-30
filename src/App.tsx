// import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { createApiClient, User } from "./api";

import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import {Router, Route, Switch } from "react-router-dom";
import UserList from "./UserList";
import { UserEdit } from "./UserEdit";
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/users" exact={true} component={UserList} />
          <Route path='/users/:id' component={UserEdit}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

// export type AppState = {
//   users?: User[];
// };

// const api = createApiClient();

// export class App extends React.PureComponent<{}, AppState> {
//   state: AppState = {};

//   async componentDidMount() {
//     this.setState({
//       users: await api.getUsers(),
//     });
//   }

//   renderUsers = (users: User[]) => {
//     const filteredUsers = users.filter(
//       (u) => u.name.toLowerCase() + u.surname.toUpperCase()
//     );
//     return (
//       <ul>
//         {" "}
//         {filteredUsers.map((user) => (
//           <li key={user.id}>
//             <h3>{user.username}</h3>
//             <div> Name {user.name}</div>
//             <div>Surname {user.surname}</div>
//             <div>
//               {user.accounts?.map((account) => (
//                 <li key={account.id}>
//                   <h5>{account.name}</h5>
//                   <h5>{account.type}</h5>
//                 </li>
//               ))}
//             </div>
//             <div></div>
//             <footer></footer>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   render() {
//     const { users } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           {users ? (
//             <div className="results">Showing {users.length} users</div>
//           ) : null}

//           {users ? this.renderUsers(users) : <h2>Loading..</h2>}
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

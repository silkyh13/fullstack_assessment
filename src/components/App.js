import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../styles/App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="homepage">
          <div id="navbar">
            <div className="container">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/transactions">Transactions</Link>
                </li>
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
              </ul>
            </div>
          </div>
          <Switch>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

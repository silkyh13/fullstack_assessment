import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../styles/App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }
  render() {
    return (
      <Router>
        <div id="homepage">
          <nav className="navbar">
            <div className="container">
              <h1 className="logo">
                <Link to="/">Coinbase</Link>
              </h1>
              {this.state.user ? (
                <ul>
                  <li>
                    <Link to="/transactions">Transactions</Link>
                  </li>
                  <li>
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>

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
              <SignIn user={this.state.user} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

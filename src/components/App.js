import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userName: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  //get user data info to pass as props
  getUser = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({
          user: res.data,
          userName: res.data.firstName
        });
      })
      .catch(err => console.error(err));
  };

  //log out user
  loggedOut = event => {
    axios
      .get("/api/logout")
      .then(response => {
        // handle success
        this.setState({
          user: null,
          userName: ""
        });
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(res => {
        // always executed
        console.log("logged out");
      });
  };
  render() {
    return (
      <Router>
        <div id="homepage">
          <nav className="navbar">
            <div className="container">
              <h1 className="logo">
                <Link to="/">Coinbase</Link>
              </h1>
              {this.state.loggedOut
                ? (window.location.pathname = "/signin")
                : null}
              {this.state.user ? (
                <ul>
                  <li>
                    <Link to="/transactions">Transactions</Link>
                  </li>
                  <li>
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link onClick={this.loggedOut} to="/signin">
                      Log Out
                    </Link>
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
            <Route path="/signin">
              <SignIn user={this.state.user} getUser={this.getUser} />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/portfolio">
              <Portfolio
                user={this.state.user}
                userName={this.state.userName}
              />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Home user={this.state.user} userName={this.state.userName} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

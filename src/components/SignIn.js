import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import "../styles/SignIn.css";
import axios from "axios";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      loggedInUser: "",
      close: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({
      close: !this.state.close
    });
  }
  handleSignIn = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  //submit login
  submitForm = event => {
    let isError = false;
    event.preventDefault();
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        this.props.getUser();
      })
      .catch(error => {
        this.setState({
          error: true
        });
      })
      .finally(() => {
        // window.location.reload();
        console.log(isError);
      });
  };

  render() {
    return (
      <div id="sign-in">
        {this.props.userName ? (window.location = "/portfolio") : null}
        <div className="form-container">
          <div className="form-wrap">
            <h1>Sign In</h1>
            {this.state.error ? (
              <div className="error-message">Incorrect password or email</div>
            ) : null}
            <form>
              <div className="form-group">
                <label>Email </label>
                <input
                  type="email"
                  id="email"
                  onChange={this.handleSignIn}
                ></input>
              </div>

              <div className="form-group">
                <label>Password </label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleSignIn}
                ></input>
              </div>

              <button onClick={this.submitForm}>
                {this.state.error ? "Retry" : "Sign In"}
              </button>
            </form>
          </div>

          <footer>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </footer>
          <div>
            <div className={this.state.close ? "box3 sb14" : "none"}>
              <div className="close-container" onClick={this.handleClick}>
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <label className="close">close</label>
              </div>
              Email: demo@gmail.com <br /> Password: demo
            </div>
          </div>
        </div>
      </div>
    );
  }
}

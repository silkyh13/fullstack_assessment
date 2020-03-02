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
      loggedInUser: ""
    };
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
                  placeholder="demo@gmail.com"
                ></input>
              </div>

              <div className="form-group">
                <label>Password </label>
                <input
                  type="password"
                  id="password"
                  placeholder="demo"
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
        </div>
        <div className="box3 sb14">
          <div class="close-container">
            <div class="leftright"></div>
            <div class="rightleft"></div>
            <label class="close">close</label>
          </div>
          Email: demo@gmail.com <br /> Password: demo
        </div>
      </div>
    );
  }
}

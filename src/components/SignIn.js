import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import "../styles/SignIn.css";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };
  }
  render() {
    return (
      <div id="sign-in">
        <div className="form-container">
          {this.props.user ? (
            (window.location = "/portfolio")
          ) : (
            <div className="form-wrap">
              <h1>Sign In</h1>
              {this.state.error ? (
                <div className="error-message">Incorrect password or email</div>
              ) : null}
              <form>
                <div className="form-group">
                  <label>Email </label>
                  <input type="email" id="email"></input>
                </div>
                <div className="form-group">
                  <label>Password </label>
                  <input type="password" id="password"></input>
                </div>

                <button>{this.state.error ? "Retry" : "Sign In"}</button>
              </form>
            </div>
          )}
          <footer>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

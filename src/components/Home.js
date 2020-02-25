import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="headers">
          {this.props.userName ? (
            <h1 className="header">
              WELCOME <span className="larger">{this.props.userName}</span>
            </h1>
          ) : (
            <h2>
              <Link className="name-of-user" to="/signin">
                Sign in Here
              </Link>
            </h2>
          )}
        </div>
      </div>
    );
  }
}

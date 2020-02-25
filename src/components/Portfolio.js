import React, { Component } from "react";

export default class Portfolio extends Component {
  render() {
    console.log(this.props.user, this.props.userName);
    return (
      <div>
        {this.props.user ? (
          <h1 className="header">
            WELCOME <span className="larger">{this.props.user.firstName}</span>
          </h1>
        ) : (
          <h2>ddd{this.props.userName}</h2>
        )}
      </div>
    );
  }
}

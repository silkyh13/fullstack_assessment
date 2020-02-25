import React, { Component } from "react";

export default class Portfolio extends Component {
  render() {
    console.log(this.props.user, "wat is the username", this.props.userName);
    return (
      <div>
        {this.props.userName ? (
          <h1 className="header">
            WELCOME <span className="larger">{this.props.userName}</span>
          </h1>
        ) : (
          <h2>ddd{this.props.userName}</h2>
        )}
      </div>
    );
  }
}

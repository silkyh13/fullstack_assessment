import React, { Component } from "react";

export default class Portfolio extends Component {
  render() {
    return (
      <div>
        Hi {this.props.user}
        <div>Portfolio</div>
      </div>
    );
  }
}

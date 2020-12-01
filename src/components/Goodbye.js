import React, { Component } from "react";

export default class Goodbye extends Component {
  render(){
    return (
      <div id="sign-in">
        <div className="form-container">
          <h1>
            Goodbye <br /> <span className="custom-br">for</span>
            <br />
            now.{" "}
          </h1>
          <img src="http://localhost:3000/img/clown.gif"></img>
        </div>
      </div>
    );
  }
}

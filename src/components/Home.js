import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
export default class Home extends Component {
  // componentDidMount() {
  //   this.
  //   location.reload();
  // }
  render() {
    return (
      <div id="homepage">
        <div id="left">
          <div id="left_s"></div>
        </div>
        <div id="right">
          <div id="right_s"></div>
        </div>
        <div id="img">
          <img src="http://localhost:3000/img/v.png"></img>
        </div>
        <div className="content">
          <h1>
            Finance <br /> <span className="custom-br">is</span>
            <br /> important
          </h1>
          <p>Lorem ipsum dolor sit.</p>
          <button>
            {this.props.user ? (
              <h2>
                <Link className="name-of-user" to="/portfolio">
                  WELCOME <span>{this.props.userName}</span>
                </Link>
              </h2>
            ) : (
              <h2>
                <Link className="name-of-user" to="/signin">
                  Sign in Here
                </Link>
              </h2>
            )}
          </button>
        </div>
        <div className="media">
          <ul>
            <li>
              <i className="fab fa-facebook-square"></i>
            </li>
            <li>
              <i className="fab fa-twitter-square"></i>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

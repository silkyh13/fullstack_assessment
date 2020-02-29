import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
export default class Home extends Component {
  render() {
    return (
      <div id="homepage">
        <div id="left"></div>
        <div id="right"></div>
        <div id="img">
          <img src="http://localhost:3000/img/v.png"></img>
        </div>
        <div id="content">
          <h1>
            Finance <br /> is important
          </h1>
          <p>Lorem ipsum dolor sit.</p>
          <button>
            {this.props.user ? (
              <h1>
                WELCOME <span>{this.props.userName}</span>
              </h1>
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
        <div className="navigator">
          <ul>
            <li>
              <i className="fas fa-arrow-left"></i>
            </li>
            <li>
              <i className="fas fa-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

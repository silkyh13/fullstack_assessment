import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Mobile.css";
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
                  Portfolio
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
              <a
                href="https://www.facebook.com/Spotify"
                target="_blank"
                title="Share on Facebook"
              >
                <i className="fab fa-facebook-square fa-2x"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Spotify"
                target="_blank"
                title="Share on Twitter"
              >
                <i className="fab fa-twitter-square fa-2x"></i>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/silkyh13"
                target="_blank"
                title="Share on Github"
              >
                <i class="fab fa-github-square fa-2x"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/silin-dang"
                target="_blank"
                title="Share on LinkedIn"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

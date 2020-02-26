import React, { Component } from "react";
import "../styles/Portfolio.css";
import PortfolioList from "./PortfolioList.js";

export default class Portfolio extends Component {
  render() {
    return (
      <div>
        {this.props.userName ? (
          <h1 className="header">
            Portfolio <span className="larger">($fake cash)</span>
          </h1>
        ) : null}

        <div className="app">
          <PortfolioList />

          <div className="category">
            <h3 className="cash">Cash - $5000.00</h3>
            <form className="category-form">
              <div className="form-group">
                <input type="text" placeholder="Ticker"></input>
              </div>
              <div className="form-group">
                <input type="text" placeholder="QTY"></input>
              </div>
              <button type="submit" className="btn">
                Buy
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

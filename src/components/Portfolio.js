import React, { Component } from "react";
import "../styles/Portfolio.css";
import PortfolioList from "./PortfolioList.js";
import axios from "axios";

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: 0,
      balance: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  //handle input: ticker's name and quantity
  handleTransaction = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  //make post request to purchase stocks
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/transaction", {
        ticker: this.state.ticker,
        quantity: this.state.quantity
      })
      .then(transaction => {
        console.log("success", transaction);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //get account balance
  componentDidMount() {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({
          balance: res.data.balance
        });
      })
      .catch(err => console.error(err));
  }
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
            <h3 className="cash">Cash - ${this.state.balance}</h3>
            <form className="category-form">
              <div className="form-group">
                <input
                  id="ticker"
                  type="text"
                  placeholder="Ticker"
                  onChange={this.handleTransaction}
                ></input>
              </div>
              <div className="form-group">
                <input
                  id="quantity"
                  type="text"
                  placeholder="Quantity"
                  onChange={this.handleTransaction}
                ></input>
              </div>
              <button type="submit" className="btn" onClick={this.handleSubmit}>
                Buy
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

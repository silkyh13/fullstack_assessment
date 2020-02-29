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
      balance: 0,
      error: false,
      noMoney: false,
      list: [],
      fakeCash: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  cashMeOutside = fakeCash => {
    this.setState({
      fakeCash
    });
  };
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
        document.getElementById("ticker").value = "";
        document.getElementById("quantity").value = "";
        this.getPortfolioList();
        if (transaction.data === "Ticker does not exist.") {
          this.setState({
            error: true
          });
        } else if (transaction.data === "Not enough money in account") {
          this.setState({
            error: false,
            noMoney: true
          });
        } else {
          this.setState({
            error: false
          });
        }
        this.getUserBalance();
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  };
  componentDidMount() {
    this.getUserBalance();
    this.getPortfolioList();
  }

  //get account balance
  getUserBalance = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({
          balance: (res.data.balance / 1000).toFixed(2)
        });
      })
      .catch(err => console.error(err));
  };
  //get compiled list of stock and prices
  getPortfolioList = () => {
    axios
      .get("/api/portfolio")
      .then(res => {
        this.setState({
          list: res.data
        });
      })
      .catch(err => console.error(err));
  };
  render() {
    return (
      <div id="portfolio-container">
        {this.props.userName ? (
          <h1 className="header">
            Portfolio <span className="larger">{this.state.fakeCash}</span>
          </h1>
        ) : null}

        <div className="app">
          <PortfolioList
            cashMeOutside={this.cashMeOutside}
            list={this.state.list}
            getPortfolioList={this.getPortfolioList}
          />

          <div className="category">
            <h2 className="cash">Cash - ${this.state.balance}</h2>
            {this.state.error ? (
              <h3>Enter a valid ticker or amount</h3>
            ) : this.state.noMoney ? (
              <h3>Not Enough Money</h3>
            ) : null}
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

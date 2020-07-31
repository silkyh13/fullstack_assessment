import React, { Component } from "react";
import ReactDom from "react-dom";
import "../styles/Portfolio.css";
import axios from "axios";

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="txn">
        <div className="txn-table">
          <div className="txn-header txn-row">
            <div className="txn-data">Ticker</div>
            <div className="txn-data">Shares</div>
            <div className="txn-data">Total Price</div>
          </div>
          {this.props.list.map((stock, index) => {
            console.log(stock.latestPrice, stock.open);
            return (
              <div className="txn-row" key={index}>
                <div className="txn-data">{stock.symbol}</div>
                <div className="txn-data">{stock.quantity} shares</div>
                <div className="txn-data">
                  ${(stock.quantity * stock.latestPrice).toFixed(2)}&ensp;
                  <span
                    id={
                      stock.latestPrice > stock.open
                        ? "green"
                        : stock.latestPrice < stock.open
                        ? "red"
                        : "grey"
                    }
                  >
                    {stock.latestPrice > stock.open
                      ? "▲"
                      : stock.latestPrice < stock.open
                      ? "▼"
                      : "■"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

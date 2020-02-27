import React, { Component } from "react";
import axios from "axios";
import "../styles/Transaction.css";

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/transaction")
      .then(res => {
        this.setState({
          transactions: res.data
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h1 className="header">Transactions</h1>

        <div className="txn">
          <div className="txn-table">
            <div className="txn-header txn-row">
              <div className="txn-data">Ticker</div>
              <div className="txn-data">Shares</div>
              <div className="txn-data">Total Price</div>
            </div>

            {this.state.transactions.map((transaction, index) => {
              return (
                <div className="txn-row">
                  <div className="txn-data">{transaction.ticker}</div>
                  <div className="txn-data">{transaction.quantity} shares</div>
                  <div className="txn-data">
                    ${transaction.cost * transaction.quantity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

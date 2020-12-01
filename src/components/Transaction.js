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
  convertDate (s) {
    let date = new Date(s)
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return mS[date.getMonth()] + " " + date.getDate() + ', ' + date.getFullYear()

  }

  render() {
    return (
      <div id="transaction-container">
        <h1 className="header">Transactions</h1>

        <div className="txn">
          <div className="txn-table">
            <div className="txn-header txn-row">
            <div className="txn-data">Date</div>
              <div className="txn-data">Ticker</div>
              <div className="txn-data">Shares</div>
              <div className="txn-data">Total Price</div>
            </div>

            {this.state.transactions.map((transaction, index) => {
              return (
                <div className="txn-row" key={index}>
                  <div className="txn-data">{this.convertDate(transaction.createdAt)}</div>
                  <div className="txn-data">BUY ({transaction.ticker})</div>
                  <div className="txn-data">{transaction.quantity} shares</div>
                  <div className="txn-data">
                    $
                    {((transaction.cost / 1000) * transaction.quantity).toFixed(
                      2
                    )}
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

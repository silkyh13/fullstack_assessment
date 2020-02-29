import React, { Component } from "react";
import ReactDom from "react-dom";
import "../styles/Portfolio.css";
import axios from "axios";

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeCash: 0
    };
  }
  componentDidMount = () => {
    // this.props.cashMeOutside(this.state.fakeCash);
    console.log(this.props.list);
  };
  handleCash = fakeCash => {
    console.log("made it here");
    // this.setState({
    //   fakeCash
    // });
  };

  render() {
    let cash = 0;
    return (
      <div className="txn">
        {cash}
        <div className="txn-table">
          <div className="txn-header txn-row">
            <div className="txn-data">Ticker</div>
            <div className="txn-data">Shares</div>
            <div className="txn-data">Total Price</div>
          </div>
          {this.props.list.map((stock, index) => {
            cash =
              cash +
              parseFloat((stock.quantity * stock.latestPrice).toFixed(2));
            return (
              <div
                className="txn-row"
                key={index}
                onChange={e => this.handleCash(cash)}
              >
                <div className="txn-data">{stock.symbol}</div>
                <div className="txn-data">{stock.quantity} shares</div>
                <div className="txn-data">
                  ${(stock.quantity * stock.latestPrice).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

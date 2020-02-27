import React from "react";
import ReactDom from "react-dom";
import "../styles/Portfolio.css";

var PortfolioList = props => {
  return (
    <div className="txn">
      <div className="txn-table">
        <div className="txn-header txn-row">
          <div className="txn-data">Ticker</div>
          <div className="txn-data">Shares</div>
          <div className="txn-data">Total Price</div>
        </div>

        <div className="txn-row">
          <div className="txn-data">fb</div>
          <div className="txn-data">5 shares</div>
          <div className="txn-data">$20045.09</div>
        </div>
      </div>
    </div>
  );
};
export default PortfolioList;

import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";

export const HistoricAll = ({ allRates }) => (
  <div>
    <NavLink to="/historic">
      <button>back</button>
    </NavLink>
    <div width="40%" style={{ textAlign: "center" }}>
      <br />
      <table border="5" style={{ textAlign: "center" }}>
        <tbody style={{ textAlign: "center" }}>
          <tr>
            <th style={{ width: "150px" }}>From</th>
            <th style={{ width: "150px" }}>To</th>
            <th style={{ width: "150px" }}>Rate</th>
          </tr>
          {(allRates || []).map(quote => {
            return (
                <tr key={quote.id}>
                <td>{quote.firstCurrency}</td>
                <td>{quote.secondCurrency}</td>
                <td>{quote.rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    allRates: state.historic.quotes.allRates
  };
};

export default connect(
  mapStateToProps,
  null
)(HistoricAll);

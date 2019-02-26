import React from "react";
import { NavLink } from "react-router-dom";
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

export default connect(
  state => ({ allRates: state.historic.quotes.allRates }),
  null
)(HistoricAll);

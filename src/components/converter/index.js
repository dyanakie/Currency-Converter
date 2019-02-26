import React, { Component } from "react";
import { connect } from "react-redux";
import doConvert from "../../actions/convert";
import "./converter.css";
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux";
import {
  convertionAmountSelector,
  convertionErrorSelector,
  convertionResultSelector,
  convertionToCurrencyConvertedSelector
} from "../../reducers/convert";

class Converter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromCurrency: "USD",
      toCurrency: "",
      amount: 1
    };
  }

  render() {
    const {
      result,
      amount: responseAmount,
      error,
      toCurrencyConverted,
      doConvert
    } = this.props;
    const { fromCurrency, toCurrency, amount: inputAmount } = this.state;
    return (
      <div>
        <div width="40%">
          <table border="5">
            <tbody>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
              <tr>
                <td>
                  <div className="custom-select" style={{ width: "200px" }}>
                    <select
                      value={fromCurrency}
                      onChange={e =>
                        this.setState({ fromCurrency: e.target.value })
                      }
                    >
                      <option value="0">Select currency:</option>
                      <option value="1">USD</option>
                      <option value="2">EUR</option>
                      <option value="3">BGN</option>
                      <option value="4">GBP</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="custom-select" style={{ width: "200px" }}>
                    <select
                      style={{ display: "inline-block" }}
                      value={toCurrency}
                      onChange={e =>
                        this.setState({ toCurrency: e.target.value })
                      }
                    >
                      <option value="0">Select currency:</option>
                      <option value="EUR">EUR</option>
                      <option value="BGN">BGN</option>
                      <option value="GBP">GBP</option>
                      <option value="AUD">AUD</option>
                      <option value="RUB">RUB</option>
                      <option value="CAD">CAD</option>
                      <option value="PLN">PLN</option>
                      <option value="MXN">MXN</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p>Amount</p>
          <input
            type="text"
            value={inputAmount}
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <hr />

          <button
            onClick={() => doConvert({ props: { toCurrency, inputAmount } })}
          >
            Convert
          </button>
        </div>

        {error ? (
          <div>
            <h4>Error has occured fetching the data from the API</h4>
            <h4>Check the Access Code </h4>
          </div>
        ) : null}

        {result ? (
          <div>
            <p>
              {responseAmount}$ to {toCurrencyConverted}:{" "}
              <b>{result.toFixed(2)}</b>
            </p>
            <p style={{ fontSize: "15px" }}>
              <i>exchange rate date: {getCurrentDate()} </i>
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

const getCurrentDate = () => new Date().toDateString();

export default connect(
  state => ({
    result: convertionResultSelector(state),
    toCurrencyConverted: convertionToCurrencyConvertedSelector(state),
    error: convertionErrorSelector(state),
    amount: convertionAmountSelector(state)
  }),
  dispatch => bindActionCreators({ ...doConvert }, dispatch)
)(Converter);

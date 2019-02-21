import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "../dropdown/index";
import "./converter.css";

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
                      value={this.state.fromCurrency}
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
                      value={this.state.toCurrency}
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
            value={this.state.amount}
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <hr />

          <button
            onClick={() =>
              this.props.onConvertClicked(
                this.state.toCurrency,
                this.state.amount
              )
            }
          >
            Convert
          </button>
        </div>

        {this.props.result ? (
          <div>
            <p>
              {this.state.amount}$ to {this.props.toCurrencyConverted}:{" "}
              <b>{this.props.result.toFixed(2)}</b>
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

const mapStateToProps = state => {
  return {
    result: state.convertion.result,
    toCurrencyConverted: state.convertion.toCurrencyConverted
  };
};

const mapDispatchToProps = dispatch => ({
  onConvertClicked: (toCurrency, amount) =>
    dispatch({
      type: "DO_CONVERT",
      toCurrency: toCurrency,
      amount: amount
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux";
import createHistoricActions from "../../actions/historic";
import {
  historicAllRatesSelector,
  historicDateSelector,
  historicErrorSelector,
  historicMostImpRatesSelector
} from "../../reducers/historic";

class Historic extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      pickedDate: "2019-02-21"
    };
  }

  componentDidUpdate() {
    console.log(this.state.pickedDate);
  }

  render() {
    const { error, responseDate, mostImportantRates, doHistoric } = this.props;
    const { pickedDate } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <p>Pick a date do get historic rates of US dollar</p>
        <hr />
        <input
          value={pickedDate}
          onChange={e => this.setState({ pickedDate: e.target.value })}
          type="date"
          id="datepicker"
        />
        <button
          onClick={() => doHistoric(pickedDate)}
          style={{ marginLeft: "50px" }}
        >
          Submit
        </button>

        {error ? (
          <div>
            <h4>Error has occured fetching the data from the API</h4>
            <h4>Check the Access Code </h4>
          </div>
        ) : null}

        {responseDate ? (
          <div width="40%" style={{ justifyContent: "center" }}>
            <NavLink to="/historic/all">
              <button>show all</button>
            </NavLink>
            <p style={{ fontSize: "15px" }}>
              <i>exchange rate for US dollar on: {pickedDate} </i>
            </p>
            <br />
            <table
              border="5"
              style={{ marginRight: "auto", marginLeft: "auto" }}
            >
              <tbody>
                <tr>
                  <th style={{ width: "150px" }}>From</th>
                  <th style={{ width: "150px" }}>To</th>
                  <th style={{ width: "150px" }}>Rate</th>
                </tr>
                {mostImportantRates.map(quote => {
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
        ) : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    responseDate: historicDateSelector(state),
    allRates: historicAllRatesSelector(state),
    mostImportantRates: historicMostImpRatesSelector(state),
    error: historicErrorSelector(state)
  }),
  dispatch => bindActionCreators({ ...createHistoricActions }, dispatch)
)(Historic);

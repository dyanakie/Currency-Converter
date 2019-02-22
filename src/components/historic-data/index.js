import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { doHistoric } from "../../actions/historic";

class Historic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickedDate: "2019-02-21"
    };
  }

  componentDidUpdate() {
    console.log(this.state.pickedDate);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <p>Pick a date do get historic rates of US dollar</p>
        <hr />
        <input
          value={this.state.pickedDate}
          onChange={e => this.setState({ pickedDate: e.target.value })}
          type="date"
          id="datepicker"
        />
        <button
          onClick={() => this.props.onSubmitClicked(this.state.pickedDate)}
          style={{ marginLeft: "50px" }}
        >
          Submit
        </button>

        {this.props.error ? (
          <div>
            <h4>Error has occured fetching the data from the API</h4>
          </div>
        ) : null}

        {this.props.responseDate ? (
          <div width="40%" style={{ textAlign: "center" }}>
            <NavLink to="/historic/all">
              <button>show all</button>
            </NavLink>
            <p style={{ fontSize: "15px" }}>
              <i>exchange rate for US dollar on: {this.state.pickedDate} </i>
            </p>
            <br />
            <table border="5" style={{ textAlign: "center" }}>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <th style={{ width: "150px" }}>From</th>
                  <th style={{ width: "150px" }}>To</th>
                  <th style={{ width: "150px" }}>Rate</th>
                </tr>
                {this.props.mostImportantRates.map(quote => {
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

const mapStateToProps = state => {
  return {
    responseDate: state.historic.date,
    allRates: state.historic.quotes.allRates,
    mostImportantRates: state.historic.quotes.mostImportantRates,
    error: state.historic.error
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitClicked: date => dispatch(doHistoric(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Historic);

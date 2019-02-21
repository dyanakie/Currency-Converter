import React, { Component } from "react";
import { connect } from "react-redux";

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
      <div>
        <p>Pick a date do get historic information about US dollar</p>
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

        {(this.props.mostImportantRates || []).map(quote => {
          return (
            <div>
              <p>{quote.firstCurrency} / {quote.secondCurrency} ---> {quote.rate} </p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    responseDate: state.historic.date,
    allRates: state.historic.quotes.allRates,
    mostImportantRates: state.historic.quotes.mostImportantRates
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitClicked: (date) =>
    dispatch({
      type: "DO_FETCH_HISTORIC",
      payload: date
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Historic);

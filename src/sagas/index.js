import { takeLatest, put, call } from "redux-saga/effects";
import {
  ACCESS_KEY,
  BASE_URL_LIVE,
  BASE_URL_HISTORICAL,
  DO_CONVERT,
  DO_CONVERT_ASYNC,
  DO_HISTORIC_ASYNC_ERROR,
  DO_HISTORIC,
  DO_HISTORIC_ASYNC,
  DO_CONVERT_ASYNC_ERROR
} from "../constants/index";

function* fetchCalculation(action) {
  console.log(action);
  const toCurrency = action.toCurrency;
  const amount = action.amount;

  try{
  const response = yield call(
    fetch,
    BASE_URL_LIVE +
      "?access_key=" +
      ACCESS_KEY +
      "&currencies=" +
      toCurrency +
      "&source=USD&format=1"
  );
  const json = yield response.json();
  const currencies = Object.keys(json.quotes)[0];
  const toCurrencyFromResponse = currencies.substring(3);
  const quote = json.quotes[currencies];
  yield put({
    type: DO_CONVERT_ASYNC,
    payload: { quote: quote * amount, toCurrency: toCurrencyFromResponse, amount: amount }
  });
  }catch(error){
      console.log(error);
      yield put({
          type: DO_CONVERT_ASYNC_ERROR,
          payload: { error }
      });
  }
}

function* fetchHistoricData(action) {
  console.log(action);
  console.log("sending request");

  const date = action.payload;

  try {
    const response = yield call(
      fetch,
      BASE_URL_HISTORICAL + "?access_key=" + ACCESS_KEY + "&date=" + date
    );
    const json = yield response.json();
    const dateFromResponse = json.date;
    const quotes = json.quotes;

    yield put({
      type: DO_HISTORIC_ASYNC,
      payload: { date: dateFromResponse, quotes, error: null }
    });
  } catch (error) {
      console.log(error);
      yield put({
          type: DO_HISTORIC_ASYNC_ERROR,
          payload: { error }
      });
  }
}

export function* fetchResponseConvert() {
  yield takeLatest(DO_CONVERT, fetchCalculation);
}

export function* fetchResponseHistoricRequest() {
  yield takeLatest(DO_HISTORIC, fetchHistoricData);
}

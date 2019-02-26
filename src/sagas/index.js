import { takeLatest, put, call } from "redux-saga/effects";
import {
  ACCESS_KEY,
  BASE_URL_LIVE,
  BASE_URL_HISTORICAL,
  DO_CONVERT,
  DO_HISTORIC
} from "../constants/index";
import actionsConvertLoaders from "../actions/convert";
import actionsHistoricLoaders from "../actions/historic";

function* fetchCalculation(action) {
  const toCurrency = action.payload.props.toCurrency;
  const amount = action.payload.props.inputAmount;

  try {
    const response = yield call(
      fetch,
      `${BASE_URL_LIVE}?access_key=${ACCESS_KEY}&currencies=${toCurrency}&source=USD&format=1`
    );
    const responseObj = yield response.json();
    const currencies = Object.keys(responseObj.quotes)[0];
    const toCurrencyFromResponse = currencies.substring(3);
    const quote = responseObj.quotes[currencies];
    yield put(
      actionsConvertLoaders.doConvertAsync({
        quote: quote * amount,
        toCurrency: toCurrencyFromResponse,
        amount
      })
    );
  } catch (error) {
    console.log(error);
    yield put(actionsConvertLoaders.doConvertAsyncError({ error }));
  }
}

function* fetchHistoricData(action) {
  const date = action.payload;

  try {
    const response = yield call(
      fetch,
      `${BASE_URL_HISTORICAL}?access_key=${ACCESS_KEY}&date=${date}`
    );
    const responseObj = yield response.json();
    const dateFromResponse = responseObj.date;
    const quotes = responseObj.quotes;
    yield put(
      actionsHistoricLoaders.doHistoricAsync({
        date: dateFromResponse,
        quotes,
        error: null
      })
    );
  } catch (error) {
    console.log(error);
    yield put(actionsHistoricLoaders.doHistoricAsyncError({ error }));
  }
}

export function* fetchResponseConvert() {
  yield takeLatest(DO_CONVERT, fetchCalculation);
}

export function* fetchResponseHistoricRequest() {
  yield takeLatest(DO_HISTORIC, fetchHistoricData);
}

import { takeEvery, takeLatest, put, delay, call } from "redux-saga/effects";

function* fetchCalculation(action) {
    console.log(action);
    const toCurrency = action.toCurrency;
    const amount = action.amount;

    const response = yield call(fetch, "http://apilayer.net/api/live?access_key=0cb1a8e81b12ffc2e8afc66cae48ec4a&currencies="+toCurrency+"&source=USD&format=1");
    const json = yield response.json();
    const quote = json.quotes[Object.keys(json.quotes)[0]]; 
    yield put({ type: "DO_CONVERT_ASYNC", payload: quote*amount });
}

export function* fetchResponseConvert() {
  yield takeEvery("DO_CONVERT", fetchCalculation);
}



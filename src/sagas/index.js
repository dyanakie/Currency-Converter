import { takeEvery, takeLatest, put, delay, call } from "redux-saga/effects";

function* fetchCalculation(action) {
    console.log(action);
    const toCurrency = action.toCurrency;
    const amount = action.amount;

    const response = yield call(fetch, "http://apilayer.net/api/live?access_key=08b6c64ebe90dd768adce5e851a07788&currencies="+toCurrency+"&source=USD&format=1");
    const json = yield response.json();
    console.log(json);
    const quote = json.quotes[Object.keys(json.quotes)[0]]; 
    console.log(json);
    yield put({ type: "DO_CONVERT_ASYNC", payload: quote*amount });
}

export function* fetchResponseConvert() {
  yield takeLatest("DO_CONVERT", fetchCalculation);
}



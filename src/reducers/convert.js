import { doConvertAsync, doConvertAsyncError } from "../actions/convert";
import { createSelector } from "reselect";
import { handleActions } from "redux-actions";

export default handleActions(
  {
    [doConvertAsync]: (state, action) => {
      const { quote } = action.payload || {};
      const toCurrencyConverted = action.payload.toCurrency;
      const { amount } = action.payload;
      const error = null;

      return { result: quote, toCurrencyConverted, error, amount };
    },
    [doConvertAsyncError]: (state, action) => {
      return { error: action.payload.error };
    }
  },
  {}
);

export const convertionSelector = state => state.convertion;
export const convertionResultSelector = createSelector(
  convertionSelector,
  convertion => convertion.result
);
export const convertionToCurrencyConvertedSelector = createSelector(
  convertionSelector,
  convertion => convertion.toCurrencyConverted
);
export const convertionErrorSelector = createSelector(
  convertionSelector,
  convertion => convertion.error
);
export const convertionAmountSelector = createSelector(
  convertionSelector,
  convertion => convertion.amount
);

import { doHistoricAsync, doHistoricAsyncError } from "../actions/historic";
import { createSelector } from "reselect";
import { handleActions } from "redux-actions";

const separateQuotes = quotes => {
  let allRates = [];
  let mostImportantRates = [];
  let idAllRates = 0;
  let idMostImportantRates = 0;

  Object.keys(quotes).forEach(key => {
    const firstCurrency = key.substring(0, 3);
    const secondCurrency = key.substring(3);
    const rate = quotes[key];
    if (
      secondCurrency === "EUR" ||
      secondCurrency === "RUB" ||
      secondCurrency === "GBP" ||
      secondCurrency === "AUD"
    ) {
      mostImportantRates.push({
        id: idMostImportantRates,
        firstCurrency,
        secondCurrency,
        rate
      });
      idMostImportantRates += 1;
    }
    allRates.push({ id: idAllRates, firstCurrency, secondCurrency, rate });
    idAllRates += 1;
  });
  return { allRates, mostImportantRates };
};

export default handleActions(
  {
    [doHistoricAsync]: (state, action) => {
      const { date } = action.payload;
      const { quotes } = action.payload;
      const error = null;

      return { date, quotes: separateQuotes(quotes), error };
    },
    [doHistoricAsyncError]: (state, action) => {
      return {
        error: action.payload.error,
        quotes: { allRates: [], mostImportantRates: [] }
      };
    }
  },
  { quotes: { allRates: [], mostImportantRates: [] } }
);

export const historicSelector = state => state.historic;
export const historicDateSelector = createSelector(
  historicSelector,
  historic => historic.date
);
export const historicAllRatesSelector = createSelector(
  historicSelector,
  historic => historic.quotes.allRates
);
export const historicMostImpRatesSelector = createSelector(
  historicSelector,
  historic => historic.quotes.mostImportantRates
);
export const historicErrorSelector = createSelector(
  historicSelector,
  historic => historic.error
);

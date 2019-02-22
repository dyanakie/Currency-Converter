import { DO_HISTORIC_ASYNC, DO_HISTORIC_ASYNC_ERROR} from '../constants/index'

const tranformQuotesIntoArray = (quotes) => {
    let allRates = [];
    let mostImportantRates = []
    let idAllRates = 0;
    let idMostImportantRates = 0;
   Object.keys(quotes).forEach(key => {
       const firstCurrency = key.substring(0, 3);
       const secondCurrency = key.substring(3);
       const rate = quotes[key];
     if(secondCurrency === 'EUR' || secondCurrency === 'RUB' || secondCurrency === 'GBP' || secondCurrency === 'AUD'){
         mostImportantRates.push({ id: idMostImportantRates, firstCurrency, secondCurrency, rate});
         idMostImportantRates += 1;
     }  
    allRates.push({id: idAllRates,firstCurrency, secondCurrency, rate});
    idAllRates += 1;
   })
   return {allRates, mostImportantRates};
}

export const historicReducer = (state = {quotes: {}}, action) => {

    switch(action.type){

        case DO_HISTORIC_ASYNC:{
         return {date: action.payload.date, quotes: tranformQuotesIntoArray(action.payload.quotes), error: null}
        }

        case DO_HISTORIC_ASYNC_ERROR: {
            return {error: action.payload.error, quotes: {allRates: [], mostImportantRates: []}}
        }

        default: return state;
    }
}
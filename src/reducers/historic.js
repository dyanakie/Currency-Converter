import { DO_HISTORIC_ASYNC} from '../constants/index'

const tranformQuotesIntoArray = (quotes) => {
    let allRates = [];
    let mostImportantRates = []
   Object.keys(quotes).forEach(key => {
       const firstCurrency = key.substring(0, 3);
       const secondCurrency = key.substring(3);
       const rate = quotes[key];
     if(secondCurrency === 'EUR' || secondCurrency === 'RUB' || secondCurrency === 'GBP' || secondCurrency === 'AUD'){
         mostImportantRates.push({ firstCurrency, secondCurrency, rate });
     }  
    allRates.push({firstCurrency, secondCurrency, rate});
   })
   return {allRates, mostImportantRates};
}

export const historicReducer = (state = {quotes: {}}, action) => {

    switch(action.type){

        case DO_HISTORIC_ASYNC:{
         return {date: action.payload.date, quotes: tranformQuotesIntoArray(action.payload.quotes)}
        }

        default: return state;
    }
}
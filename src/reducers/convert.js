import { DO_CONVERT_ASYNC, DO_CONVERT_ASYNC_ERROR} from '../constants/index'


export const convertReducer = (state = {}, action) => {

    switch (action.type) {

        case DO_CONVERT_ASYNC:{
           return {result: action.payload.quote, toCurrencyConverted: action.payload.toCurrency, error: null, amount: action.payload.amount };
        }

        case DO_CONVERT_ASYNC_ERROR: {
            return {error: action.payload.error}
        }

        default: return state;

    }
}
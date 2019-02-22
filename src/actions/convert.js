import {DO_CONVERT} from '../constants/index'

export const doConvert = (toCurrency, amount) => {
    return {
        type: DO_CONVERT,
        toCurrency: toCurrency,
        amount: amount
    }
}
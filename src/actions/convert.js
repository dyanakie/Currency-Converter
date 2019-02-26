import { createActions } from './util'

export const doConvert = 'DO_CONVERT';
export const doConvertAsyncError ='DO_CONVERT_ASYNC_ERROR';
export const doConvertAsync = 'DO_CONVERT_ASYNC'

export default createActions({
    doConvert,
    doConvertAsync,
    doConvertAsyncError
})

import { createActions } from './util'

export const doHistoric = 'DO_HISTORIC';
export const doHistoricAsync = 'DO_HISTORIC_ASYNC';
export const doHistoricAsyncError = 'DO_HISTORIC_ASYNC_ERROR'

export default createActions({
    doHistoric,
    doHistoricAsync,
    doHistoricAsyncError
})
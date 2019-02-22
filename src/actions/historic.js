import { DO_HISTORIC } from '../constants/index'

export const doHistoric = (date) => {
    return {
        type: DO_HISTORIC,
        payload: date
    }
}
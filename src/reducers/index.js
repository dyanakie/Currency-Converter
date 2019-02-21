import { combineReducers } from 'redux';
import { convertReducer } from './convert'


const rootReducer = combineReducers({
   convertion: convertReducer
});

export default rootReducer;
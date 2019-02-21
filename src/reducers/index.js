import { combineReducers } from 'redux';
import { convertReducer } from './convert'
import { historicReducer } from './historic';


const rootReducer = combineReducers({
   convertion: convertReducer,
   historic: historicReducer
});

export default rootReducer;
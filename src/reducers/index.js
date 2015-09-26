import { combineReducers } from 'redux';
import counter from './counter';
import inbox from './inbox';

const rootReducer = combineReducers({
	counter,
	inbox
});

export default rootReducer;

import { combineReducers } from 'redux';
import counter from './counter';
import inbox from './inbox';
import meta from './meta';

const rootReducer = combineReducers({
	counter,
	inbox,
	meta
});

export default rootReducer;

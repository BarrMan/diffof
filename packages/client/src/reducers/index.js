import { combineReducers } from 'redux';

import diffs from './diffsReducer';

const rootReducer = combineReducers({ diffs });

export default rootReducer;

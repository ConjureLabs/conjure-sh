import { combineReducers } from 'redux';
import branchTree from './branchTree';
import resourceListNav from './resourceListNav';

export default combineReducers({
  branchTree,
  resourceListNav
});

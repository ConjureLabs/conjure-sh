import { combineReducers } from 'redux';
import branchTree from './branchTree';
import preparation from './preparation';
import resourceListNav from './resourceListNav';

export default combineReducers({
  branchTree,
  preparation,
  resourceListNav
});

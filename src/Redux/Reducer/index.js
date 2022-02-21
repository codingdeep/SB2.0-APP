import { combineReducers } from 'redux';

import TestReducer from './TestReducer';
import LoggedData from './LogIn';
import StoreDataReducer from './StoreDataReducer';
import GetAllTodayReducer from './GetAllTodayReducer';
import NewTaskReducer from './NewTaskReducer';
import ClientsReducer from './ClientsReducer';
import GetSalesReducer from './GetSalesReducer';
import TimeSheetReducer from './TimeSheetReducer';
import FormulaReducer from './FormulaReducer';
import UpcomingAppoinmentsReducer from './UpcomingAppoinmentsReducer';
import Clock from './ClockReducer';
import PastAppotReducer from './PastAppotReducer';
import MyBookReducer from './MyBookReducer';
import ProfileReducer from './ProfileReducer';
import ServiceAndProductReducer from './ServiceAndProductReducer';

export default combineReducers({
  TestReducer,
  LoggedData,
  StoreDataReducer,
  GetAllTodayReducer,
  NewTaskReducer,
  ClientsReducer,
  GetSalesReducer,
  TimeSheetReducer,
  FormulaReducer,
  UpcomingAppoinmentsReducer,
  Clock,
  PastAppotReducer,
  MyBookReducer,
  ProfileReducer,
  ServiceAndProductReducer
});

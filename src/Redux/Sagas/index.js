import actionType from '../Action/typesOfAction';

import { takeEvery, select, call, put } from 'redux-saga/effects';
import { LogInUserData } from '../SagaActions/extends_login_actions';
import { LogedInUserData } from '../SagaActions/extends_login_actions';
import { StoreData } from '../SagaActions/extends_store_actions';
import { LogedStoreData } from '../SagaActions/extends_store_actions';
import { GetAllTodayData } from '../SagaActions/extends_TodayAllDataAction';
import { AddNewTask, _editTask } from '../SagaActions/extends_TodayAllDataAction';
import { GetAllClients } from '../SagaActions/clients_saga_action';
import { GetSalesData } from '../SagaActions/sales_saga_action';
import { GetPastAppoinments } from '../SagaActions/AppoinmentsSagaAction';
import { BreakOnOff } from '../SagaActions/extends_clock_actions';
import { GetTodayDetailsTime } from '../SagaActions/timeSheet_saga_action';
import {
  StartClock,
  TimeCreator,
  ClockActivator,
  _ForegroundClock,
  GetOpenCardInfo
} from '../SagaActions/extends_clock_actions';
import { GetAllTimeSheetData } from '../SagaActions/timeSheet_saga_action';
import { GetAllFormulaList } from '../SagaActions/formula_saga_action';
import { AddNewFormula, DeleteFormula } from '../SagaActions/formula_saga_action';
import { UpcommingAppoinments } from '../SagaActions/UpcommingAppoinments_action';
import { ChatAllAction } from '../SagaActions/ChatSagasAction';
import { GetBookData } from '../SagaActions/MyBookSagaAction';
import { GetProfileInfo } from '../SagaActions/ProfileSagaAction';
import { PostCheckInNotification } from '../SagaActions/ProfileSagaAction';
import { GetProduct } from '../SagaActions/ServiceAndProductSagaAction';

const rootSaga = function* () {
  yield takeEvery(actionType.LOGINCHECK, LogInUserData);
  yield takeEvery(actionType.AFTERLOGEDINCHECK, LogedInUserData);
  yield takeEvery(actionType.STORECHECK, StoreData);
  yield takeEvery(actionType.LOGEDSTORECHECK, LogedStoreData);
  yield takeEvery(actionType.GETALLTODAYDATA, GetAllTodayData);
  yield takeEvery(actionType.POSTNEWTASK, AddNewTask);
  yield takeEvery(actionType.POSTEDITTASK, _editTask);

  yield takeEvery(actionType.GETALLCLIENTS, GetAllClients);
  yield takeEvery(actionType.GETSALES, GetSalesData);
  yield takeEvery(actionType.STARTCLOCK, StartClock);
  yield takeEvery(actionType.GETTIMESHEETDATA, GetAllTimeSheetData);
  yield takeEvery(actionType.FORMULALIST, GetAllFormulaList);
  yield takeEvery(actionType.UPCOMINGAPPOINMENTS, UpcommingAppoinments);

  //Formula
  yield takeEvery(actionType.ADDFORMULA, AddNewFormula);
  yield takeEvery(actionType.DELETEFORMULA, DeleteFormula);

  yield takeEvery(actionType.BREAKRETURN, TimeCreator);

  yield takeEvery(actionType.CLOCKACTIVITORNOW, ClockActivator);

  yield takeEvery(actionType.GETREALTIMEREFRSH, _ForegroundClock);
  yield takeEvery(actionType.PASTAPPOINMENTS, GetPastAppoinments);
  yield takeEvery(actionType.GETTODAYWORKTIME, GetTodayDetailsTime);
  yield takeEvery(actionType.GETOPENCARDINFO, GetOpenCardInfo);
  yield takeEvery(actionType.BREAKROFFON, BreakOnOff);
  yield takeEvery(actionType.GETBOOKDATA, GetBookData);
  yield takeEvery(actionType.GETPROFILEINFO, GetProfileInfo);
  yield takeEvery(actionType.PUTCLOCKINREMINDER, PostCheckInNotification);
  yield takeEvery(actionType.GETPRODUCT, GetProduct);
  // yield takeEvery(actionType.ABOUTCHAT, ChatAllAction);
};

export default rootSaga;

import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import { call, put } from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Moment from 'moment';
import { Extra_Clock_Action } from './extra_clock';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
const apiPath = BaseApi;

// Post new Task Data

Moment.locale('en-us');
export const _requestToApi = auth =>
  fetch(apiPath + `time-cards?locId=201&type=open`, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${btoa(auth)}`,
    },
  }).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  });


const returnData = (info, time, d93) => {
  let final_res = {
    startBreak: info == 'start' ? time : d93,
    endBreak: info == 'end' ? time : d93,
  };

  return final_res;
};

const TimeChecker = async info => {
  const DaTaNow = await AsyncStorage.getItem('Break_Time_Data');

  const DaTa = JSON.parse(DaTaNow);

  let time = moment(new Date()).format('hh:mm a');

  let result = [];

  if (DaTa == null) {
    let final_res = {
      startBreak: info == 'start' ? time : '',
      endBreak: info == 'end' ? time : '',
    };
    result.push(final_res);
  } else {
    if (DaTa.length == 0) {
      let final_res = {
        startBreak: info == 'start' ? time : '',
        endBreak: info == 'end' ? time : '',
      };
      result.push(final_res);
    } else {
      result = DaTa;

      if (result.length == 2) {
        if (
          result[result.length - 1].startBreak !== '' &&
          result[result.length - 1].endBreak !== ''
        ) {
          return [true, result];
        } else {
          if (info == 'end') {
            if (result[result.length - 1].endBreak == '') {
              result[result.length - 1].endBreak = time;
            } else {
              result.push(
                returnData(info, time, result[result.length - 1].startBreak),
              );
            }
          } else {
            if (result[result.length - 1].endBreak == '') {
              result[result.length - 1].startBreak = time;
            } else {
              result.push(
                returnData(info, time, result[result.length - 1].endBreak),
              );
            }
          }
        }
      } else {
        if (info == 'end') {
          if (result[result.length - 1].endBreak == '') {
            result[result.length - 1].endBreak = time;
          } else {
            result.push(
              returnData(info, time, result[result.length - 1].startBreak),
            );
          }
        } else {
          if (result[result.length - 1].endBreak == '') {
            result[result.length - 1].startBreak = time;
          } else {
            result.push(
              returnData(info, time, result[result.length - 1].endBreak),
            );
          }
        }
      }
    }
  }

  if (result) {
    const DataUpdate = await AsyncStorage.setItem(
      'Break_Time_Data',
      JSON.stringify(result),
    );

    return [false, result];
  }
};

export const TimeCreator = function* (action) {
  try {
    const _TimeChecker = yield call(TimeChecker, action.info);

    all_break_data = _TimeChecker[1];

    yield put({
      type: actionType.CLOCKUPDATED,
      breakHistory: all_break_data,
      breakButtom: _TimeChecker[0],
    });
  } catch (error) {
    console.log('error path : ', error);
    yield put({
      type: actionType.GETALLTODAYERROR,
      errorMsg: error,
    });
  }
};

// For Start && End Clock

export const ClockActivator = function* (action) {
  try {
    const Real_Time = yield call(Extra_Clock_Action, action);

    console.log('Real_Time', Real_Time);

    if (Real_Time[0] == true) {
      yield put({
        type: actionType.CLOCKREALTIMEDATA,
        start_time: Real_Time[1][0].start_time,
        end_time: Real_Time[1][0].end_time,
        sec: Real_Time[1][0].sec,
        min: Real_Time[1][0].min,
        hour: Real_Time[1][0].hour,
        pause_time: Real_Time[1][0].pause_time,
        clock_action: Real_Time[1][0].clock_action,
        status: action.start == false ? 'inactive' : 'active',
      });
    }
  } catch (error) {
    console.log('error path : ', error);
    yield put({
      type: actionType.GETALLTODAYERROR,
      errorMsg: error,
    });
  }
};

const GETDBDATA = async () => {
  let DaTaNow = await AsyncStorage.getItem('Clock_Time_Data');

  return DaTaNow;
};

export const _ForegroundClock = function* (action) {
  try {
    const Real_Time = yield call(GETDBDATA);

    let DaTa = JSON.parse(Real_Time);

    if (DaTa == null || DaTa.length == 0) {
      console.log('DaTa today def', DaTa);
      yield put({
        type: actionType.GETREALTIMEREFRSHFINAL,
        start_time: '',
        end_time: '',
        sec: '00',
        min: '00',
        hour: '00',
        pause_time: '',
        status: 'inactive',
        clock_action: 0,
      });
    } else {
      let toDay = moment(new Date()).format('YYYY-MM-DD');

      if (DaTa[0].daTe == toDay) {
        console.log('DaTa today', DaTa);

        let Time_Pause = moment(new Date()).format('hh:mm');

        var start = moment.duration(DaTa[0].pause_time, 'HH:mm');
        var end = moment.duration(Time_Pause, 'HH:mm');
        var diff = end.subtract(start);
        let HOUR = diff.hours(); // return hours
        let MIN = diff.minutes(); // return minutes

        let Final_Hour = (parseInt(DaTa[0].hour) + parseInt(HOUR)).toString();

        let Final_min = (parseInt(DaTa[0].min) + parseInt(MIN)).toString();

        yield put({
          type: actionType.GETREALTIMEREFRSHFINAL,
          start_time: DaTa[0].start_time,
          end_time: DaTa[0].end_time,
          sec: DaTa[0].sec,
          min: Final_min.length == 1 ? '0' + Final_min : Final_min,
          hour: Final_Hour.length == 1 ? '0' + Final_Hour : Final_Hour,
          pause_time: DaTa[0].pause_time,
          status: DaTa[0].status,
          clock_action: DaTa[0].clock_action,
        });
      } else {
        console.log('DaTa today not', DaTa);
        yield put({
          type: actionType.GETREALTIMEREFRSHFINAL,
          start_time: '',
          end_time: '',
          sec: '00',
          min: '00',
          hour: '00',
          pause_time: '',
          status: 'inactive',
          clock_action: 1,
        });
      }
    }
  } catch (error) {
    console.log('error path : ', error);
    yield put({
      type: actionType.GETALLTODAYERROR,
      errorMsg: error,
    });
  }
};

export const _breakOnOffApi = async (action) => {
  console.log("mmmmmmmm", action)
  const AuthHeader = await authHeader();
  let breakId = action.breakId

  // CardIsOpen ==== true == post
  const body = {

    card: {
      id: breakId == "" ? action.CardId : null
    },

    startAddress: {
      latitude: breakId == "" ? action.latitude : 0.0,
      longitude: breakId == "" ? action.longitude : 0.0,
    },
    endAddress: {
      latitude: !breakId == "" ? action.latitude : 0.0,
      longitude: !breakId == "" ? action.longitude : 0.0,
    }

  };
  const requestOptions = {
    method: breakId == "" ? 'POST' : 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };

  try {
    if (breakId == "") {
      // https://bianca-val0.cfapps.io/time-card-breaks
      return fetch(apiPath + 'time-card-breaks', requestOptions).then(response => {
        if (response.status == 401 || response.status == 403) {
          AsyncStorage.clear();
          RNRestart.Restart();
        } else return response.json()

      }).catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      });
    } else {
      // https://bianca-val0.cfapps.io/time-card-breaks/1019

      return fetch(apiPath + 'time-card-breaks/' + breakId, requestOptions).then(response => {
        if (response.status == 401 || response.status == 403) {
          AsyncStorage.clear();
          RNRestart.Restart();
        } else return response.json()

      }).catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      });
    }
  } catch (error) {
    console.log("OOOOOO", error)
  }


};



export const BreakOnOff = function* (action) {
  try {
    const breakPostId = "";
    const breakOnOffApi = yield call(_breakOnOffApi, action);
    // const getOpenCardInfo = yield call(_getOpenCardInfo, action.locationId);
    console.log("breakOnOffApi", breakOnOffApi)


    if (breakOnOffApi != null) {
      // if (breakOnOffApi.hasOwnProperty("period")) {

      //   if (!breakOnOffApi.period.hasOwnProperty("to")) {
      //     console.log('breakPostId has', breakOnOffApi);
      //     breakPostId = breakOnOffApi.id
      //   }
      // }
      // console.log('breakPostId', breakPostId);
      yield put({
        type: actionType.BREAKROFFONRESULT,
        // CheckIn: getOpenCardInfo,

        // CardIsOpen: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? true : false,
        // CardId: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? "" : getOpenCardInfo[0].id,


        // breakPostId: breakPostId
        breakCheck: true
      });
    }

  } catch (error) {
    yield put({
      type: actionType.BREAKROFFONERROR,
      errorMsg: error,
    });
  }
};


export const _startClockApI = async (CardIsOpen, action) => {
  const AuthHeader = await authHeader();
  let CardId = action.CardId

  // CardIsOpen ==== true == post
  const body = {
    technician: {
      location: action.locationId,
    },
    startAddress: {
      latitude: CardIsOpen ? action.latitude : 0.0,
      longitude: CardIsOpen ? action.longitude : 0.0,
    },
    endAddress: {
      latitude: !CardIsOpen ? action.latitude : 0.0,
      longitude: !CardIsOpen ? action.longitude : 0.0,
    }

  };
  const requestOptions = {
    method: CardIsOpen ? 'POST' : 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };

  try {
    if (CardIsOpen) {
      // https://bianca-val0.cfapps.io/time-cards
      return fetch(apiPath + 'time-cards', requestOptions).then(response => {
        if (response.status == 401 || response.status == 403) {
          AsyncStorage.clear();
          RNRestart.Restart();
        } else return response.json()

      }).catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      });
    } else if (!CardIsOpen) {
      // https://bianca-val0.cfapps.io/time-cards/1076

      return fetch(apiPath + 'time-cards/' + CardId, requestOptions).then(response => {
        if (response.status == 401 || response.status == 403) {
          AsyncStorage.clear();
          RNRestart.Restart();
        } else return response.json()

      }).catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      })
    }
  } catch (error) {
    console.log("OOOOOO", error)
  }


};
export const _getOpenCardInfo = async locationId => {
  console.log("_getOpenCardInfo")
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include'
  }
  var queryParams = "time-cards?locId=" + locationId + "&type=open";
  // https://bianca-val0.cfapps.io/time-cards?locId=201&type=open
  return fetch(apiPath +
    queryParams, requestOptions).then((response) => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    });
}
export const _stopWatchStartTime = async getOpenCardInfo => {

  // Moment.locale('en-us');

  if (!Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length) {
    return 0
  } else {
    // 2020-02-11T15:53:58
    let checkOutTime = Moment(new Date()).format('YYYY-MM-DDTHH:mm:ss')

    let checkInTime = Moment(getOpenCardInfo[0].period.from).format('YYYY-MM-DDTHH:mm:ss');


    let totalWorkTime = Moment(checkOutTime, "YYYY MM DD HH:mm:ss").diff(Moment(checkInTime, "YYYY MM DD  HH:mm:ss"))
    totalWorkTime = Moment.duration(totalWorkTime).asMilliseconds()
    console.log("_stopWatchStartTimeElse", totalWorkTime, "getOpenCardInfo", getOpenCardInfo)

    return totalWorkTime;

  }

}

export const _getBreakId = async getOpenCardInfo => {

  console.log("_getBreakId")
  let breakId = "";
  if (getOpenCardInfo != null && getOpenCardInfo.length > 0) {
    if (Array.isArray(getOpenCardInfo) || getOpenCardInfo.length) {

      if (getOpenCardInfo[0].hasOwnProperty("breaks")) {

        let breakData = getOpenCardInfo[0].breaks
        if (breakData.length > 0) {
          let lastIndex = breakData.length - 1

          console.log("breakData", breakData)
          if (breakData[lastIndex].hasOwnProperty("period")) {
            breakId = !breakData[lastIndex].period.hasOwnProperty("to") ? breakData[lastIndex].id : ""

          }
        }
      }
    }
  }


  return breakId;
}


export const StartClock = function* (action) {
  try {

    const StartClockApI = yield call(_startClockApI, action.CardIsOpen, action);
    let getOpenCardInfo = yield call(_getOpenCardInfo, action.locationId, action);
    const stopWatchStartTime = yield call(_stopWatchStartTime, getOpenCardInfo)
    if (getOpenCardInfo != null) {
      console.log('getOpenCardInfo', getOpenCardInfo);
      yield put({
        type: actionType.CHECKINOUTRESULT,
        // CheckIn: getOpenCardInfo,

        // CardIsOpen: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? true : false,
        // // ShowStopWatch: true,
        // CardId: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? "" : getOpenCardInfo[0].id,

        // ShowStopWatch: true,
        // StopWatchStartTime: stopWatchStartTime,
        breakCheck: true

      });
    }
  } catch (error) {
    yield put({
      type: actionType.GETALLTODAYERROR,
      errorMsg: error,
    });
  }
};



export const GetOpenCardInfo = function* (action) {
  // console.log("GetOpenCardInfo", action)
  try {
    const getOpenCardInfo = yield call(_getOpenCardInfo, action.locationId)
    const stopWatchStartTime = yield call(_stopWatchStartTime, getOpenCardInfo)
    // const breakId = "";

    console.log("stopWatchStartTime2222", getOpenCardInfo)
    if (getOpenCardInfo != null) {
      const breakId = yield call(_getBreakId, getOpenCardInfo)


      yield put({
        type: actionType.GETOPENCARDINFORESULT,
        CheckIn: getOpenCardInfo,

        CardIsOpen: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? true : false,

        CardId: !Array.isArray(getOpenCardInfo) || !getOpenCardInfo.length ? "" : getOpenCardInfo[0].id,

        ShowStopWatch: true,
        StopWatchStartTime: stopWatchStartTime,
        breakId: breakId

      });
    }
  } catch (error) {
    yield put({
      type: actionType.GETOPENCARDINFOERROR,
      errorMsg: error,
    });
  }
}
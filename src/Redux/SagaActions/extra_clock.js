import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import RNRestart from 'react-native-restart';

export const Extra_Clock_Action = async _action => {
  return GetSetTimer(_action);
};

const GetSetTimer = async action => {
  try {
    const DaTaNow = await AsyncStorage.getItem('Clock_Time_Data');
    const DaTa = JSON.parse(DaTaNow);
    let time = moment(new Date()).format('hh:mm a');
    let daTe = moment(new Date()).format('YYYY-MM-DD');
    let result = [];
    if (DaTa == null || DaTa.length == 0) {
      let final_result = {
        start_time: time,
        end_time: '',
        daTe: daTe,
        sec: action.sec,
        min: action.min,
        hour: action.hour,
        status: 'active',
        pause_time: '',
        clock_action: 0,
      };
      result.push(final_result);
    } else {
      if (DaTa[DaTa.length - 1].daTe == daTe) {
        // same date to end data
        let final_result = {
          start_time: DaTa[DaTa.length - 1].start_time,
          end_time: action.start == false ? time : '',
          daTe: daTe,
          sec: action.sec,
          min: action.min,
          hour: action.hour,
          status: action.start == false ? 'inactive' : 'active',
          pause_time: '',
          clock_action: action.start == false ? 2 : 1,
        };
        result.push(final_result);
      } else {
        // not same date new date
        let final_result = {
          start_time: time,
          end_time: action.start == false ? time : '',
          daTe: daTe,
          sec: action.sec,
          min: action.min,
          hour: action.hour,
          status: action.start == false ? 'inactive' : 'active',
          pause_time: '',
          clock_action: action.start == false ? 2 : 1,
        };
        result.push(final_result);
      }
    }

    const Save_Clock_DB = await AsyncStorage.setItem(
      'Clock_Time_Data',
      JSON.stringify(result),
    ).then(() => {
      return true;
    });

    return [Save_Clock_DB, result];
  } catch (error) {
    console.log('error is ', error);
  }
};





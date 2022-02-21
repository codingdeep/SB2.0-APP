import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export const _Start_Clock_Now = async () => {
  let DaTaNow = await AsyncStorage.getItem('Clock_Time_Data');

  let DaTa = JSON.parse(DaTaNow);

  console.log(DaTa);

  //   let Time_Pause = moment(new Date()).format('hh:mm');

  //   let result = [];
  //   let final_result = {
  //     start_time: DaTa[DaTa.length - 1].start_time,
  //     end_time: DaTa[DaTa.length - 1].end_time,
  //     daTe: DaTa[DaTa.length - 1].daTe,
  //     sec: this.state.seconds_Counter,
  //     min: this.state.minutes_Counter,
  //     hour: this.state.Hour_Counter,
  //     status: DaTa[DaTa.length - 1].status,
  //     pause_time: Time_Pause,
  //   };
  //result.push(final_result);
  // Do something here on app background.

  //   if (this.state.Timeron == true && this.state.BreakON == true) {
  //     const Save_Clock_DB = await AsyncStorage.setItem(
  //       'Clock_Time_Data',
  //       JSON.stringify(result),
  //     );
  //   }
};

import actionType from '../Action/typesOfAction';

const initialState = {
  breakHistory: [],
  breakButtom: false,
  errorMsg: '',
  // minutes_Counter: '00',
  // seconds_Counter: '00',
  // Hour_Counter: '00',
  // clock_action: 0,

  CheckInInfo: [],
  ShowStopWatch: false,
  CardIsOpen: false,
  CardId: "",
  StopWatchStartTime: null,
  breakId: "",
  breakPostId: "",
  breakCheck: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.CLOCKUPDATED:
      return {
        ...state,
        breakHistory: action.breakHistory,
        breakButtom: action.breakButtom,
        minutes_Counter: '00',
        seconds_Counter: '00',
        Hour_Counter: '00',
      }
    case actionType.CLOCKREALTIMEDATA:
      return {
        ...state,
        start_time: action.start_time,
        end_time: action.end_time,
        seconds_Counter: action.sec,
        minutes_Counter: action.min,
        Hour_Counter: action.hour,
        pause_time: action.pause_time,
        clock_action: action.clock_action,
        status: action.status,
      };
    case actionType.GETREALTIMEREFRSHFINAL:
      return {
        ...state,
        start_time: action.start_time,
        end_time: action.end_time,
        seconds_Counter: '00',
        minutes_Counter: action.min,
        Hour_Counter: action.hour,
        pause_time: action.pause_time,
        loading: false,
        status: action.status,
        clock_action: action.clock_action,
      };




    case actionType.GETOPENCARDINFORESULT:
      return {
        ...state,
        CheckInInfo: action.CheckIn,
        ShowStopWatch: action.ShowStopWatch,
        CardIsOpen: action.CardIsOpen,
        CardId: action.CardId,
        StopWatchStartTime: action.StopWatchStartTime,
        breakId: action.breakId,
        breakCheck: false
      }
    case actionType.GETOPENCARDINFO:
      return {
        ...state,

      }
    case actionType.GETOPENCARDINFOERROR:
      return {
        ...state,

      }
    case actionType.CHECKINOUTRESULT:
      return {
        ...state,

        breakCheck: action.breakCheck
      }

    case actionType.BREAKROFFONRESULT:
      return {
        ...state,
        // CheckInInfo: action.CheckIn,
        // ShowStopWatch: action.ShowStopWatch,
        // CardIsOpen: action.CardIsOpen,
        // CardId: action.CardId,
        // StopWatchStartTime: action.StopWatchStartTime,
        // breakPostId: action.breakPostId
        breakCheck: action.breakCheck
      }
    case actionType.BREAKROFFONERROR:
      return {
        ...state,

      }

    default:
      return state;
  }
};

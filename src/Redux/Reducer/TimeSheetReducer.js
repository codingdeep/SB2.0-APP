import actionType from '../Action/typesOfAction';

const initialState = {
  TimeSheetData: {},
  WeekWiseData: {},
  TimeSheetLoader: false,
  errorMsg: "",
  StartEndDate: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETTIMESHEETDATARESULT:
      return {
        ...state,
        TimeSheetData: action.TimeSheetData,
        WeekWiseData: action.WeekWiseData,
        TimeSheetLoader: true,
        StartEndDate: action.StartEndDate
      };
    case actionType.GETTIMESHEETDATA:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.GETTIMESHEETDATAERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        TimeSheetLoader: false,
      };
    default:
      return state;
  }
};

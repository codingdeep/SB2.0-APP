import actionType from '../Action/typesOfAction';

const initialState = {
  GetSalesData: [],
  SalesLoader: false,
  errorMsg: "",
  DayWiseData: {},
  DayPriceMount: "",
  WeekWiseData: {},
  StartEndDate: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETSALESRESULT:
      return {
        ...state,
        GetSalesData: action.SalesData,
        DayWiseData: action.DayWiseData,
        DayPriceMount: action.DayPriceMount,
        WeekWiseData: action.WeekWiseData,
        SalesLoader: action.SalesLoader,

        StartEndDate: action.StartEndDate

      };
    case actionType.GETSALES:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.GETSALESERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        SalesLoader: false,
      };
    default:
      return state;
  }
};

import actionType from '../Action/typesOfAction';

const initialState = {
  AllTasksData: [],
  AllSalesData: [],
  AllActivitiesData: [],
  TodayLoader: false,
  errorMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETALLTODAYDATARESULT:
      let data = {
        ...state,
        TodayLoader: true,
      };
      if (action.allTasksData) {
        data.AllTasksData = action.allTasksData;
      }
      if (action.allSalesData) {
        data.AllSalesData = action.allSalesData;
      }
      if (action.allActivitiesData) {
        data.AllActivitiesData = action.allActivitiesData;
      }
      return data;
    case actionType.GETALLTODAYDATA:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.GETALLTODAYERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        TodayLoader: false,
      };
    default:
      return state;
  }
};

import actionType from '../Action/typesOfAction';

const initialState = {
  AllUpcomingAppoinmentsData: [],
  errorMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
      case actionType.UPCOMINGAPPOINMENTSRESULT:
        return {
          ...state,
          AllUpcomingAppoinmentsData: action.allUpcomingData,
        };
      case actionType.UPCOMINGAPPOINMENTS:
        return {
          ...state,
          errorMsg: '',
        };
      case actionType.UPCOMINGAPPOINMENTSERROR:
        return {
          ...state,
          errorMsg: action.errorMsg,
          TimeSheetLoader : false,
        };
      default:
        return state;
  }
};

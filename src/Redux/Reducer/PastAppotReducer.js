import actionType from '../Action/typesOfAction';

const initialState = {
  AllPastAppoinmentsData: [],
  errorMsg: '',
  PastAppotLoader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.PASTAPPOINMENTSRESULT:
      return {
        ...state,
        AllPastAppoinmentsData: action.allPastAppot,
        PastAppotLoader: true,
      };
    case actionType.PASTAPPOINMENTS:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.PASTAPPOINMENTSERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        PastAppotLoader: false,
      };
    default:
      return state;
  }
};

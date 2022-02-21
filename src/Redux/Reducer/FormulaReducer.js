import actionType from '../Action/typesOfAction';


const initialState = {
  FormulaListData: [],
  formulaListLoader: false,
  ClientInfo: "",
  errorMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FORMULALISTRESULT:
      return {
        ...state,
        FormulaListData: action.GetAllFormulaList,
        formulaListLoader: true,
        ClientInfo : action.ClientInfo
      };
      case actionType.FORMULALIST:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.FORMULALIST:
      return {
        ...state,
        errorMsg: action.errorMsg,
        formulaListLoader : false,
      };
    default:
      return state;
  }
};

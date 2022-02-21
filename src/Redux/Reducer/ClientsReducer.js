import actionType from '../Action/typesOfAction';

const initialState = {
    AllClientsData: [] ,
    ClientsLoader : false,
    errorMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.GETALLCLIENTSRESULT:
      return {
        ...state,
        AllClientsData: action.allClientsData,
        ClientsLoader : true,
      };
    case actionType.GETALLCLIENTS:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.GETALLCLIENTSERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        ClientsLoader : false,
      };
    default:
      return state;
  }
};

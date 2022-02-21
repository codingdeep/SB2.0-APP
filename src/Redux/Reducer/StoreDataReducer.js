import actionType from '../Action/typesOfAction';

const initialState = {
    StoreAllData: [] ,
    storeLoader: false,
    errorMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.STORERESULT:

      return {
        ...state,
        StoreAllData: action.allStoreData,
        StoreLocationInfo: action.salonLocatioInfo,
        storeLoader: true
      };
    case actionType.STORECHECK:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.STOREERROR:
      return {
        ...state,
        storeLoader: false,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

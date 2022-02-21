import {
    TESTDATACOUNT
  } from "../Action/typesOfAction";
  
  const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    test: ""
  };
  
  export default function TestReducer(state = initialState, action) {
    switch (action.type) {
      case TESTDATACOUNT:
        return {
          ...state,
          isFetching: false,
          data: "",
          };
     
      default:
        return state;
    }
  }
  
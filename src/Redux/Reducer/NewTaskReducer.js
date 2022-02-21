import actionType from '../Action/typesOfAction';

const initialState = {
    NewTaskData: [] ,
    newTaskSuccess: '',
    errorMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.POSTNEWTASKRESULT:
      return {
        ...state,
        NewTaskData: action.newTask,
        newTaskSuccess: action.newTaskSuccess,
      };
    case actionType.POSTNEWTASK:
      return {
        ...state,
        errorMsg: '',
      };
    case actionType.POSTNEWTASKERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

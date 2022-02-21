import actionType from '../Action/typesOfAction';

const initialState = {
    ProfileData: {},
    ProfileLoader: false,
    errorMsg: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GETPROFILEINFORESULT:
            return {
                ...state,
                ProfileData: action.ProfileData,
                ProfileLoader: true,
            };
        case actionType.GETPROFILEINFO:
            return {
                ...state,
                errorMsg: '',
            };
        case actionType.GETPROFILEINFOERROR:
            return {
                ...state,
                errorMsg: action.errorMsg,
                ProfileLoader: false,
            };
        default:
            return state;
    }
};

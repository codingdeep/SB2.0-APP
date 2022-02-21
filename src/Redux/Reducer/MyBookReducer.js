/* eslint-disable */

import actionType from '../Action/typesOfAction';

const initialState = {
    GetBookData: [],
    BookLoader: false,
    errorMsg: "",

};

export default (state = initialState, action) => {

    switch (action.type) {
        case actionType.GETBOOKDATARESULT:

            return {
                ...state,
                GetBookData: action.BookData,
                BookLoader: action.BookLoader,
            };
        case actionType.GETBOOKDATA:
            return {
                ...state,
                errorMsg: '',
            };
        case actionType.GETBOOKDATAERROR:
            return {
                ...state,
                errorMsg: action.errorMsg,
                BookLoader: false,
            };
        default:
            return state;
    }
};

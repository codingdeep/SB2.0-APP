import actionType from '../Action/typesOfAction';

const initialState = {
    ProductData: [],
    formatedProductData: [],
    ProdoctLoader: false,
    errorMsg: "",

};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GETPRODUCTRESULT:
            return {
                ...state,
                ProductData: action.ProductData,
                formatedProductData: action.formatedProductData,
                ProdoctLoader: true,
            };
        case actionType.GETPRODUCT:
            return {
                ...state,
                errorMsg: '',
            };
        case actionType.GETPRODUCTERROR:
            return {
                ...state,
                errorMsg: action.errorMsg,
                ProdoctLoader: false,
            };
        default:
            return state;
    }
};

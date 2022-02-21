import AsyncStorage from '@react-native-community/async-storage';
import { call, put } from 'redux-saga/effects';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi;

export const _requestForProduct = async locaionId => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // https://bianca-val0.cfapps.io/inventory?locId=201&page=0&pageCount=20
  var queryParams = 'inventory?locId=' + locaionId + '&page=0&pageCount=1000';
  try {
    return fetch(apiPath + queryParams, requestOptions).then(response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }
    ).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    })
  } catch (error) {
    return error;
  }
};
export const _requestSearchProduct = async (locaionId, searchVal) => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // https://bianca-val0.cfapps.io/inventory?locId=201&page=0&pageCount=20
  //bianca-val0.cfapps.io/inventory?locId=201&searchVal=curly&page=0&pageCount=5
  https: var queryParams =
    'inventory?locId=' +
    locaionId +
    '&searchVal=' +
    searchVal +
    '&page=0&pageCount=5';
  try {
    return fetch(apiPath + queryParams, requestOptions).then(response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }
    ).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    })
  } catch (error) {
    return error;
  }
};
export const _requestSearchProductById = async (id) => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  //https://bianca-val0.cfapps.io/inventory/variant/3495
  // https://bianca-val0.cfapps.io/inventory?locId=201&page=0&pageCount=20
  //bianca-val0.cfapps.io/inventory?locId=201&searchVal=curly&page=0&pageCount=5

  try {
    return fetch(apiPath + 'inventory/variant/' + id, requestOptions).then(response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }
    ).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    })
  } catch (error) {
    return error;
  }
};
export const _requestSearchService = async (locaionId, searchVal) => {

  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };

  //bianca-val0.cfapps.io/location-services?locId=201&page=0&pageCount=9&searchVal=women
  https: var queryParams =
    'location-services?locId=' +
    locaionId +
    '&searchVal=' +
    searchVal +
    '&page=0&pageCount=5';

  try {
    return fetch(apiPath + queryParams, requestOptions).then(response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }
    ).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    })
  } catch (error) {
    console.log('asdfasdfsdfasdf', error);

    return error;
  }
};
export const _requestSingleService = async id => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };

  //bianca-val0.cfapps.io/location-services/202
  https: var queryParams = 'location-services/' + id;
  try {
    return fetch(apiPath + queryParams, requestOptions).then(response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else return response.json()
    }
    ).catch((error) => {
      if (error.message === 'Timeout' || error.message === 'Network request failed') {
        return Promise.reject(error.message);
      } else {
        console.log("dfaddasdfadsf", error);
        throw error;
      }

    })
  } catch (error) {
    console.log('asdfasdfsdfasdf', error);

    return error;
  }
};

const setProductItem = async ProductData => {
  let formatedProductData = [];
  formatedProductData = await ProductData.map(item =>
    FormatedProduct(
      item.id,
      item.variant.product.name,
      item.salePrice,
      item.quantity,
    ),
  );
  return formatedProductData;
};
const FormatedProduct = (id, name, salePrice, quantity) => {
  return {
    id,
    name,
    salePrice,
    quantity,
  };
};

export const GetProduct = function* (action) {
  try {
    const requestForProduct = yield call(_requestForProduct, action.locaionId);
    const formatedProductData = yield call(setProductItem, requestForProduct);
    if (requestForProduct != null) {
      yield put({
        type: actionType.GETPRODUCTRESULT,
        ProductData: requestForProduct,
        formatedProductData: formatedProductData,
      });
    }
  } catch (error) {
    console.log('error is', error);
    yield put({
      type: actionType.GETPRODUCTERROR,
      errorMsg: error,
    });
  }
};

export const GetSearchProduct = async (
  locationId,
  searchVal,
  response,
  error,
) => {
  try {
    const requestSearchProduct = await _requestSearchProduct(
      locationId,
      searchVal,
    );
    console.log('requestSearchProduct', requestSearchProduct);
    if (requestSearchProduct != null) {
      const formatedProductData = await setProductItem(requestSearchProduct);
      response(formatedProductData);
    } else {
      response.json().then(err => error(err));
    }
  } catch (error) { }
};
export const GetSearchService = async (
  locationId,
  searchVal,
  response,
  error,
) => {
  try {
    const requestSearchService = await _requestSearchService(
      locationId,
      searchVal,
    );
    console.log('requestSearchService', requestSearchService);
    if (requestSearchService != null) {
      response(requestSearchService);
    } else {
      response.json().then(err => error(err));
    }
  } catch (error) { }
};
export const GetSingleService = async (id, response, error) => {
  try {
    const requestSingleService = await _requestSingleService(id);
    console.log('requestSingleService', requestSingleService);
    if (requestSingleService != null) {
      response(requestSingleService);
    } else {
      response.json().then(err => error(err));
    }
  } catch (error) { }
};

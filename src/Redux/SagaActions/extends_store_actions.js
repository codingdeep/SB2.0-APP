import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import actionType from '../Action/typesOfAction';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi;


export const _requestToApi = businessId =>

  fetch(apiPath + "businesses/" + businessId, {
    method: 'GET',
  }).then((response) => {
    if (response.status == 401 || response.status == 403) {
      AsyncStorage.clear();
      RNRestart.Restart();
    } else return response.json()
  }).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  });

export const StoreData = function* (action) {
  try {
    console.log("1112212121212");

    // action.nav.navigate('SELECTLOCATION');
    const requestDataApi = yield call(_requestToApi, action.BusinessId);

    if (requestDataApi != null) {
      yield put({
        type: actionType.STORERESULT,
        allStoreData: requestDataApi,
        salonLocatioInfo: requestDataApi.locations

      });


    }
  } catch (error) {
    yield put({
      type: actionType.STOREERROR,
      errorMsg: error,
    });
  }
};

export const LogedStoreData = function* (action) {
  try {

    // action.nav.navigate('SELECTLOCATION');
    // const requestDataApi = yield call(_requestToApi, action.BusinessId);
    let requestDataApi = action.StoreData

    if (requestDataApi != null) {
      yield put({
        type: actionType.STORERESULT,
        allStoreData: requestDataApi,
        salonLocatioInfo: requestDataApi.locations

      });


    }
  } catch (error) {
    yield put({
      type: actionType.STOREERROR,
      errorMsg: error,
    });
  }
};

export const LogedInStoreData = async (businessId, success, error) => {
  console.log("aafasfasfdasfasadsfasf");

  let StoreData = await _requestToApi(businessId);
  if (StoreData && StoreData != null) {
    success(StoreData)
    await AsyncStorage.setItem(
      'StoreData',
      JSON.stringify(StoreData))

  }
  console.log("FFFFFFF", StoreData);

}

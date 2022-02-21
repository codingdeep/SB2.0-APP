/* eslint-disable */

import AsyncStorage from '@react-native-community/async-storage';
import { call, put } from 'redux-saga/effects';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import { BaseApi } from '../../components/ImportantFunction/baseApi'

const apiPath = BaseApi;

export const _requestToPasrAppoApi = async (locationId, cliendId) => {

  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };

  var queryParams = 'visits?locId=' + locationId + '&userId=' + cliendId + '&type=user-past';
  console.log(queryParams)

  try {
    return fetch(apiPath + queryParams, requestOptions).then(
      response => {

        return response.json()
      }
    )
      .catch((error) => {
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




export const GetPastAppoinments = function* (action) {

  const userId = action.id
  try {
    const requestDataApi = yield call(
      _requestToPasrAppoApi,
      action.locationId, userId
    );
    console.log("actionaction", requestDataApi)

    if (requestDataApi != null) {
      yield put({
        type: actionType.PASTAPPOINMENTSRESULT,
        allPastAppot: requestDataApi,
      });
    }
  } catch (error) {
    console.log('error is', error);
    yield put({
      type: actionType.PASTAPPOINMENTSERROR,
      // allUpcomingData: requestDataApi,
      errorMsg: error
    });
  }
};



export const GetSearchClient = async (businessId, searchVal) => {
  const AuthHeader = await authHeader();
  console.log("response", searchVal)
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  https://bianca-val0.cfapps.io/users?type=all&businessId=3&page=0&pageCount=9&searchVal=sam
  var queryParams = 'users?type=all&businessId=' + businessId + '&page=0&pageCount=5&searchVal=' + searchVal;
  console.log("apiPath", apiPath + queryParams)
  try {
    return fetch(apiPath + queryParams, requestOptions)
      .then(
        response => response.json()
      )
  } catch (error) {
    return error;
  }

}
export const SearchClient = async (businessId, searchVal, success, error) => {
  const AuthHeader = await authHeader();
  console.log("response", searchVal)
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  https://bianca-val0.cfapps.io/users?type=all&businessId=3&page=0&pageCount=9&searchVal=sam
  var queryParams = 'users?type=all&businessId=' + businessId + '&page=0&pageCount=&searchVal=' + searchVal;
  console.log("apiPath", apiPath + queryParams)
  try {
    return fetch(apiPath + queryParams, requestOptions)
      .then(
        response => {
          if (response.ok) response.json().then(res => success(res));
          else {
            response.json().then(err => error(err))
          }
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

}

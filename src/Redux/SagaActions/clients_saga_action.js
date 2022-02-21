import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import { BaseApi } from '../../components/ImportantFunction/baseApi'

var Buffer = require('buffer/').Buffer


const apiPath = BaseApi
export const _requestToApiAllClients = async (businessId, offset) => {
    const AuthHeader = await authHeader();

    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    };
    https://bianca-val0.cfapps.io/users?type=all&businessId=3&page=0&pageCount=9
    var queryParams = "users?type=all&businessId=" + businessId + "&page=" + offset + "&pageCount=9";
    return fetch(apiPath +
        queryParams, requestOptions).then((response) => {
            if (response.status == 401 || response.status == 403) {
                AsyncStorage.clear();
                RNRestart.Restart();
            } else return response.json()
        })
        .catch((error) => {
            if (error.message === 'Timeout' || error.message === 'Network request failed') {
                return Promise.reject(error.message);
            } else {
                console.log("dfaddasdfadsf", error);
                throw error;
            }

        })
}

export const GetAllClients = function* (action) {
    console.log("actionaction", action)
    try {
        const requestToApiAllClients = yield call(_requestToApiAllClients, action.BusinessId, 0);
        console.log("requestToApiAllClients", requestToApiAllClients)
        if (requestToApiAllClients != null) {
            yield put({
                type: actionType.GETALLCLIENTSRESULT,
                allClientsData: requestToApiAllClients,

            });

            //   action.nav.navigate('SELECTLOCATION');
        }
    } catch (error) {
        yield put({
            type: actionType.GETALLCLIENTSERROR,
            errorMsg: error,
        });
    }
};

export const GetClientsNextPage = async (BusinessId, offset, response, error) => {
    try {
        const requestToApiAllClients = await _requestToApiAllClients(BusinessId, offset)
        console.log("requestToApiAllClients", requestToApiAllClients)
        if (requestToApiAllClients != null) response(requestToApiAllClients);
        else {
            response.json().then(err => error(err))
        }
    } catch (error) {

    }
};


import AsyncStorage from '@react-native-community/async-storage';
import { call, put } from 'redux-saga/effects';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi;

export const _requestDataApiWithZero = async (techId) => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include',
    };
    //   https://bianca-val0.cfapps.io/users/0
    var queryParams = 'users/' + 0;
    try {
        return fetch(apiPath + queryParams, requestOptions).then(
            response => {
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
export const _requestDataApi = async (techId) => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include',
    };
    // https://bianca-val0.cfapps.io/new-technicians/308
    var queryParams = 'new-technicians/' + techId;
    try {
        return fetch(apiPath + queryParams, requestOptions).then(
            response => {
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
export const _requestForClockInReminder = async (techId, checkInNotificaion) => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'PUT',
        headers: AuthHeader,
        body: JSON.stringify({
            clockReminderEnabled: checkInNotificaion
        }),
    };
    // https://bianca-val0.cfapps.io/new-technicians/308/info
    var queryParams = 'new-technicians/' + techId + '/info';
    try {
        return fetch(apiPath + queryParams, requestOptions)
            .then(response => {
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

            })
    } catch (error) {
        return error;
    }


};
export const _saveTokenToServer = async (fcmToken) => {
    const AuthHeader = await authHeader();
    let facebookAppInstalled = false
    let yelpAppInstalled = false
    facebookAppInstalled = await AppInstalledChecker
        .isAppInstalled('facebook') // omit the :// suffix
        .then((isInstalled) => {

            return isInstalled
            // isInstalled is true if the app is installed or false if not
        })
    if (Platform.OS === "ios") {
        yelpAppInstalled = await AppInstalledChecker
            .checkURLScheme('Yelp')
            // omit the :// suffix
            // .checkURLScheme('YelpAPI') // omit the :// suffix
            .then((isInstalled) => {
                return isInstalled
                // isInstalled is true if the app is installed or false if not
            })
    } else if (Platform.OS === "android") {
        yelpAppInstalled = await AppInstalledChecker
            .checkPackageName('com.yelp.android')
            // omit the :// suffix
            // .checkURLScheme('YelpAPI') // omit the :// suffix
            .then((isInstalled) => {
                console.log("isInstalledisInstalled", isInstalled);

                return isInstalled
                // isInstalled is true if the app is installed or false if not
            })

        // AppInstalledChecker.getAppList()
        //     .forEach((d, idx) => {
        //         console.log("dadsfsdfasdf", d);


        //     });
    }
    const requestOptions = {
        method: 'POST',
        headers: AuthHeader,
        body: JSON.stringify({
            "yelpAppInstalled": yelpAppInstalled,
            "deviceToken": fcmToken,
            "requestSource": Platform.OS == "android" ? "Android App" : "iOS App",
            "facebookAppInstalled": facebookAppInstalled
        }),
    };
    // https://bianca-val0.cfapps.io/device-usages
    var queryParams = 'device-usages';
    try {
        return fetch(apiPath + queryParams, requestOptions)
            .then(response => {
                if (response.status == 401 || response.status == 403) {
                    AsyncStorage.clear();
                    RNRestart.Restart();
                } else return response

            }).catch((error) => {
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




export const GetProfileInfo = function* (action) {
    try {
        const requestDataApiWithZero = yield call(
            _requestDataApiWithZero,
            action.techId
        );
        console.log("requestDataApi", requestDataApiWithZero)
        if (requestDataApiWithZero.technicianResponsibilities[0].location.id == action.locationId) {
            const requestDataApi = yield call(
                _requestDataApi,
                action.techId
            );
            console.log("requestDataApi", requestDataApi)
            if (requestDataApi != null) {
                yield put({
                    type: actionType.GETPROFILEINFORESULT,
                    ProfileData: requestDataApi,
                });
            }

        }


    } catch (error) {
        console.log('error is', error);
        yield put({
            type: actionType.GETPROFILEINFOERROR,
            // allUpcomingData: requestDataApi,
            errorMsg: error
        });
    }
};

export const PostCheckInNotification = function* (action) {
    try {
        const requestForClockInReminder = yield call(
            _requestForClockInReminder,
            action.techId,
            action.checkInNotificaion
        );

    } catch (error) {
        console.log('error is', error);
        yield put({
            type: actionType.GETPROFILEINFOERROR,
            // allUpcomingData: requestDataApi,
            errorMsg: error
        });
    }
};


export const SaveTokenToServer = async (fcmToken, success, error) => {
    console.log("responseresponseresponse", fcmToken);
    try {
        const response = await _saveTokenToServer(fcmToken);
        console.log("responseresponseresponse", response);

        // if (response.ok) success(response.json());
        // else {
        //     response.json().then(err => error(err))
        // }
    } catch (err) {
        console.log("Efassadfsdf", err)
        error(err);
    }
};



/* eslint-disable */
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import actionType from '../Action/typesOfAction';
import { toast } from '../../components/Toast/Toast'
var Buffer = require('buffer/').Buffer;
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import RNRestart from "react-native-restart";

const apiPath = BaseApi;

export const requestTokenDataApi = async (username, password) => {
  try {
    const hash = new Buffer(`${username}:${password}`).toString('base64');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${hash}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      crossDomain: true,
    };
    console.log(requestOptions)
    return fetch(apiPath + 'users/token', requestOptions)
      .then(response => {

        if (!response.ok) {

          if (response.status == '401') {
            return Promise.reject('User account does not exist!');
          }
          return Promise.reject('Username or Password is wrong.');
        }
        return response.json();
      })
      .catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      })
      .then(auth => {

        if (auth && auth.sessionId) {

          const getUserRequestOptions = {
            method: 'GET',
            headers: {
              'X-Auth-Token': auth.sessionId,
              'X-Xsrf-Token': auth.csrf.token,
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
            },
            // credentials: 'include'
          };
          // await
          let saveUserSession = {
            sessionId: auth.sessionId,
            _csrf: auth.csrf.token,
          };

          let result = AsyncStorage.setItem(
            'UserSessionData',
            JSON.stringify(saveUserSession),
          ).then(() => {
            return true;
          });
          return fetch(apiPath + 'users/0', getUserRequestOptions)
            .then(response => {
              if (!response.ok) {
                return Promise.reject('Username or Password is wrong.');
              }
              return response.json();
            })
            .then(user => {
              console.log('USER',user)

                user.csrfToken = auth.csrf.token;
                user.token = auth.sessionId;
                user.loggedIn = true;

                if (user.role == 'USER')
                  return Promise.reject(
                      'User does not have permission to system. Please contact the store manager.',
                  );
                else return user;

            })
        } else {
          return auth;
        }
      })

  } catch (error) {
    console.log("NETERRROR", error);
  }
};
//

export const _requestToApi = auth =>
  fetch(apiPath, {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${btoa(auth)}`,
    },
  });

export const Log_In_Success = async (data, auth) => {

  console.log('asdasdasdasdasdasdasdadasdad',data)

  try {
    let Save_DB = {
      emailAddress: data.emailAddress,
      logStatus: true,
      fullName: data.fullName,
      imageUrl: data.imageUrl,
      mobile: data.mobileNumber,
      auth: auth,
      allLogInData: data
    };

    const result = await AsyncStorage.setItem(
      'User@Data',
      JSON.stringify(Save_DB),
    ).then(() => {
      return true;
    });

    return result;
  } catch (error) {
    console.log('async retrive wallet prlm', error);
  }
};

export const _Loaded_User_DB = async token => {

  try {
    const value = await AsyncStorage.getItem('User@Data');
    if (value !== null) {
      let data = JSON.parse(value);


      let return_data;
      token == 'auth' ? (return_data = data.auth) : null;

      return return_data;
    } else {
      return false;
    }
  } catch (error) {
    console.log('async retrive Loaded_User_DB prlm', error);
  }
};

export const LogInUserData = function* (action) {

  try {
    let Log_Status;

    let auth, M_Number;
    action.authData == false
      ? (auth = action.Username + ':' + action.Password)
      : (auth = yield call(_Loaded_User_DB, 'auth'));

    const requestToken = yield call(
      requestTokenDataApi,
      action.Username,
      action.Password,
    );
    const Resut_Data_API = yield requestToken;

    if (Resut_Data_API.id == undefined) {
      Log_Status = false;
    } else {
      Log_Status = yield call(Log_In_Success, Resut_Data_API, auth);
    }

    if (Resut_Data_API.mobileNumber.length == 10) {
      let FirstNumber = Resut_Data_API.mobileNumber.substring(0, 3);
      let SndNumber = Resut_Data_API.mobileNumber.substring(3, 6);
      let TrdNumber = Resut_Data_API.mobileNumber.substring(6, 10);
      M_Number = FirstNumber + '-' + SndNumber + '-' + TrdNumber;
    } else {
      M_Number = Resut_Data_API.mobileNumber;
    }

    if (Log_Status == true) {

        AsyncStorage.setItem(
            'LogInFirstTime',
            JSON.stringify("LogInFirstTime"))
        yield put({
          type: actionType.LOGINRESULT,
          emailAddress: Resut_Data_API.emailAddress,
          fullName: Resut_Data_API.fullName,
          imageUrl: Resut_Data_API.imageUrl,
          mobile: M_Number,
          team: Resut_Data_API.technicianResponsibilities[0].team,
          emailNotificationEnabled: Resut_Data_API.emailNotificationEnabled,
          smsNotificationEnabled: Resut_Data_API.smsNotificationEnabled,
          specialties: Resut_Data_API.technicianResponsibilities[0].specialties,
          // businessId: [1,3],
          businessId: Resut_Data_API.business.id,
          locationId: Resut_Data_API.technicianResponsibilities[0].location,
          errorMsg: '',
          LOGEDUSER: action.Username,
          LOGEDDATA: action.Password,
          TechnicianId: Resut_Data_API.technicianResponsibilities[0].id,
          allLogInData: Resut_Data_API
        });


        action.nav.navigate('SELECTLOCATION');

    }
  } catch (error) {
    toast(error, "BOTTOM");
    console.log('Error is LogInUserData Method : ', error);
    yield put({
      type: actionType.LOGINERROR,
      emailAddress: '',
      fullName: '',
      imageUrl: '',
      mobile: '',
      errorMsg: error,
    });
  }
};

// when user successfully logIn already and run the app again
export const LogedInUserData = function* (action) {
  try {

    let Resut_Data_API = action.data


    yield put({
      type: actionType.LOGINRESULT,
      emailAddress: Resut_Data_API.emailAddress,
      fullName: Resut_Data_API.fullName,
      imageUrl: Resut_Data_API.imageUrl,
      mobile: Resut_Data_API.mobile,

      team: Resut_Data_API.allLogInData.technicianResponsibilities[0].team,
      emailNotificationEnabled: Resut_Data_API.allLogInData.emailNotificationEnabled,
      smsNotificationEnabled: Resut_Data_API.smsNotificationEnabled,
      specialties: Resut_Data_API.allLogInData.technicianResponsibilities[0].specialties,
      // businessId: [1,3],
      businessId: Resut_Data_API.allLogInData.business.id,
      locationId: Resut_Data_API.allLogInData.technicianResponsibilities[0].location,
      errorMsg: '',
      // LOGEDUSER: action.Username,
      // LOGEDDATA: action.Password,
      TechnicianId: Resut_Data_API.allLogInData.technicianResponsibilities[0].id,
      allLogInData: Resut_Data_API.allLogInData
    });

    // action.nav.navigate('SELECTSTORE');

  } catch (error) {
    toast(error, "BOTTOM");
    console.log('Error is LogInUserData Method : ', error);
    yield put({
      type: actionType.LOGINERROR,
      emailAddress: '',
      fullName: '',
      imageUrl: '',
      mobile: '',
      errorMsg: error,
    });
  }
};



/* eslint-disable */
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
var Buffer = require('buffer/').Buffer;
import Moment from 'moment';
import { toast } from '../../components/Toast/Toast'
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'

const apiPath = BaseApi;

// Get All Tasks Data
export const _requestToAllTaskApi = async (locationId, offset) => {
  console.log("locationId", locationId);
  const AuthHeader = await authHeader();

  const value = await AsyncStorage.getItem('UserSessionData');
  // return authorization header with token
  let sessionData = await value;
  sessionData = JSON.parse(sessionData);
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  var queryParams = 'locId=' + locationId + '&page=' + offset + '&pageCount=9';
  return fetch(
    apiPath + 'tasks?' + queryParams,
    requestOptions,
  ).then(response => {
    console.log("requestDataApirequestDataApi22", response);
    if (response.status == 401 || response.status == 403) {
      AsyncStorage.clear();
      //RNRestart.Restart();
    } else return response.json()
  }).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  })
};
export const requestDataSalesApi = async locationId => {
  const AuthHeader = await authHeader();
  const value = await AsyncStorage.getItem('UserSessionData');
  // return authorization header with token
  let sessionData = await value;
  sessionData = JSON.parse(sessionData);
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  var queryParams = 'reports/sales?locId=' + locationId;
  return fetch(apiPath + queryParams, requestOptions).then(response => {
        console.log('response',response);
    if (response.status == 401 || response.status == 403) {
      AsyncStorage.clear();
      //RNRestart.Restart();
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
};
export const requestDataActivitiesApi = async (locationId, offset) => {
  const AuthHeader = await authHeader();
  const value = await AsyncStorage.getItem('UserSessionData');
  // return authorization header with token
  let sessionData = await value;
  sessionData = JSON.parse(sessionData);
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // https://bianca-val0.cfapps.io/activities?locId=201&page=0&pageCount=
  var queryParams =
    'activities?locId=' + locationId + '&page=' + offset + '&pageCount=9';
  return fetch(apiPath + queryParams, requestOptions).then(response => {
    if (response.status == 401 || response.status == 403) {
      AsyncStorage.clear();
      //RNRestart.Restart();
    } else return response.json()
  }).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  })
};
export const GetAllTodayData = function* (action) {

  try {
    const requestDataApi = yield call(_requestToAllTaskApi, action.locationId, 0);
    console.log("requestDataApirequestDataApi88", requestDataApi);

    const requestDataSales = yield call(requestDataSalesApi, action.locationId);
    const requestDataActivities = yield call(
      requestDataActivitiesApi,
      action.locationId,
      0,
    );
    console.log('requestDataActivities', requestDataActivities);

    if (
      requestDataApi != null &&
      requestDataSales != null &&
      requestDataActivities != null
    ) {
      yield put({
        type: actionType.GETALLTODAYDATARESULT,
        allTasksData: requestDataApi,
        allSalesData: requestDataSales,
        allActivitiesData: requestDataActivities,
      });
      action.callback();
      // action.nav.navigate('Screens');
    }
  } catch (error) {
    yield put({
      type: actionType.GETALLTODAYERROR,
      errorMsg: error,
    });
  }
};
export const GetTaskNextPage = async (locationId, offset, response, error) => {
  try {
    const requestToAllTaskApi = await _requestToAllTaskApi(locationId, offset)
    console.log("requestToApiAllClients", requestToAllTaskApi)
    if (requestToAllTaskApi != null) response(requestToAllTaskApi);
    else {
      response.json().then(err => error(err))
    }
  } catch (error) {

  }
};
export const GetActivityNextPage = async (locationId, offset, response, error) => {
  try {
    const _requestDataActivitiesApi = await requestDataActivitiesApi(locationId, offset)
    console.log("requestToApiAllClients", _requestDataActivitiesApi)
    if (_requestDataActivitiesApi != null) response(_requestDataActivitiesApi);
    else {
      response.json().then(err => error(err))
    }
  } catch (error) {

  }
};


// Post new Task Data
export const _postRequestNewTask = async (data, id) => {

  console.log("_postRequestNewTask4444", data, "id", id);
  const AuthHeader = await authHeader();
  const body = {
    location: {
      id: data.locationId ? data.locationId.id : null,
    },
    technician: {
      id: data.assignet_to,
    },
    subject: data.title,
    priority: data.priority,
    relatedItemType: data.related_to,
    relatedItem: {
      id: data.relatedItem
    },
    comments:
      id !== '' ? (data.notes == '' ? data.new_notes : data.notes) : data.notes,
    status: data.status,
    dueTime: Moment(data.due_date_date).format("YYYY-MM-DDThh:mm:ss"),
  };
  if (!body.relatedItem.id) {
    delete body.relatedItem
  }
  console.log("_postRequestNewTask5555", JSON.stringify(body));
  const requestOptions = {
    method: id !== '' ? 'PUT' : 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };


  if (id !== '') {
    console.log("_postRequestNewTask", data, "id", id);
    return fetch(apiPath + `tasks/${id}`, requestOptions).then(response => response,
    );
  } else {
    console.log("AAAAAAA", id);
    return fetch(apiPath + 'tasks', requestOptions).then(response =>
      response,
    )
      .catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      })
  }
};

export const AddNewTask = function* (action) {
  console.log("AddNewTask", action.data);

  try {
    let id = '';
    const postRequestNewTask = yield call(_postRequestNewTask, action.data, id);
    console.log("postRequestNewTask1111", postRequestNewTask);

    if (postRequestNewTask.ok) {

      yield put({
        type: actionType.POSTNEWTASKRESULT,
        newTask: postRequestNewTask,
        newTaskSuccess: 'New Task Created',
      });
      const requestDataApi = yield call(
        _requestToAllTaskApi,
        action.data.locationId.id,
        0
      );
      if (requestDataApi != null) {
        yield put({
          type: actionType.GETALLTODAYDATARESULT,
          allTasksData: requestDataApi,
        });
      }


      // action.nav.navigate("MyTasksScreen");
      action.nav.goBack();
    } else {
      postRequestNewTask.json().then(error => {
        console.log("postRequestNewTask3333", error);
        toast(error.error ? error.error : error.message, "BOTTOM");
        // error(err)
      })

    }
  } catch (error) {
    console.log("postRequestNewTask222", error);
    yield put({
      type: actionType.POSTNEWTASKERROR,
      errorMsg: error,
    });
  }
};

// for edit task

export const _editTask = function* (action) {
  console.log("requestDataApirequestDataApi333", action);
  try {
    const postRequestNewTask = yield call(
      _postRequestNewTask,
      action.data,
      action.id,
    );

    if (postRequestNewTask.ok) {

      yield put({
        type: actionType.POSTNEWTASKRESULT,
        newTask: postRequestNewTask,
        newTaskSuccess: 'Task Updated',
      });
      const requestDataApi = yield call(
        _requestToAllTaskApi,
        action.locationId,
        0
      );
      console.log("requestDataApirequestDataApi", requestDataApi);

      if (requestDataApi != null) {
        yield put({
          type: actionType.GETALLTODAYDATARESULT,
          allTasksData: requestDataApi,
        });
      }



      action.nav.goBack();
    } else {
      postRequestNewTask.json().then(error => {
        console.log("postRequestNewTask3333", error);
        toast(error.error ? error.error : error.message, "BOTTOM");
        // error(err)
      })

    }
  } catch (error) {
    yield put({
      type: actionType.POSTNEWTASKERROR,
      errorMsg: error,
    });
  }
};

export const DeleteTask = async (id, success, error) => {

  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader,
    body: JSON.stringify({

    }),
  };
  // https://bianca-val0.cfapps.io/tasks/1509
  try {
    return fetch(apiPath + 'tasks/' + id, requestOptions).then(response => {
      console.log("response", response)
      if (response.ok) {

        success(response)
      } else {
        response.json().then(res => {
          error(res)
        })

      }

    })
      .catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      })
  } catch (error) {

  }




};

import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment';
import actionType from '../Action/typesOfAction';
import { BaseApi } from '../../components/ImportantFunction/baseApi'

const apiPath = BaseApi;
export const _getAllThreads = async locationId => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // /chat-threads?locId=201
  var queryParams = 'chat-threads?locId=' + locationId;
  return fetch(apiPath + queryParams, requestOptions).then(response =>
    response.json(),
  );
};
export const _getSingleThread = async threadId => {
  // console.log('action222', threadId);
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  //bianca-val0.cfapps.io/chat-threads/1000
  https: var queryParams = 'chat-threads/' + threadId;
  return fetch(apiPath + queryParams, requestOptions).then(response =>
    response.json(),
  );
};
export const _getAllMessage = async (threadId, page, count) => {
  // console.log('action222', threadId);
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // https://bianca-val0.cfapps.io/chat-messages?threadId=1000&page=0&pageCount=10
  var queryParams =
    'chat-messages?threadId=' +
    threadId +
    '&page=' +
    page +
    '&pageCount=' +
    count;
  return fetch(apiPath + queryParams, requestOptions).then(response =>
    response.json(),
  );
};
export const _AddThread = async (locationId, userId, otherUserId, success) => {
  const AuthHeader = await authHeader();
  console.log(AuthHeader);

  let body = {
    location: {
      id: locationId,
    },
    participants: [
      // {
      //   user: {
      //     id: userId,
      //   },
      // },
      {
        user: {
          id: otherUserId,
        },
      },
    ],
  };
  console.log("threadBody", JSON.stringify(body));

  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  //bianca-val0.cfapps.io/chat-threads
  https: return fetch(apiPath + 'chat-threads', requestOptions).then(
    response => {
      if (response.status == '200') {
        response.json().then((res) => {
          _AddMessage(res.id, "Hi")
          success(res)
          console.log("chatThreads", res);
        })
      } else if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      }
      return response;
    },
  );
};
export const _AddMessage = async (threadId, body) => {
  const AuthHeader = await authHeader();
  console.log(AuthHeader);

  let _body = {
    thread: {
      id: threadId,
    },
    body,
  };
  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(_body),
  };
  //bianca-val0.cfapps.io/chat-messages
  https: return fetch(apiPath + 'chat-messages', requestOptions).then(
    response => {
      console.log(response, AuthHeader);

      return response;
    },
  );
};

export const _AddImage = async (threadId, imageUri) => {
  let AuthHeader = await authHeader();
  AuthHeader['Content-Type'] = 'multipart/form-data';

  const data = new FormData();
  data.append('img', {
    uri: imageUri,
    type: 'image/png',
    name: 'photo.png',
  });

  var requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: data,
  };

  https: return fetch(
    apiPath + 'chat-messages/' + threadId + '/file',
    requestOptions,
  ).then(response => {
    console.log(response);
    return response;
  });
};

export const ChatAllAction = async locationId => {
  console.log('action', locationId);
  try {
    const GetAllThreads = await _getAllThreads(locationId);
    console.log("_getAllThreads", _getAllThreads);

    const AddThread = await _AddThread(locationId);
    const GetSingleThread = await _getSingleThread(1000);
    const GetAllMessage = await _getAllMessage(1000);
    const AddMessage = await _AddMessage(1000);
    console.log('requestSalesApiData', GetAllMessage);
  } catch (error) { }
};

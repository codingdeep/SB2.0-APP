import { call, put } from 'redux-saga/effects';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment';
import { GetFormulaList } from '../../Redux/Action/formulaList';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi;
export const _requestToApi = async (locaionId, clientId) => {
  console.log('requestDataApiFormula', 'kkkkkk');
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  // https://bianca-val0.cfapps.io/user-formulas?usrId=16097;
  var queryParams = 'user-formulas?usrId=' + clientId;
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
};
export const _addNewFormula = async bodyData => {
  const AuthHeader = await authHeader();
  const body = {
    user: {
      id: bodyData.ClientId,
    },
    technician: {
      id: bodyData.TechnicianId,
    },
    type: bodyData.type,
    notes: bodyData.notes,
    lastUseTime: Moment(bodyData.date).format('YYYY-MM-DDTHH:mm:ss'),
  };
  console.log("BodyFormula", JSON.stringify(body));

  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };


  return fetch(apiPath + 'user-formulas', requestOptions).then(response => {
    if (response.status == 401 || response.status == 403) {
      AsyncStorage.clear();
      RNRestart.Restart();
    } else return response.json();
  }).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  })
};

export const AddNewFormula = function* (action) {
  try {
    // action.nav.navigate('FormulaListScreen')
    const addNewFormula = yield call(_addNewFormula, action.NewFormulaInfo);
    console.log('AddNewFormula', addNewFormula);

    if (addNewFormula != null) {
      action.nav.navigate('FormulaListScreen');
      yield put({
        type: actionType.ADDFORMULARESULT,
        // GetAllFormulaList: requestDataApi,
        // ClientInfo : action.clientInfo
        // salonLocatioInfo: GetAllFormulaList,
      });
    }
  } catch (error) {
    yield put({
      type: actionType.ADDFORMULAERROR,
      errorMsg: error,
    });
  }
};

export const GetAllFormulaList = function* (action) {
  try {
    // action.nav.navigate('FormulaListScreen')
    const requestDataApi = yield call(
      _requestToApi,
      action.locaionId.id,
      action.clientId,
    );
    console.log('requestDataApiFormula', action);

    if (requestDataApi != null) {
      yield put({
        type: actionType.FORMULALISTRESULT,
        GetAllFormulaList: requestDataApi,
        ClientInfo: action.clientInfo,
        // salonLocatioInfo: GetAllFormulaList,
      });
    }
  } catch (error) {
    yield put({
      type: actionType.FORMULALISTERROR,
      errorMsg: error,
    });
  }
};

export const _deleteFormula = async formulaId => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader,
  };
  return fetch(`${apiPath}user-formulas/${formulaId}`, requestOptions).then(
    response => {
      if (response.status == 401 || response.status == 403) {
        AsyncStorage.clear();
        RNRestart.Restart();
      } else if (response.ok) {
        return {};
      }
    },
  ).catch((error) => {
    if (error.message === 'Timeout' || error.message === 'Network request failed') {
      return Promise.reject(error.message);
    } else {
      console.log("dfaddasdfadsf", error);
      throw error;
    }

  })
};

export const DeleteFormula = function* (action) {
  try {
    const deleteRequest = yield call(_deleteFormula, action.formulaId);
    if (deleteRequest != null) {
      action.callback();
    }
  } catch (error) {
    yield put({
      type: actionType.DELETEFORMULAERROR,
      errorMsg: error,
    });
  }
};

export const UpdateFormula = async (id, state, response, error) => {

  const AuthHeader = await authHeader();
  console.log("responsestate", state)
  const body = {
    user: {
      id: state.ClientId,
    },
    technician: {
      id: state.TechnicianId,
    },
    type: state.type,
    notes: state.notes,
    lastUseTime: Moment(state.date).format('YYYY-MM-DDTHH:mm:ss'),
  };
  console.log("BodyFormula", JSON.stringify(body));

  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  https://bianca-val0.cfapps.io/user-formulas/1055
  var queryParams = 'user-formulas/' + id;
  console.log("apiPath + queryParams", apiPath + queryParams)
  try {
    return fetch(apiPath + queryParams, requestOptions)
      .then(
        res => {

          if (res.status == 401 || res.status == 403) {
            AsyncStorage.clear();
            RNRestart.Restart();
          } else response(res.json())
        }
      ).catch((error) => {
        if (error.message === 'Timeout' || error.message === 'Network request failed') {
          return Promise.reject(error.message);
        } else {
          console.log("dfaddasdfadsf", error);
          throw error;
        }

      })
  } catch (err) {
    error(err)
    return err;
  }
};

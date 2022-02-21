/* eslint-disable */

import AsyncStorage from '@react-native-community/async-storage';
import { call, put } from 'redux-saga/effects';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment'
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
const apiPath = BaseApi;
import { toast } from '../../components/Toast/Toast'

export const _requestToUpcomingDataApi = async (locationId, cliendId) => {
  console.log('requestDataApi', cliendId);
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
    credentials: 'include',
  };
  https://bianca-val0.cfapps.io/visits?locId=201&userId=16112&type=user-open
  var queryParams = 'visits?locId=' + locationId + '&userId=' + cliendId + '&type=user-open';
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

  // return fetch("https://bianca-val0.cfapps.io/visits?locId=201&userId=16112&type=user-open " + queryParams).then(response =>
  //   response.json(),
  // );
};

export const _saveBooking = async body => {
  console.log('asdfs',body)
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  return fetch(apiPath + 'visits/', requestOptions).then(response => {
    console.log(response, response);

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
};


export const _checkInBooking = async (notes, visitId) => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify({ customerNotes: notes }),
  };
  return fetch(apiPath + 'visits/' + visitId, requestOptions).then(response => {
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
};
export const _checkServiceIn = async (vt) => {
  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify({}),
  };
  return await fetch(apiPath + 'visit-technicians/' + vt, requestOptions).then(handleResponse)
};
export const _checkServiceOut = async (vt, amount) => {

  const AuthHeader = await authHeader();
  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify({chargeAmount: amount}),
  };
  console.log(requestOptions)
  return fetch(apiPath+'visit-technicians/'+vt, requestOptions).then(handleResponse);
}




export const _updateBooking = async (apptId, body) => {
  console.log("body", JSON.stringify(body))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  // https://bianca-val0.cfapps.io/visits/update/62981
  try {
    return fetch(apiPath + 'visits/update/' + apptId, requestOptions)
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

  }

}

export const _updateCustomerNote = async (apptId, body) => {
  console.log("body", JSON.stringify(body))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };

  try {
    return fetch(apiPath + 'visits/update/' + apptId+"/notes", requestOptions)
      .then(response => {
        console.log(response)
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

  }

}
export const _addService = async (body) => {
  console.log("body", body)
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  // https://bianca-val0.cfapps.io/visit-technicians
  try {
    return fetch(apiPath + 'visit-technicians', requestOptions).then(response => {
      console.log("responses", response)
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
    return error
  }

}
export const _updateService = async (body, id) => {
  console.log("body", JSON.stringify(body))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  // https://bianca-val0.cfapps.io/visit-technicians/update/81474
  try {
    return fetch(apiPath + 'visit-technicians/update/' + id, requestOptions).then(response => {
      console.log("response", response)
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

  }

}
export const _addProduct = async (body) => {
  console.log("body", JSON.stringify(body))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'POST',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  // https://bianca-val0.cfapps.io/visit-purchase-items/
  try {
    return fetch(apiPath + 'visit-purchase-items/', requestOptions)
      .then(response => {
        console.log("response", response)
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

  }

}
export const _updateProduct = async (id, body) => {
  console.log("body", body)
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'PUT',
    headers: AuthHeader,
    body: JSON.stringify(body),
  };
  // https://bianca-val0.cfapps.io/visit-purchase-items/1085
  try {
    return fetch(apiPath + 'visit-purchase-items/' + id, requestOptions).then(response => {
      console.log("response", response)
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

  }

}
export const _deleteService = async (visitID, cancellaTionReason) => {

  console.log("body", JSON.stringify({
    cancellaTionReason: cancellaTionReason
  }))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader,
    body: JSON.stringify({
      cancellaTionReason: cancellaTionReason
    }),
  };
  // https://bianca-val0.cfapps.io/visit-technicians/81530
  try {
    return fetch(apiPath + 'visit-technicians/' + visitID, requestOptions).then(response => {
      console.log("response", response)
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

  }

}
export const _deleteAppointment = async (visitID, cancellaTionReason) => {

  console.log("body", JSON.stringify({
    cancellaTionReason: cancellaTionReason
  }))
  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader,
    body: JSON.stringify({
      cancellaTionReason: cancellaTionReason
    }),
  };
  // https://bianca-val0.cfapps.io/visit-technicians/81530
  try {
    return fetch(apiPath + 'visits/' + visitID, requestOptions).then(response => {
      console.log("response", response)
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

  }

}
export const _getSingleService = async (serviceId) => {

  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
  };
  // https://bianca-val0.cfapps.io/location-services/202
  try {
    return fetch(apiPath + 'location-services/' + serviceId, requestOptions).then(response => {
      console.log("response", response)
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

  }

}

export const _getSingleVisit = async (visitId) => {

  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'GET',
    headers: AuthHeader,
  };
  // https://bianca-val0.cfapps.io/location-services/202
  try {
    return fetch(apiPath + 'visits/' + visitId, requestOptions).then(response => {
      console.log("response", response)
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
    error(error);
  }

}



export const _deleteProduct = async (id) => {

  const AuthHeader = await authHeader();

  const requestOptions = {
    method: 'DELETE',
    headers: AuthHeader,
    body: JSON.stringify({

    }),
  };
  // https://bianca-val0.cfapps.io/visit-purchase-items/1085
  try {
    return fetch(apiPath + 'visit-purchase-items/' + id, requestOptions).then(response => {
      console.log("response", response)
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

  }

}

export const saveBooking = async (payload, success, error) => {

  console.log('payload',payload)

  var tech = [];
  var purchaseItems = []
  if (payload.purchaseItems.length > 0) {
    for (var i = 0; i < payload.purchaseItems.length; i++) {
      var singleProduct = {
        technician: {
          id: payload.purchaseItems[i].Technician,
        },
        quantity: payload.purchaseItems[i].quantity,
        chargeAmount: payload.purchaseItems[i].price,
        locatedProductVariant: {
          id: payload.purchaseItems[i].id
        }
      }

      purchaseItems.push(singleProduct)
    }
  } else {
    purchaseItems = [];
  }
  const datePart = Moment(payload.apptDate).format('YYYY-MM-DDT');
  for (var i = 0; i < payload.visitTechnicians.length; i++) {
    var singleTech = {
      technician: {
        id: payload.visitTechnicians[i].technician,
      },
      offeredService: {
        id: payload.visitTechnicians[i].service
      },
      expectedStartTime: datePart + Moment(payload.visitTechnicians[i].timeStart).format("HH:mm:ss"),
      period: {
        to: datePart + Moment(payload.visitTechnicians[i].timeEnd).format("HH:mm:ss")
      }
    }

    tech.push(singleTech)
  }

  const apptJSON = {

    location: payload.location,
    requestSource: payload.requestSource,
    requestType: payload.requestType,
    standingAppointment: false,
    staffNotes: payload.staffNotes,
    visitTechnicians: tech,
    purchaseItems: purchaseItems,
    client: payload.client

  }

  console.log('apptJSONsdfsd', apptJSON)



  try {
    const response = await _saveBooking(apptJSON);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (error) {
    error(error);
  }
};
export const updateBooking = async (apptId, payload, success, error) => {


  try {
    const response = await _updateBooking(apptId, payload);
    console.log(response.json())
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (error) {
    error(error);
  }
};
export const updateCustomerNote = async (apptId, payload, success, error) => {
  const response = await _updateCustomerNote(apptId, payload);
  return response
};

export const addService = async (payload, success, error) => {

  try {
    const response = await _addService(payload);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};
export const updateService = async (id, payload, success, error) => {

  try {
    const response = await _updateService(payload, id);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};

export const DeleteService = async (visitID, cancellaTionReason, success, error) => {
  console.log('visit',visitID)

  try {
    const response = await _deleteService(visitID, cancellaTionReason);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};
export const DeleteAppointment = async (visitID, cancellaTionReason, success, error) => {

  try {
    const response = await _deleteAppointment(visitID, cancellaTionReason);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};

export const addProduct = async (payload, success, error) => {

  try {
    const response = await _addProduct(payload);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};
export const updateProduct = async (id, payload, success, error) => {

  try {
    const response = await _updateProduct(id, payload);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};
export const DeleteProduct = async (id, success, error) => {
  console.log(id)

  try {
    const response = await _deleteProduct(id);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};
export const GetServiceInfo = async (servicrId, success, error) => {

  try {
    const response = await _getSingleService(servicrId);
    if (response.ok) success(response.json());
    else {
      response.json().then(err => error(err))
    }
  } catch (err) {
    console.log("Efassadfsdf", err)
    error(err);
  }
};




export const UpcommingAppoinments = function* (action) {

  try {
    console.log('requesaction.cliendId', action);
    const requestDataApi = yield call(
      _requestToUpcomingDataApi,
      action.locationId, action.clientId
    );

    if (requestDataApi != null) {
      yield put({
        type: actionType.UPCOMINGAPPOINMENTSRESULT,
        allUpcomingData: requestDataApi,
      });
    }
  } catch (error) {
    console.log('error is', error);
    yield put({
      type: actionType.UPCOMINGAPPOINMENTSERROR,
      // allUpcomingData: requestDataApi,
      errorMsg: error
    });
  }
};

async function handleResponse(response) {
  console.log('RES',response)
  if (!response.ok) {
    //console.log(response.status)
    if(response.status == 401 || response.status == 403){
      AsyncStorage.clear();
      RNRestart.Restart();
    }else {
      return await  Promise.reject(response);
    }

  }else {
    return await response.json();
  }

}

/* eslint-disable */
import actionType from './typesOfAction';
// import actionType from '../../constants/constants';

export function Log_in_checker(Username, Password, authData, nav) {

  return {
    type: actionType.LOGINCHECK,
    Username: Username,
    Password: Password,
    authData: authData,
    nav: nav,
  };
}
export function AlredyLogedInUser(data) {

  return {

    type: actionType.AFTERLOGEDINCHECK,
    data
    // Username: Username,
    // Password: Password,
    // authData: authData,
    // nav: nav,

  };
}

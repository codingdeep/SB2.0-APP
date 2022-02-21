import actionType from './typesOfAction';
// import actionType from '../../constants/constants';

export function GetAllTodayData(locationId, nav, callback) {
  return {
    type: actionType.GETALLTODAYDATA,
    locationId: locationId,
    nav: nav,
    callback,
  };
}
export function AddNewTask(nav, data) {
  return {
    type: actionType.POSTNEWTASK,
    nav: nav,
    data: data,
  };
}

export function EditTask(nav, data, id, locationId) {
  return {
    type: actionType.POSTEDITTASK,
    nav: nav,
    data: data,
    id: id,
    locationId
  };
}

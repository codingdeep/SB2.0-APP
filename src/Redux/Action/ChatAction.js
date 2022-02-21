import actionType from './typesOfAction';
// import actionType from '../../constants/constants';

export function AllChatApi(locationId) {
  console.log("AllChatApi")
  return {
    type: actionType.ABOUTCHAT,
    locationId: locationId
  }
}

import actionType from './typesOfAction';
// import actionType from '../../constants/constants';

export function GetAllClients(businessId, nav) {
  return {
    type: actionType.GETALLCLIENTS,
    BusinessId: businessId,
    nav: nav,
  };
}
export function GetPastAppionmtnts(locationId, id) {
  //alert(locationId)
  //alert(id)
  return {
    type: actionType.PASTAPPOINMENTS,
    locationId,
    id: id,
  };
}

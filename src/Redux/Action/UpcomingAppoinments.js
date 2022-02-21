import actionType from './typesOfAction';

export function GetUpcomingData(locationId, nav, clientId) {

  return {

    type: actionType.UPCOMINGAPPOINMENTS,
    locationId: locationId,
    nav: nav,
    clientId: clientId
  };
}

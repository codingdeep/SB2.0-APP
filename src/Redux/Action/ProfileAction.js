/* eslint-disable */
import actionType from './typesOfAction';

export function GetProfileInfo(techId, locationId) {
    return {
        type: actionType.GETPROFILEINFO,
        techId,
        locationId
    };
}
export function PostCheckInNotification(techId, checkInNotificaion) {
    return {
        type: actionType.PUTCLOCKINREMINDER,
        techId,
        checkInNotificaion
    };
}


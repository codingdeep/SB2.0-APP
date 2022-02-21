import actionType from './typesOfAction';

export function GetBookData(callback, locationId, nav, startDate, endDate) {

    return {
        type: actionType.GETBOOKDATA,
        locationId: locationId,
        nav: nav,
        StartDate: startDate,
        EndDate: endDate,
        callback
    };
}

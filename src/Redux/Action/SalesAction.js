import actionType from './typesOfAction';

export function GetSalesData(locationId, nav, startDate, endDate) {
    return {
        type: actionType.GETSALES,
        LocationId: locationId,
        nav: nav,
        StartDate: startDate,
        EndDate: endDate,

    };
}

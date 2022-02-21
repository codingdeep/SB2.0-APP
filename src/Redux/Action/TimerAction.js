import actionType from './typesOfAction';

export function SelectedTimeSheetData(locationId, nav, startDate, endDate) {
    return {
        type: actionType.GETTIMESHEETDATA,
        LocationId: locationId,
        nav: nav,
        StartDate: startDate,
        EndDate: endDate,

    };
}

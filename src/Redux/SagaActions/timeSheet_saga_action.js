/* eslint-disable */
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import actionType from '../Action/typesOfAction';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'


const apiPath = BaseApi;
export const getTechHoursData = async (locationId, startDate, endDate) => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    };
    var queryParams = "locId=" + locationId + "&start=" + startDate + "&end=" +endDate+ "&type=" + "all";


    return fetch(apiPath + "time-cards?" + queryParams, requestOptions).then(handleResponse)
}
export const _requestToAllTimeSheet = async (locationId, startDate, endDate) => {
    console.log("_requestToAllTimeSheet", startDate)
    let StartDate, EndDate;
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    }

    if (startDate == 'TODAY') {
        StartDate = Moment(),
            EndDate = Moment()
    }
    else if (startDate == 'YESTERDAY') {
        StartDate = Moment().subtract(1, 'day'),

            EndDate = Moment().subtract(1, 'day')
    }
    else if (startDate == 'THIS_WEEK') {
        console.log("requestToAllTimeSheet", startDate)
        StartDate = Moment().startOf('week'),
            EndDate = Moment()
    } else if (startDate == 'LAST_WEEK') {
        StartDate = Moment().subtract(1, 'weeks').startOf('week'),
            EndDate = Moment().subtract(1, 'weeks').endOf('week')
    } else if (startDate == 'THIS_MONTH') {
        StartDate = Moment().startOf('month')
        EndDate = Moment()
    } else if (startDate == 'LAST_MONTH') {
        StartDate = Moment().subtract(1, 'months').startOf('month'),
            EndDate = Moment().subtract(1, 'months').endOf('month')
    }
    else {
        StartDate = startDate,
            EndDate = endDate
    }
    var queryParams = "time-cards?" + "locId=" + locationId + "&start=" + Moment(StartDate).format("YYYY-MM-DD") + "&end=" + Moment(EndDate).format("YYYY-MM-DD") + "&type=" + "all";



    https://bianca-val0.cfapps.io/time-cards?locId=201&techId=302&start=2020-01-19&end=2020-01-22&type=all

    try {
        return fetch(apiPath +
            queryParams, requestOptions).then((response) => {
                if (response.status == 401 || response.status == 403) {
                    AsyncStorage.clear();
                    RNRestart.Restart();
                } else {
                    let dataWithDate = {
                        startDate: Moment(StartDate).format("YYYY-MM-DD"),
                        endDate: Moment(EndDate).format("YYYY-MM-DD"),
                    }
                    // response.push(StartDate)
                    return [dataWithDate,
                        response.json()]
                }
            }).catch((error) => {
                if (error.message === 'Timeout' || error.message === 'Network request failed') {
                    return Promise.reject(error.message);
                } else {
                    console.log("dfaddasdfadsf", error);
                    throw error;
                }

            })
    } catch (error) {
        console.log("requestToAllTimeSheeterror", error)
    }

}
const _weekWiseData = (requestToAllTimeSheet) => {
    Moment.locale("en");
    let weekTotalTime = {}
    let weekStartDate = []
    let mainStartDay;
    for (let key in requestToAllTimeSheet) {
        const newDay = Moment(requestToAllTimeSheet[key].period.from);
        const start_week_date = newDay.startOf('week').format("YYYY-MM-DD");
        if (!weekStartDate.includes(start_week_date)) {
            weekStartDate.push(start_week_date);
            mainStartDay = Moment(requestToAllTimeSheet[key].period.from).format("YYYY-MM-DD");
            try {
                let totalADay = Moment(Moment.duration(0)).format("HH:mm:ss")
                let totalADayWork = Moment(Moment.duration(0)).format("HH:mm:ss")

                Object.values(requestToAllTimeSheet[key].breaks).forEach(value => {
                    let to = value.period.to
                    let from = value.period.from
                    let val = Moment.utc(Moment(to, "YYYY MM DD HH:mm:ss").diff(Moment(from, "YYYY MM DD  HH:mm:ss"))).format("HH:mm:ss")

                    totalADay = Moment.duration(val).add(totalADay).asMilliseconds()
                    totalADay = Moment.utc(totalADay).format("HH:mm:ss")

                });
                let workTimeTo = requestToAllTimeSheet[key].period.to
                let workTimeFrom = requestToAllTimeSheet[key].period.from
                let timePreFor = Moment(workTimeTo, "YYYY MM DD HH:mm:ss").diff(Moment(workTimeFrom, "YYYY MM DD  HH:mm:ss"))

                totalADayWork = Moment.duration(timePreFor).asMilliseconds()


                totalADayWork = Moment.utc(totalADayWork).format("HH:mm:ss")

                weekTotalTime[mainStartDay] = {

                    weekStartDay: mainStartDay,
                    weeklyTotalHours: totalADayWork,
                    weeklyBreaks: totalADay,
                }
            } catch (error) {
            }
        } else {


            try {
                let totalADay = Moment(Moment.duration(0)).format("HH:mm:ss")
                let breakFinal = Moment(Moment.duration(0)).format("HH:mm:ss")
                let totalHour = Moment(Moment.duration(0)).format("HH:mm:ss")
                console.log("mainStartDay",
                    totalADay
                )
                Object.values(requestToAllTimeSheet[key].breaks).forEach(value => {
                    let to = value.period.to
                    let from = value.period.from
                    let val = Moment.utc(Moment(to, "YYYY MM DD HH:mm:ss").diff(Moment(from, "YYYY MM DD  HH:mm:ss"))).format("HH:mm:ss")
                    console.log("mainStartDayppp",
                        val
                    )
                    totalADay = Moment.duration(val).add(totalADay).asMilliseconds()
                    totalADay = Moment.utc(totalADay).format("HH:mm:ss")
                    console.log("mainStartDayppp222",
                        totalADay
                    )
                });


                totalHour = Moment.utc(Moment(requestToAllTimeSheet[key].period.to, "YYYY MM DD HH:mm:ss").diff(Moment(requestToAllTimeSheet[key].period.from, "YYYY MM DD  HH:mm:ss"))).format("HH:mm:ss")
                totalHour = Moment.duration(totalHour).add(weekTotalTime[mainStartDay].weeklyTotalHours).asMilliseconds()
                totalHour = Moment.utc(totalHour).format("HH:mm:ss")


                console.log("weeklyTotalHours",
                    mainStartDay,
                    "YYYYYYY",
                    weekTotalTime[mainStartDay].weeklyTotalHours,
                    "hhhhhh",
                    // finalBreak
                    totalHour
                )

                breakFinal = Moment.duration(totalADay).add(weekTotalTime[mainStartDay].weeklyBreaks).asMilliseconds();
                breakFinal = Moment.utc(breakFinal).format("HH:mm:ss")
                weekTotalTime[mainStartDay] = {
                    weekStartDay: mainStartDay,
                    // weekStartDay: requestToAllTimeSheet[key].period.from,
                    weeklyTotalHours: totalHour,
                    weeklyBreaks: breakFinal
                }
            } catch (error) {
            }
        }
    }
    return weekTotalTime;
}
export const _requestTodayTimeSheet = async locationId => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    }
    var queryParams = "time-cards?locId=" + locationId + "&type=open";
    // https://bianca-val0.cfapps.io/time-cards?locId=201&type=open
    return fetch(apiPath +
        queryParams, requestOptions).then((response) => {
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
}
export const GetAllTimeSheetData = function* (action) {
    try {
        const AllTimeSheet = yield call(_requestToAllTimeSheet, action.LocationId[0].id, action.StartDate, action.EndDate);
        let requestToAllTimeSheet = yield AllTimeSheet[1].then((res) => {
            return res
        })


        console.log('weeklyTotalHour', requestToAllTimeSheet);

        const weekWiseData = yield call(_weekWiseData, requestToAllTimeSheet);

        if (requestToAllTimeSheet != null) {
            yield put({
                type: actionType.GETTIMESHEETDATARESULT,
                TimeSheetData: requestToAllTimeSheet,
                WeekWiseData: weekWiseData,
                StartEndDate: AllTimeSheet[0]
                // newTaskSuccess: 'New Task Created',
            });
            //   action.nav.goBack();
        }
    } catch (error) {
        yield put({
            type: actionType.GETTIMESHEETDATAERROR,
            errorMsg: error,
        });
    }
};



export const GetTodayDetailsTime = function* (action) {
    // return GetSetTimer(_action);
    try {
        const requestTodayTimeSheet = yield call(_requestTodayTimeSheet, action.locationId);
        console.log('weeklyTotalHoursQQQQQ', requestTodayTimeSheet);

        if (requestTodayTimeSheet != null) {
            yield put({
                type: actionType.GETTODAYWORKTIMERESULT,
                // TimeSheetData: data,
                // WeekWiseData : weekWiseData
                // newTaskSuccess: 'New Task Created',
            });
            //   action.nav.goBack();
        }
    } catch (error) {
        yield put({
            type: actionType.GETTODAYWORKTIMEERROR,
            errorMsg: error,
        });
    }
};
function handleResponse(response) {
    console.log('RES',response)
    if (!response.ok) {
        //console.log(response.status)
        if(response.status == 401 || response.status == 403){
            AsyncStorage.clear();
            RNRestart.Restart();
        }else {
            return  Promise.reject(response);
        }

    }else {
        return  response.json();
    }

}

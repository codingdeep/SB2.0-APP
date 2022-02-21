/* eslint-disable */
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment';
import actionType from '../Action/typesOfAction';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi;

export const getTechSalesData = async (locationId, startDate, endDate) => {
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    };
    var queryParams = "locId=" + locationId + "&start=" + startDate + "&end=" +endDate;

    return fetch(apiPath + "visits/sales?" + queryParams, requestOptions).then(handleResponse)
}

export const _requestToApiSales = async (locationId, startDate, endDate) => {
    let StartDate, EndDate;
    const AuthHeader = await authHeader();
    const requestOptions = {
        method: 'GET',
        headers: AuthHeader,
        credentials: 'include'
    };

    if (startDate == 'TODAY') {
        StartDate = Moment(),
            EndDate = Moment()
    }
    else if (startDate == 'YESTERDAY') {
        StartDate = Moment().subtract(1, 'day'),
            console.log("YESTERDAY", StartDate)
        EndDate = Moment().subtract(1, 'day')
    }
    else if (startDate == 'THIS_WEEK') {
        StartDate = Moment().startOf('week'),
            EndDate = Moment()
    } else if (startDate == 'LAST_WEEK') {
        StartDate = Moment().subtract(1, 'weeks').startOf('week'),
            // moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD')
            EndDate = Moment().subtract(1, 'weeks').endOf('week')
        // EndDate = Moment()
    } else if (startDate == 'THIS_MONTH') {
        StartDate = Moment().startOf('month')
        EndDate = Moment()
    } else if (startDate == 'LAST_MONTH') {
        StartDate = Moment().subtract(1, 'months').startOf('month'),
            EndDate = Moment().subtract(1, 'months').endOf('month')
        // EndDate = Moment()
    }
    else {
        StartDate = startDate,
            EndDate = endDate
    }
    var queryParams = "locId=" + locationId + "&start=" + Moment(StartDate).format("YYYY-MM-DD") + "&end=" + Moment(EndDate).format("YYYY-MM-DD");

    https://bianca-val0.cfapps.io/visits/sales?locId=201&start=2020-01-05&end=2020-01-15
    return fetch(apiPath + "visits/sales?" +
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
}

export const _dayWiseData = async requestSalesApiData => {
    let allDayData = [];
    let Sat = [], Sun = [], Mon = [], Tue = [], Wed = [], Thu = [], Fri = [];
    for (let key in requestSalesApiData) {
        if (requestSalesApiData.hasOwnProperty(key)) {
            if (Moment(key).format("ddd") == "Sat") {
                Sat[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Sun") {
                Sun[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Mon") {
                Mon[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Tue") {
                Tue[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Wed") {
                Wed[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Thu") {
                Thu[key] = requestSalesApiData[key]
            }
            if (Moment(key).format("ddd") == "Fri") {
                Fri[key] = requestSalesApiData[key]
            }
        }
    }
    allDayData["Sat"] = Sat
    allDayData["Sun"] = Sun
    allDayData["Mon"] = Mon
    allDayData["Tue"] = Tue
    allDayData["Wed"] = Wed
    allDayData["Thu"] = Thu
    allDayData["Fri"] = Fri
    return allDayData;
}
export const _priceMaount = async requestSalesApiData => {
    let dayPriceMount = {}

    for (let key in requestSalesApiData) {
        let serviceAmount = 0;
        let productPurchaseAmount = 0;
        for (let index in requestSalesApiData[key]) {
            serviceAmount = serviceAmount + parseFloat(requestSalesApiData[key][index].serviceChargeAmount);
            productPurchaseAmount = productPurchaseAmount + parseFloat(requestSalesApiData[key][index].productPurchaseAmount)
            dayPriceMount[key] = {
                serviceChargeAmount: serviceAmount,
                productPurchaseAmount: productPurchaseAmount,
            }
        }
    }
    return dayPriceMount;
}
_weekWiseData = (eachDayPrice) => {
    Moment.locale("en");
    let weekPriceMount = {}
    let weekStartDate = []
    let mainStartDay;
    for (let key in eachDayPrice) {
        const newDay = Moment(key);
        const start_week_date = newDay.startOf('week').format("YYYY-MM-DD");
        if (!weekStartDate.includes(start_week_date)) {
            weekStartDate.push(start_week_date);
            mainStartDay = Moment(key).format("YYYY-MM-DD");
            console.log("_weekWiseDatakey", mainStartDay);
            weekPriceMount[mainStartDay] = {
                serviceChargeAmount: eachDayPrice[key].serviceChargeAmount,
                productPurchaseAmount: eachDayPrice[key].productPurchaseAmount,
            }
        } else {
            weekPriceMount[mainStartDay] = {
                serviceChargeAmount: weekPriceMount[mainStartDay].serviceChargeAmount + eachDayPrice[key].serviceChargeAmount,
                productPurchaseAmount: weekPriceMount[mainStartDay].productPurchaseAmount + eachDayPrice[key].productPurchaseAmount,
            }
        }
    }
    return weekPriceMount;
}

export const GetSalesData = function* (action) {

    if (action.nav.state.routeName == "StartEndDate") {
        action.nav.navigate('Sales');
    }

    try {
        const SalesDataWithDate = yield call(_requestToApiSales, action.LocationId[0].id, action.StartDate, action.EndDate);
        let requestSalesApiData = yield SalesDataWithDate[1].then((res) => {
            return res
        })


        const priceMaount = yield call(_priceMaount, requestSalesApiData);
        const weekWiseData = yield call(_weekWiseData, priceMaount)


        if (requestSalesApiData != null) {
            yield put({
                type: actionType.GETSALESRESULT,
                SalesData: requestSalesApiData,
                // DayWiseData: dayWiseData
                DayPriceMount: priceMaount,
                WeekWiseData: weekWiseData,
                SalesLoader: true,
                StartEndDate: SalesDataWithDate[0]
            });
        }
    } catch (error) {
        yield put({
            type: actionType.GETSALESERROR,
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

/* eslint-disable */
import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import authHeader from '../../components/ImportantFunction/authHeader';
import Moment from 'moment';
import actionType from '../Action/typesOfAction';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import { toast } from '../../components/Toast/Toast'

const apiPath = BaseApi
export const _requestToApiBook = async (locationId, startDate, endDate) => {
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
        EndDate = Moment()
    }
    else if (startDate == 'THIS_WEEK') {
        StartDate = Moment().startOf('week'),
            EndDate = Moment()
    } else if (startDate == 'LAST_WEEK') {
        StartDate = Moment().subtract(1, 'weeks').startOf('week'),
            EndDate = Moment()
    } else if (startDate == 'THIS_MONTH') {
        StartDate = Moment().startOf('month')
        EndDate = Moment().endOf('month')
    } else if (startDate == 'LAST_MONTH') {
        StartDate = Moment().subtract(1, 'months').startOf('month'),
            EndDate = Moment()
    }
    else {

        StartDate = startDate;

        EndDate = endDate;
    }
    var queryParams = "visits/calendar?type=tech&locId=" + locationId + "&start=" + Moment(StartDate).format("YYYY-MM-DD") + "&end=" + Moment(EndDate).format("YYYY-MM-DD");

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

export const _dayWiseData = async requestBookApiData => {
    let allDayData = [];
    let TodalDayData = {}
    for (let value of requestBookApiData) {
        if (!allDayData.includes(Moment(value.start).format("YYYY-MM-DD"))) {
            allDayData.push(Moment(value.start).format("YYYY-MM-DD"))
            TodalDayData[Moment(value.start).format("YYYY-MM-DD")] = [
                {
                    ...value
                }
            ]
        } else {
            TodalDayData[Moment(value.start).format("YYYY-MM-DD")].push(value)
        }
    }
    return TodalDayData;
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

export const GetBookData = function* (action) {

    console.log("requestBookApiData", action)
    try {
        const requestBookApiData = yield call(_requestToApiBook, action.locationId, action.StartDate, action.EndDate);
        console.log("requestBookApiData", requestBookApiData)
        action.callback(requestBookApiData);

        const dayWiseData = yield call(_dayWiseData, requestBookApiData);
        console.log("requestBookApiData", dayWiseData)
        // const priceMaount = yield call(_priceMaount, requestSalesApiData);
        // const weekWiseData = yield call(_weekWiseData, priceMaount)


        if (requestBookApiData != null) {
            yield put({
                type: actionType.GETBOOKDATARESULT,
                BookData: dayWiseData,
                BookLoader: true,
            });
        }
    } catch (error) {
        yield put({
            type: actionType.GETBOOKDATAERROR,
            errorMsg: error,
        });
    }
};

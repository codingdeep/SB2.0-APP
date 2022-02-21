/* eslint-disable */
import React, { Component } from 'react';
import { Container, Label } from 'native-base';
import { connect } from 'react-redux';
import {
    StatusBar,
    View,
    PermissionsAndroid,
    Platform,
    AppState,
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {
    StartClock,
    ClockActivator,
    ClockRealtimeCheck,
    GetOpenCardInfo,
    BreakOnOff
} from '../../Redux/Action/CLockActions';
import styles from './styles';
import HeaderComponent from '../Header/header';
import TouchAbleButtom from './TouchableButton/touchableButton';
import CustomButtom from './CustomButtom/customButtom';
import StopWatch from './StopWatch/stopWatch';

import Geolocation from 'react-native-geolocation-service';
import CustomFooter from './CustomFooter/customFooter';
import AsyncStorage from '@react-native-community/async-storage';
import LOADER from '../Loader/Loader';

import moment from 'moment';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { Appearance, useColorScheme } from 'react-native-appearance';
import { colors } from '../../Theme';
import { helperFunctions } from "../../_helpers";
const defaultMode = Appearance.getColorScheme() || 'light';


class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            Timeron: true,
            timer: null,
            minutes_Counter: props.minutes_Counter,
            seconds_Counter: props.seconds_Counter,
            Hour_Counter: props.Hour_Counter,
            BreakON: true,
            period_from: '',
            loader: true,
            appState: AppState.currentState,
            // func1: this.onButtonStart.bind(this),


            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            startTime: 0,
            ShowStopWatch: false,
            CheckInOrCheckOut: false,
            breakId: "",
            getOpenCardData: this.checkIfOpenOrNot.bind(this)
        };

        this.toggleTimer = this.toggleTimer.bind(this);
        // this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        // this.resetStopwatch = this.resetStopwatch.bind(this);

        // props.dispatch(ClockRealtimeCheck());

        this.navigationWillFocusListener = props.navigation.addListener(
            "willFocus",
            () => {
                this.checkIfOpenOrNot(),
                    this.startStopWatch()
            }
        );
    }

    async componentDidMount() {
        await this.checkIfOpenOrNot(),
            this.startStopWatch()
    }

    componentWillUnmount() {

    }
    static getDerivedStateFromProps(props, state) {
        console.log("ASDFSADFASDFASDF");

        const { locationId, ShowStopWatch, CheckInInfo, CardIsOpen, CardId, StopWatchStartTime, breakId, breakCheck } = props;
        if (props.breakCheck == true) {
            return {
                model: state.getOpenCardData()
            }
        }
        console.log("CardIsOpenCardIsOpen", CardIsOpen)
        return {
            locationId,
            CheckInInfo,
            ShowStopWatch,
            CardIsOpen,
            CardId,
            StopWatchStartTime,
            breakId,

        }
    }

    _getStopWatchPreTime = () => {

    }
    checkIfOpenOrNot = () => {
        const { locationId } = this.props;
        this.props.dispatch(GetOpenCardInfo(locationId));
    }
    toggleCheckInorNot = () => {
        this.setState({ CheckInOrCheckOut: !this.state.CheckInOrCheckOut })
    }
    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }


    _GeTSetLocation = async () => {


        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
            this.getCurrentLocation();

        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Device current location permission',
                    message: 'Allow app to get your current location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    getCurrentLocation = () => {
        const { CardIsOpen, CardId } = this.state
        Geolocation.getCurrentPosition(
            position => {

                this.props.dispatch(
                    StartClock(
                        this.props.locationId,
                        position.coords.latitude,
                        position.coords.longitude,
                        CardIsOpen,
                        CardId
                    ),
                )

            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }



    onButtonStart = async (pro, info) => {
        let period_from = moment().format('YYYY-MM-DDThh:mm:ss');

        let sta_rt = true;



        this.setState({
            Timeron: false,
            BreakON: true,
            period_from: period_from,
            stopwatchStart: true,
        });
        this._GeTSetLocation();
    };

    onButtonStop = () => {
        // this.toggleStopwatch()

        this._GeTSetLocation();
        this.setState({
            stopwatchStart: false,
        })
    };



    CurrentPosition = async () => {
        const { CardIsOpen, CardId, breakId } = this.state
        Geolocation.getCurrentPosition(
            position => {

                this.props.dispatch(
                    BreakOnOff(
                        this.props.locationId,
                        position.coords.latitude,
                        position.coords.longitude,
                        CardIsOpen,
                        CardId,
                        breakId,
                    ),
                )

            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }
    onBreakStart = async () => {
        let self = this
        await this.CurrentPosition("BreakStart")
        // .then(() => {
        //     self.checkIfOpenOrNot()
        // })

        this.setState({
            BreakON: false
        })

    };
    onBreakStop = async (pro, info) => {
        let self = this
        await this.CurrentPosition("BreakStop")
        // .then(() => self.checkIfOpenOrNot()
        // )
        this.setState({
            BreakON: true
        })


    };

    todayDetailsTime = () => {


    }
    toggleTimer() {
        console.log("toggleTimer")
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    // resetTimer() {
    //   this.setState({ timerStart: false, timerReset: true });
    // }
    startStopWatch = () => {
        if (this.state.CardIsOpen == false) {
            this.setState({
                stopwatchStart: true,
            });
        }

    }
    toggleStopwatch() {
        // console.log("toggleStopwatch")
        // this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    }

    getFormattedTime(time) {
        console.log("getFormattedTime", time)
        this.currentTime = time;
    };

    render() {
        const { StopWatchStartTime, breakId, stopwatchStart } = this.state
        console.log('stopwatchStartstopwatchStart', stopwatchStart);
        return this.props.ShowStopWatch == false ? (
            <LOADER />
        ) : (
                <Container style={styles.pro_background}>
                    <View style={{ justifyContent: "center", ...helperFunctions.headerHeight() }}>
                        <HeaderComponent Left={"false"} title="Time Clock" {...this.props}
                            color={defaultMode === 'dark' ? '#ffffff' : "#0000ff"}
                        />
                    </View >
                    <View style={{ flex: 8 }}>
                        <View style={{ flex: 2, marginBottom: 20 }} >

                            {this.state.CardIsOpen == false ? (
                                <StopWatch
                                    start={this.state.stopwatchStart}
                                    startTime={
                                        StopWatchStartTime != null ? StopWatchStartTime : 0
                                    }

                                />
                            ) : null
                            }
                        </View >

                        <View style={{ flex: .6 }}></View>

                        <TouchAbleButtom
                            Timeron={this.state.CardIsOpen}
                            BreakON={
                                // this.state.BreakON
                                this.state.breakId == "" ? true : false
                            }
                            clockStart={
                                () => this.onButtonStart()
                            }
                            clockStop={
                                () => this.onButtonStop()
                            }
                        />
                        <View style={{ flex: 0.6 }} ></View>
                        <CustomButtom
                            Timeron={this.state.CardIsOpen}
                            clockStart={
                                () => this.onButtonStart()
                            }
                            onButtonStop={
                                () => this.onButtonStop()
                            }

                            onBreakStart={
                                () => {
                                    this.onBreakStart()
                                    this.state.BreakON
                                }
                            }
                            onBreakStop={
                                () => { this.onBreakStop() }
                            }
                            BreakON={
                                // this.state.BreakON
                                this.state.breakId == "" ? true : false
                            }
                        />


                        <Label style={{ height: 5 }} />
                    </View>
                </Container >
            );
    }
}

const mapStateProps = state => {
    const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations;
    const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;
    //state.LoggedData.locationId.id;
    const LOGEDUSER = state.LoggedData.LOGEDUSER;
    const LOGEDDATA = state.LoggedData.LOGEDDATA;

    const minutes_Counter = state.Clock.minutes_Counter;
    const seconds_Counter = state.Clock.seconds_Counter;
    const Hour_Counter = state.Clock.Hour_Counter;
    const loader = state.Clock.loader;
    const status = state.Clock.status;
    const clock_action = state.Clock.clock_action;


    const CheckInInfo = state.Clock.CheckInInfo;
    const CardIsOpen = state.Clock.CardIsOpen;
    const CardId = state.Clock.CardId;
    const ShowStopWatch = state.Clock.ShowStopWatch;
    const StopWatchStartTime = state.Clock.StopWatchStartTime;
    const breakId = state.Clock.breakId;
    const breakPostId = state.Clock.breakPostId;
    const breakCheck = state.Clock.breakCheck;
    console.log(StoreLocationInfo)
    return {
        StoreLocationInfo,
        locationId,

        LOGEDUSER,
        LOGEDDATA,
        minutes_Counter,
        seconds_Counter,
        Hour_Counter,
        loader,
        status,
        clock_action,

        CheckInInfo,
        ShowStopWatch,
        CardIsOpen,
        CardId,
        StopWatchStartTime,
        breakId,
        breakPostId,
        breakCheck
    };
};

export default connect(mapStateProps)(CheckIn);

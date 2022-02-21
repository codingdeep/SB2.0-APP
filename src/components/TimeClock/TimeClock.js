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
  TouchableOpacity
} from 'react-native';
import {
  StartClock,
  ClockActivator,
  ClockRealtimeCheck,
} from '../../Redux/Action/CLockActions';
import styles from './styles';
import HeaderComponent from '../Header/header';
import TouchAbleButtom from './TouchableButton/touchableButton';
import CustomButtom from './CustomButtom/customButtom';
import StopWatch from './StopWatch/stopWatch';

import Geolocation from 'react-native-geolocation-service';
import CustomFooter from './CustomFooter/customFooter';
import AsyncStorage from '@react-native-community/async-storage';

import moment from 'moment';

class TimeClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      Timeron: false,
      timer: null,
      minutes_Counter: props.minutes_Counter,
      seconds_Counter: props.seconds_Counter,
      Hour_Counter: props.Hour_Counter,
      BreakON: true,
      period_from: '',
      loader: true,
      appState: AppState.currentState,
      func1: this.onButtonStart.bind(this),
    };

    props.dispatch(ClockRealtimeCheck());
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._GeTSetLocation('start');
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    this.setState({ appState: nextAppState });

    if (nextAppState === 'background') {
      console.log('BGacticeve');
      let DaTaNow = await AsyncStorage.getItem('Clock_Time_Data');
      let DaTa = JSON.parse(DaTaNow);

      let Time_Pause = moment(new Date()).format('hh:mm');

      let result = [];
      let final_result = {
        start_time: DaTa[DaTa.length - 1].start_time,
        end_time: DaTa[DaTa.length - 1].end_time,
        daTe: DaTa[DaTa.length - 1].daTe,
        sec: this.state.seconds_Counter,
        min: this.state.minutes_Counter,
        hour: this.state.Hour_Counter,
        status: DaTa[DaTa.length - 1].status,
        pause_time: Time_Pause,
      };
      result.push(final_result);
      // Do something here on app background.

      if (this.state.Timeron == true && this.state.BreakON == true) {
        const Save_Clock_DB = await AsyncStorage.setItem(
          'Clock_Time_Data',
          JSON.stringify(result),
        );
      }
    }

    if (nextAppState === 'active') {
      console.log('acticeve');
      this.setState({
        loader: true,
      });
      this.props.dispatch(ClockRealtimeCheck());
    }

    if (nextAppState === 'inactive') {
      // Do something here on app inactive mode.
      console.log('App is in inactive Mode.');
    }
  };

  _GeTSetLocation = async chker => {
    // console.log('chker', chker);

    if (Platform.OS === 'ios') {
      this.getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              let period_to = moment(new Date()).format('YYYY-MM-DDThh:mm:ss');
              chker == 'end'
                ? this.props.dispatch(
                  StartClock(
                    this.props.LOGEDUSER,
                    this.props.LOGEDDATA,
                    this.props.locationId,
                    this.state.latitude,
                    this.state.longitude,
                    position.coords.latitude,
                    position.coords.longitude,
                    this.state.period_from,
                    period_to,
                  ),
                )
                : null;
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  onButtonStart = async (pro, info) => {
    let period_from = moment().format('YYYY-MM-DDThh:mm:ss');
    alert(period_from)
    let sta_rt = true;

    info == undefined
      ? this.props.dispatch(
        ClockActivator(
          true,
          this.state.seconds_Counter,
          this.state.minutes_Counter,
          this.state.Hour_Counter,
        ),
      )
      : null;

    this.setState({
      Hour_Counter: pro == 'active' ? info[0] : this.state.Hour_Counter,
      minutes_Counter: pro == 'active' ? info[1] : this.state.minutes_Counter,
    });

    let timer = setInterval(() => {
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter,
        hour = this.state.Hour_Counter;

      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }

      if (Number(this.state.minutes_Counter) == 59) {
        hour = (Number(this.state.Hour_Counter) + 1).toString();
        count = '00';
      }

      this.setState({
        Hour_Counter: hour.length == 1 ? '0' + hour : hour,
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num,
      });
    }, 1000);
    this.setState({ timer });

    this.setState({ Timeron: true, BreakON: true, period_from: period_from });
    this._GeTSetLocation('start');
  };

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.props.dispatch(
      ClockActivator(
        false,
        this.state.seconds_Counter,
        this.state.minutes_Counter,
        this.state.Hour_Counter,
      ),
    );
    this._GeTSetLocation('end');
  };

  onButtonPause = () => {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      BreakON: false,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (state.Timeron == false && props.status == 'active') {
      return {
        minutes_Counter: props.minutes_Counter,
        seconds_Counter: props.seconds_Counter,
        Hour_Counter: props.Hour_Counter,
        Timeron: true,
        model: state.func1('active', [
          props.Hour_Counter,
          props.minutes_Counter,
          props.seconds_Counter,
        ]),
      };
    }

    if (props.clock_action == 2 && state.Timeron == true) {
      return {
        Timeron: false,
      };
    }
    return {
      loader: props.loader,
    };
  }
  todayDetailsTime = () => {
    const { locationId } = this.props

  }

  render() {
    //console.log('sta', this.state);
    return (
      <Container style={styles.pro_background}>
        <StatusBar hidden />
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <HeaderComponent title="Time Clock" {...this.props} />
        </View>
        <View style={{ flex: 2 }}>
          {this.state.Timeron == true ? (
            <StopWatch
              counter={this.state.seconds_Counter}
              minite={this.state.minutes_Counter}
              hour={this.state.Hour_Counter}
            // Timeron={this.state.Timeron}
            />
          ) : null}
        </View>
        {/* Fake View */}
        <View style={{ flex: 0.6 }}></View>
        {/* End Fake View */}
        {/* Tuchable circel */}
        <TouchAbleButtom
          Timeron={this.state.Timeron}
          clockStart={() => this.onButtonStart()}
          clockStop={() => this.onButtonPause()}
        />
        {/* Fake View */}
        <View style={{ flex: 0.6 }}></View>
        {/*End Fake View */}
        {/* Start Stop Break */}
        <CustomButtom
          Timeron={this.state.Timeron}
          clockStart={() => this.onButtonStart()}
          onButtonStop={() => this.onButtonStop()}
          onButtonPause={() => this.onButtonPause()}
          BreakON={this.state.BreakON}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TimesheetViewNew')}
          style={{
            backgroundColor: '#424E9C',
            width: 167,
            height: 38,
            justifyContent: 'center',
            borderRadius: 20,
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Text>View</Text>
        </TouchableOpacity>
        {/* Custom Footer  */}
        <CustomFooter props={this.props} />
        <Label style={{ height: 5 }} />
      </Container>
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
  };
};

export default connect(mapStateProps)(TimeClock);

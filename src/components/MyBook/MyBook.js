/* eslint-disable */
import React, { Component } from 'react';
import { white, red } from 'ansi-colors';
import _ from 'lodash';
import { Container, Label, Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather'


import {
  Platform,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
// import { Calendar } from 'react-native-calendars';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from 'react-native-calendars';

import HeaderComponent from '../Header/header';
import styles from './styles';
import Schedule from './schedule';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { GetBookData } from '../../Redux/Action/MyBookAction';
import LOADER from '../Loader/Loader';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import { useTheme } from '../../Theme/hooks'
import { helperFunctions } from '../../_helpers';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import {Input} from "react-native-elements";
const defaultMode = Appearance.getColorScheme() || 'light';
const { colors } = useTheme()

// ...
const today = new Date().toISOString().split('T')[0];

class MyBook extends Component {
  constructor(props) {
    //console.log('PPPP', props.navigation.state)
    super(props);
    this.state = {
      startDay: '',
      endDay: '',
      marked: {},
      selectedDayData: {},
      date: null,
      startDayMonth: null,
      endDayMonth: null,
      GetBookData: null,
      ClientInfo: props.navigation.state.params != undefined ? props.navigation.state.params.ClientInfo : ''

    };





  }

  componentDidMount() {
    if(this.props.apptReload != undefined){
      this.props.apptReload().setRetrive(this.fcmApptReload)
    }
    let startDayMonth = Moment(new Date()).startOf('month');;
    // let startDayMonth = month.dateString;
    var endDate = Moment(startDayMonth).endOf('month');
    let endDayMonth = Moment(endDate).format('YYYY-MM-DD');
    this.setState({
      startDayMonth,
      endDayMonth,
    });
    this.props.dispatch(
      GetBookData(
        data => {

          //console.log("yyyyyyddddddd", this.props);

          setTimeout(() => {
            this.setState({
              BookLoader: this.props.BookLoader,
              GetBookData: this.props.GetBookData
            })
            this.onDateChanged(Moment(new Date()).format("YYYY-MM-DD"))
          }, 500);

        },
        this.props.locationId,
        this.props.navigation,
        startDayMonth,
        endDayMonth,
      ),
    );

  }
  componentWillUnmount() {

    if(this.props.apptReload != undefined){
      this.props.apptReload().setRetrive(null)
    }
  }

  fcmApptReload = (data) => {
    //alert('Hello')
    let bookedTime = Moment(data.bookedTime).format("YYYY-MM-DD")
    if (Moment(bookedTime).isBetween(this.state.startDayMonth, this.state.endDayMonth)) {
      //console.log("fcmApptReload", data);
      this.onMonthChange(this.state.startDayMonth)
    }
  }

  reloadData = () => {
    let self = this;
    let uiCallback = () => {
      setTimeout(() => {
        //console.log("yyyyyllllll", this.state.date);
        if (self.state.date) {
          self.onDateChanged(self.state.date, '');
        }
      }, 1000);
    };
    return function () {
      if (self.state.startDayMonth) {
        self.props.dispatch(
          GetBookData(
            data => {
              setTimeout(() => {
                self.setState({
                  GetBookData: self.props.GetBookData
                })
              }, 500);

              uiCallback();
            },
            self.props.locationId,
            self.props.navigation,
            self.state.startDayMonth,
            self.state.endDayMonth,
          ),
        );
      } else {
        self.props.dispatch(
          GetBookData(
            data => {
              setTimeout(() => {
                self.setState({
                  GetBookData: self.props.GetBookData
                })
              }, 500);
              uiCallback();
            },
            self.props.locationId,
            self.props.navigation,
            self.state.startDayMonth,
            self.state.endDayMonth,
          ),
        );
      }
    };
  };

  static getDerivedStateFromProps(props, state) {
    //console.log('pdssadd', props);
    const GetBookData = props.GetBookData;
    const BookLoader = props.BookLoader;
    return {
      // GetBookData,
      // BookLoader,
    };
  }
  onDateChanged = (date, updateSource) => {
    ///console.log("yyyyyonDateChanged", date, "ddddd", new Date());

    const { GetBookData } = this.state;
    let selectedDay = date;
    let selectedDayData = {};

    //console.log("yyyyyGetBookData", GetBookData, "55555", date);

    selectedDayData = Object.entries(GetBookData).filter(
      entries => entries[0] == selectedDay,
    );

    this.setState({
      selectedDayData: selectedDayData,
      date,
    }, () => {
      //console.log('SEL', this.state.selectedDayData)
    });

  };


  onMonthChange = (month, updateSource) => {
    //console.log("monthmonth", month);

    this.setState({
      GetBookData: null,
    });
    let startDayMonth = Moment(month.dateString).startOf('month');;
    // let startDayMonth = month.dateString;
    var endDate = Moment(startDayMonth).endOf('month');
    let endDayMonth = Moment(endDate).format('YYYY-MM-DD');
    this.setState({
      startDayMonth,
      endDayMonth,
    });

    this.props.dispatch(
      GetBookData(
        data => {
          setTimeout(() => {
            this.setState({

              GetBookData: this.props.GetBookData
            })
            this.onDateChanged(Moment(month.dateString).format("YYYY-MM-DD"))
            // this.getMarkedDates()
          }, 500);

        },
        this.props.locationId,
        this.props.navigation,
        startDayMonth,
        endDayMonth,
      ),
    );
  };

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    //console.log('item', item);
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const { GetBookData } = this.state;


    const marked = {};
    Object.entries(GetBookData).forEach(entries => {
      // only mark dates with data
      const greenValue =
        250 - (entries[1].length < 4 ? entries[1].length : 3) * 50;
      marked[entries[0]] = {
        ...this.getTheme(),
        dotColor: `rgb(0,${greenValue},0)`,
        marked: true,
      };
    });
    //console.log("yyyyyMarkedDate", marked);
    return marked;
  };

  _onDayPress = day => {
    const marked = {};
    let selectedDay = day.dateString;
    //console.log('yyyy_onDayPress', 'sasdfafd', day.dateString);

    if (!this.state.startDay || !this.state.endDay) {
      if (this.state.startDay) {
        this.setState({
          endDay: selectedDay,
        });
      } else {
        this.setState({
          startDay: selectedDay,
        });
      }
    }
  };

  getTheme = () => {
    const { GetBookData } = this.state;
    //console.log("yyyygetTheme");

    // var result =


    //   console.log("resultresult", result);
    // console.log("adsfhsdfhasdfafdaf", this.state.GetBookData)
    const themeColor = '#979797';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = colors.textColor;
    const textSectionTitleColor = colors.textColor;
    const white = '#ffffff';
    const selectedDayBackgroundColor = '#FCBF24';
    const selectedDayTextColor = '#0E1317';
    const dotColor = 'rgb(0,100,0)';
    // Object.entries(GetBookData).forEach(entries => {
    //   // console.log("resultresult", entries);
    //   if (entries[1].length > 1) {
    //     return 2;
    //   }

    // });

    return {
      // backgroundColor: '#ffffff',
      calendarBackground: colors.background,
      // arrows
      //   arrowColor: black,
      // arrowStyle: { width: 24, height: 24},
      // month
      monthTextColor: black,
      textMonthFontSize: 14,
      textMonthFontFamily: 'HelveticaNeue',
      // textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: textSectionTitleColor,
      textDayHeaderFontSize: 14,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 14,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '400',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: selectedDayBackgroundColor,
      selectedDayTextColor: selectedDayTextColor,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: dotColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {
        // marginTop: -2,
        height: 10,
        width: 10,
        borderRadius: 5,
        //  dotStyle: {marginTop: -2}
        // marginBottom: 50
      },
      'stylesheet.calendar': {
        borderWidth: 0,
      },
      'stylesheet.calendar.header': {
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.background,
          // bordderWidth: 0
        },
      },
    };
  };



  addingAppointment = (times) => {

    let self = this;
    if (this.props.navigation.state.params != undefined) {
      self.props.navigation.navigate(
        'AppointmentBook',
        {
          selectedDayData: this.state.selectedDayData.length > 0 && this.state.selectedDayData[0][1][0],
          clientRoute: 'MyBook',
          ClientInfo: this.props.navigation.state.params.ClientInfo,
          reloadData: () => this.reloadData(),
          times: times,

        },
      )
    } else {
      self.props.navigation.navigate(
        'AppointmentBook',
        {
          selectedDayData: this.state.selectedDayData.length > 0 && this.state.selectedDayData[0][1][0],
          clientRoute: 'MyBook',
          reloadData: () => this.reloadData(),
          times: times,

        },
      )
    }
  }





  gotoEdit = (value) => {
    //console.log("yyyyyyydddd", value);

    if (this.props.customerBookingAllowed == true) {
      this.props.navigation.navigate('AppointmentBook', {
        realUpdate: true,
        visit: value.id,
        calendar: true,
        status: value.status,
        reloadData: () => this.reloadData(),
        ClientInfo: {
          fullName: value.clientName,
          mobileNumber: value.clientNumber,
          id: '',
          imageUrl: ''
        }
      })
    }
  }


  render() {
    let self = this;
    const { GetBookData, BookLoader, selectedDayData } = this.state;


    console.log('GetBookData',GetBookData)




    return BookLoader == undefined ? (
      <LOADER />
    ) : (
        <Container style={{ ...styles.pro_background }}>
          <View style={{ justifyContent: "center", ...helperFunctions.blackWhite(), ...helperFunctions.headerHeight() }}>
            {this.props.navigation.state.params != undefined ? (<HeaderComponent color={defaultMode === 'dark' ? 'white' : '#424E9C'} title="My Book" {...this.props} />) : (<HeaderComponent color={defaultMode === 'dark' ? 'white' : '#424E9C'} Left={"false"} title="My Book" {...this.props} />)}

          </View>

          <View style={{ flex: 8 }}>
            <View style={{ flex: 4 }}>
              <CalendarProvider

                // date={new Date()}
                onDateChanged={this.onDateChanged}
                // onDateChanged={(day) => { this._onDayPress(day) }}

                onMonthChange={this.onMonthChange}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                theme={{ borderWidth: 0, }}
              // showTodayButton
              // disabledOpacity={1}
              // todayBottomMargin={16}

              >
                {GetBookData != null && (
                  <ExpandableCalendar
                    horizontal={true}
                    // hideArrows
                    // disablePan
                    // hideKnob
                    // initialPosition={ExpandableCalendar.positions.OPEN}
                    firstDay={0}
                    markedDates={this.getMarkedDates()}
                    theme={this.getTheme()}
                    leftArrowImageSource={require('../../Assets/myBook/ic-chevron-left.png')}
                    rightArrowImageSource={require('../../Assets/myBook/ic-chevron-right.png')}
                    calendarStyle={styles.calendar}
                    headerStyle={styles.calendarHeader} // for horizontal only
                  // disableWeekScroll
                  />
                )}


                <Label style={{ height: 20 }} />
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    {Object.values(selectedDayData).map(function (values) {
                      //console.log('yyyyyselectedDayData', values);
                      return (
                        <View key={values[0]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              ...helperFunctions.themeBg(),
                              paddingVertical: 0,
                              paddingHorizontal: 10
                            }}>
                            <View>
                              <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.mediumFont(), color: 'white' }}>
                                {helperFunctions.formatDateTimeWithDay(Moment(values[0]), 'latest')}
                              </Text>
                            </View>

                          </View>
                          <Label style={{ height: 10 }} />

                          <Label style={{ height: 10 }} />
                          {/* {values[1].map((val, index) => (
                            <Schedule value={val} key={index} />
                          ))} */}
                          <Schedule selectedDay={self.state.selectedDayData} gotoEdit={self.gotoEdit} addingAppointment={self.addingAppointment} value={values[1]} />
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </CalendarProvider>
            </View>

            {/* <View style={{ flex: 1 }}></View> */}
          </View>
          <View style={{ height: 62 }}></View>

        </Container>
      );
  }
}

const mapStateProps = state => {
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations;
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;

  const GetBookData = state.MyBookReducer.GetBookData;
  const BookLoader = state.MyBookReducer.BookLoader;
  const customerBookingAllowed = state.LoggedData.customerBookingAllowed;

  return {
    StoreLocationInfo,
    locationId,
    GetBookData,
    BookLoader,
    customerBookingAllowed
  };
};

export default connect(mapStateProps)(MyBook);

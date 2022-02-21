/* eslint-disable */
import React, {Component} from 'react';
import {white, red} from 'ansi-colors';
import _ from 'lodash';
import {Container, Label, Button} from 'native-base';
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
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {GetBookData} from '../../Redux/Action/MyBookAction';
import LOADER from '../Loader/Loader';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import {useTheme} from '../../Theme/hooks'
import {helperFunctions} from '../../_helpers';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {_requestToApiBook} from '../../Redux/SagaActions/MyBookSagaAction'
import {abs} from "react-native-reanimated";

const defaultMode = Appearance.getColorScheme() || 'light';
const {colors} = useTheme()

// ...
const today = new Date().toISOString().split('T')[0];

class MyBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDay: '',
            endDay: '',
            marked: {},
            selectedDayData: {},
            date: null,
            startDayMonth: null,
            endDayMonth: null,
            month: true,
            startDate: Moment().startOf('month').format('YYYY-MM-DD'),
            endDate: Moment().endOf('month').format('YYYY-MM-DD'),
            fillteredDate: Moment().format('YYYY-MM-DD'),
            GetBookData: {},

        };

        this.navigationWillFocusListener = props.navigation.addListener(
            "willFocus",
            () => {

                this.getCalendarData(this.props.locationId, Moment(new Date(this.state.fillteredDate)).startOf('month').format('YYYY-MM-DD'), Moment(new Date(this.state.fillteredDate)).endOf('month').format('YYYY-MM-DD'), this.state.fillteredDate)

            }
        );

    }

    componentDidMount() {


        this.getCalendarData(this.props.locationId, this.state.startDate, this.state.endDate, this.state.fillteredDate)

    }

    getCalendarData = (id, start, end, fillteredDate) => {
        _requestToApiBook(id, start, end, fillteredDate).then(res => {
            const TodayAllData = this.getBookedData(res);
            this.setState({
                GetBookData: TodayAllData
            }, () => {
                this.getFilteredData(fillteredDate);
            })
        })
    }
    getFilteredData = (date) => {
        const {GetBookData} = this.state;
        let selectedDay = date;
        let selectedDayData = {};
        selectedDayData = Object.entries(GetBookData).filter(
            entries => entries[0] == selectedDay,
        );
        this.setState({
            selectedDayData: selectedDayData,
            date,
            fillteredDate: date
        }, () => {
            //
        });
    }

    getBookedData = (data) => {

        let allDayData = [];
        let TodalDayData = {}
        for (let value of data) {
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


        return TodalDayData

    }


    onDateChanged = (date, updateSource = '') => {

        if (date) {

            const mn = parseInt(Moment.duration(Moment(date)).asMinutes() / 60);
            const currentMinutes = parseInt(Moment.duration(Moment()).asMinutes() / 60)
            if (updateSource === 'dayPress') {
                const {GetBookData} = this.state;
                let selectedDay = date;
                let selectedDayData = {};
                selectedDayData = Object.entries(GetBookData).filter(
                    entries => entries[0] == selectedDay,
                );
                this.setState({
                    selectedDayData: selectedDayData,
                    date,
                    fillteredDate: date
                }, () => {
                    //
                });
            } else {
                if (currentMinutes > mn) {
                    this.getCalendarData(this.props.locationId, date, Moment(date).subtract(37, 'days').format("YYYY-MM-DD"), this.state.fillteredDate)
                } else if (currentMinutes < mn) {

                    this.getCalendarData(this.props.locationId, date, Moment(date).add(37, 'days').format("YYYY-MM-DD"), date)
                }
            }

        }


    };

    onMonthChange = (month, updateSource) => {

        this.setState({
            BookLoader: false,
        });
        //console.log('month', month);
        //console.log('month', updateSource);
        let startDayMonth = month.dateString;
        var endDate = Moment(startDayMonth).endOf('month');
        let endDayMonth = Moment(endDate).format('YYYY-MM-DD');

        _requestToApiBook(this.props.locationId, startDayMonth, endDayMonth).then(res => {


            let allDayData = [];
            let TodalDayData = {}
            for (let value of res) {
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


            let selectedDayData = {};
            selectedDayData = Object.entries(TodalDayData).filter(
                entries => entries[0] == startDayMonth,
            );
            this.setState({
                selectedDayData: selectedDayData,
                date: startDayMonth,
                GetBookData: TodalDayData,
                fillteredDate: startDayMonth
            }, () => {
                console.log('SEL', this.state.GetBookData)
            });


        })


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

    renderItem = ({item}) => {
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
                    <Button title={'Info'} onPress={this.buttonPressed}/>
                </View>
            </TouchableOpacity>
        );
    };

    getMarkedDates = () => {
        setTimeout(()=>{
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
            console.log("yyyyyMarkedDate", marked);
            return marked;
        }, 4000)

    };

    _onDayPress = day => {
        const marked = {};
        let selectedDay = day.dateString;
        console.log('yyyy_onDayPress', 'sasdfafd', day.dateString);

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
        const {GetBookData} = this.state;

        const themeColor = '#979797';
        const lightThemeColor = '#e6efff';
        const disabledColor = '#a6acb1';
        const black = colors.textColor;
        const textSectionTitleColor = colors.textColor;
        const white = '#ffffff';
        const selectedDayBackgroundColor = '#FCBF24';
        const selectedDayTextColor = '#0E1317';
        const dotColor = 'rgb(0,100,0)';


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
            textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
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
                // marginTop: 2,
                height: 10,
                width: 10,
                borderRadius: 5,
                // marginBottom: 3
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

    gotoEdit = (value) => {
        if (this.props.customerBookingAllowed == true) {
            this.props.navigation.navigate('AppointmentBook', {
                realUpdate: true,
                status: value.status,
                visit: value.id,
                calendar: true,
                reloadData: () => self.reloadData(),
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
        const {selectedDayData} = self.state;


        return (
            <Container style={{...styles.pro_background}}>
                <View style={{flex: 1.5, justifyContent: "center", ...helperFunctions.blackWhite()}}>
                    <HeaderComponent color={defaultMode === 'dark' ? 'white' : '#424E9C'} Left={"false"}
                                     title="My Book" {...this.props} />
                </View>
                <View style={{flex: 8}}>
                    <View style={{flex: 4}}>
                        <CalendarProvider
                            // date={new Date()}
                            onDateChanged={this.onDateChanged}
                            // onDateChanged={(day) => { this._onDayPress(day) }}

                            onMonthChange={this.onMonthChange}

                            theme={{borderWidth: 0,}}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                        >
                            {GetBookData != null && (
                            <ExpandableCalendar
                                horizontal={true}
                                // hideArrows
                                // disablePan
                                // hideKnob
                                // initialPosition={ExpandableCalendar.positions.OPEN}
                                firstDay={0}
                                markedDates={setTimeout(()=>{this.getMarkedDates()}, 4000)}
                                theme={this.getTheme()}
                                leftArrowImageSource={require('../../Assets/myBook/ic-chevron-left.png')}
                                rightArrowImageSource={require('../../Assets/myBook/ic-chevron-right.png')}
                                calendarStyle={styles.calendar}
                                headerStyle={styles.calendarHeader} // for horizontal only
                                // disableWeekScroll
                            />
                            )}

                            <Label style={{height: 20}}/>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                <View>
                                    {Object.values(selectedDayData).map(function (values) {
                                        //console.log('selectedDayData', values);
                                        return (
                                            <View key={values[0]}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        ...helperFunctions.themeBg(),
                                                        paddingVertical: 12,
                                                        paddingHorizontal: 20
                                                    }}>
                                                    <View>
                                                        <Text style={{
                                                            ...helperFunctions.textBlack(), ...helperFunctions.mediumFont(),
                                                            color: 'white'
                                                        }}>
                                                            {helperFunctions.formatDateTimeWithDay(Moment(values[0]), 'latest')}
                                                        </Text>
                                                    </View>

                                                </View>
                                                <Label style={{height: 10}}/>

                                                <Label style={{height: 10}}/>
                                                {/* {values[1].map((val, index) => (
                            <Schedule value={val} key={index} />
                          ))} */}
                                                <Schedule gotoEdit={self.gotoEdit}
                                                          addingAppointment={self.addingAppointment} value={values[1]}/>
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </CalendarProvider>
                    </View>

                    {/* <View style={{ flex: 1 }}></View> */}
                </View>
                <View style={{height: 120}}></View>

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

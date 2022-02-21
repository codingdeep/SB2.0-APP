import React from 'react';
import { connect } from 'react-redux';
import { Text, StatusBar, FlatList, TouchableOpacity, ScrollView, Button } from 'react-native';
import styles from '../styles';
import { Container, View, Label, Left, Right, Row } from 'native-base';
import CustomCol from '../Custom_Row_Header/custom_Row_Header';
import LOADER from '../../Loader/Loader';
import ICON from '../Icon_Provider/icon_Provider';
import CustomCal from '../CustomCalander/customCalander';
import CusColicon from '../Colicon/colicon';
import Custom_ColHeader from '../Custom_ColHeader/Custom_ColHeader';
import TimeButton from './TimeButton';
import HeaderComponent from '../../Header/header';
import { GetSalesData } from '../../../Redux/Action/SalesAction';
import Moment from "moment"
import { Calendar } from 'react-native-calendars';
import { SelectedTimeSheetData } from '../../../Redux/Action/TimerAction';

import { useTheme } from '../../../Theme/hooks'
const { colors } = useTheme()
import { Appearance } from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
class StartEndDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            startDay: "",
            endDay: "",
            marked: {},
        };
        // this.onDayPress = this.onDayPress.bind(this);
    }

    componentDidMount() {


    }

    static getDerivedStateFromProps(props, state) {



        return {

        };
    }
    getMarkedDates = () => {
        // console.log("getMarkedDates")
        const marked = {};
        marked[this.state.startDay] = { selected: true };
        marked[this.state.endDay] = { selected: true };
        console.log("getMarkedDates!!!", marked)
        return marked;
    };

    getTheme = () => {
        const themeColor = colors.textColor;
        const lightThemeColor = Appearance.getColorScheme() === 'dark' ? '#696969' : '#e6efff';
        const disabledColor = '#a6acb1';
        const black = '#0E1317';
        const textSectionTitleColor = defaultMode === 'dark' ? 'white' : '#0E1317';
        const white = '#ffffff';
        const selectedDayBackgroundColor = '#FCBF24';
        const selectedDayTextColor = '#0E1317';
        const dotColor = '#FCBF24';

        return {
            // arrows
            //   arrowColor: black,
            // arrowStyle: { width: 24, height: 24},
            // month
            calendarBackground: colors.background,
            monthTextColor: colors.textColor,
            textMonthFontSize: 14,
            textMonthFontFamily: 'HelveticaNeue',
            //   textMonthFontWeight: 'bold',
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
            dotStyle: { marginTop: -2 },
            'stylesheet.calendar': {
                borderWidth: 0,
            },
            'stylesheet.calendar.header': {
                header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.subHeaderButton,
                    // bordderWidth: 0
                },
            },
        };
    };
    _onDayPress = day => {
        const marked = {};
        let selectedDay = day.dateString;
        console.log("getMarkedDates", "sasdfafd", day.dateString)

        if (!this.state.startDay || !this.state.endDay) {
            if (this.state.startDay) {
                this.setState({
                    endDay: selectedDay
                })
            } else {
                this.setState({
                    startDay: selectedDay
                })
            }
        }
    }

    _onSelectedApiCall = (startDay, endDay) => {
        const previousRoute = this.props.navigation.getParam('previousRoute');

        if (previousRoute == "Sales") {
            this.props.dispatch(
                GetSalesData(this.props.StoreLocationInfo, this.props.navigation, startDay, endDay, this.props.navigation),
            )
        } else {
            this.props.dispatch(
                SelectedTimeSheetData(this.props.StoreLocationInfo, this.props.navigation, startDay, endDay, this.props.navigation),
            )
            this.props.navigation.navigate("TimeSheet")

        }

        // this.anotherFunc();
    }
    render() {

        return (
            <Container style={styles.pro_background}>
                <StatusBar hidden />
                <View style={{ flex: 2, justifyContent: "center" }}>
                    <HeaderComponent title="Start/End Day" {...this.props}
                        color={defaultMode === 'dark' ? 'white' : '#424E9C'}

                    />

                </View>

                <View style={{ flex: 6, justifyContent: "center" }}>
                    <Calendar
                        style={styles.calendar}
                        current={new Date(Date.now())}
                        minDate={'2019-05-10'}
                        maxDate={'2030-05-29'}
                        firstDay={0}
                        markedDates={this.getMarkedDates()}
                        disabledByDefault={false}
                        hideArrows={false}
                        onDayPress={(day) => { this._onDayPress(day) }}
                        theme={this.getTheme()}
                        calendarStyle={styles.calendarHeader}
                        headerStyle={styles.calendarHeader}
                    />

                </View>
                <View style={{ flex: .3, }} />
                <View style={{ flex: .3, borderTopWidth: 1, borderTopColor: colors.subHeaderButton, marginHorizontal: 40 }} />
                <View style={{ flex: 4, justifyContent: "center", marginHorizontal: 30 }}>

                    <Row style={{ flex: 1, justifyContent: "space-around" }}>
                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("TODAY")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>Today</Text>
                        </TouchableOpacity>
                        {/* <TimeButton name="Today" startDay={"Today"} status="active" /> */}
                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("YESTERDAY")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>Yesterday</Text>
                        </TouchableOpacity>


                    </Row>
                    <Row style={{ flex: 1, justifyContent: "space-around" }}>
                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("THIS_WEEK")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>This Week</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("LAST_WEEK")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>Last Week</Text>
                        </TouchableOpacity>


                    </Row>
                    <Row style={{ flex: 1, justifyContent: "space-around" }}>

                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("THIS_MONTH")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>This Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._onSelectedApiCall("LAST_MONTH")}
                            style={styles.selectDayButton}
                        >
                            <Text style={{ color: colors.textColor }}>Last Month</Text>
                        </TouchableOpacity>


                    </Row>
                </View>
                <View style={{ flex: .3, }} />
                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.startDay != "" && this.state.endDay != "")
                                this._onSelectedApiCall(this.state.startDay, this.state.endDay)
                        }}
                        style={{ backgroundColor: "#FCBF24", justifyContent: "center", alignItems: "center", borderRadius: 30, height: "80%", marginVertical: 5 }}
                    >
                        <Text>Show results</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 40 }}>
                    <View
                        style={{
                            backgroundColor: colors.bottomBorderColor,
                            width: '100%',
                            height: 2,
                            borderRadius: 5,
                        }}
                    />
                </View>
                <View style={{ flex: .3, }} />



            </Container>
        );
    }
}

const mapStateProps = state => {
    const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations;
    const GetSalesData = state.GetSalesReducer.GetSalesData;
    const SalesLoader = state.GetSalesReducer.SalesLoader;
    const DayWiseData = state.GetSalesReducer.DayWiseData;
    const DayPriceMount = state.GetSalesReducer.DayPriceMount;
    const WeekWiseData = state.GetSalesReducer.WeekWiseData;

    return {
        StoreLocationInfo,
        DayWiseData,
        GetSalesData,
        DayPriceMount,
        WeekWiseData,
        SalesLoader
    };
};

export default connect(mapStateProps)(StartEndDate);

/* eslint-disable */

import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator, TouchableOpacity, View, Dimensions } from "react-native";
import { helperFunctions } from "../../_helpers";
import { Button, Container, Form, Input, Row, Text, Textarea } from "native-base";
import Icons from "react-native-vector-icons/EvilIcons";
import { Calendar } from 'react-native-calendars';
import styles from "../Sales/styles";
import { useTheme } from '../../Theme/hooks'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { colors } = useTheme()

import { Appearance } from "react-native-appearance";
import { GetSalesData } from "../../Redux/Action/SalesAction";
import { SelectedTimeSheetData } from "../../Redux/Action/TimerAction";
const defaultMode = Appearance.getColorScheme() || 'light';

const { width, height } = Dimensions.get('window')
class PickerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerNotes: '',
            loading: false
        }

    }
    checkIn = () => {
        this.props.checkIn(this.state.customerNotes)
    }

    closePicker = () => {
        this.props.closePicker()
    }

    getMarkedDates = () => {
        // console.log("getMarkedDates")
        const marked = {};
        marked[this.state.startDay] = { selected: true };
        marked[this.state.endDay] = { selected: true };
        console.log("getMarkedDates!!!", this.state.startDay)
        console.log("getMarkedDates!!!", this.state.endDay)
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
        console.log(startDay)
        console.log(endDay)
        this.props.getSalesDataByFilter(startDay, endDay)
    }
    predefinedSalesData = (type) => {
        this.props.predefinedSalesData(type)
    }

    render() {
        return (
            <View style={{ ...helperFunctions.lightDarkBg() }}>
                <Modal
                    style={{ margin: 0 }}
                    backdropColor={'#000000'}
                    backdropOpacity={0.5}
                    isVisible={this.props.revenue}>

                    <View style={{ height: height, ...helperFunctions.lightDarkBg()}}>
                        <View style={{ ...helperFunctions.flexRow(),  alignItems: 'center', paddingHorizontal: 20,marginBottom: 50 }}>
                            <TouchableOpacity onPress={this.closePicker}
                                style={{ marginTop: 20 }}><AntDesign color={helperFunctions.darkLightColor()} style={{ marginRight: 120 }} size={18} name="arrowleft" /></TouchableOpacity>
                            <View><Text style={{ ...helperFunctions.textBlack() }}>Select duration</Text></View>
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
                        <View style={{ flex: 1, }} />
                        <View style={{ flex: .3, borderTopWidth: 1, borderTopColor: colors.subHeaderButton, marginHorizontal: 40 }} />
                        <View style={{ flex: 4, justifyContent: "center", marginHorizontal: 30 }}>

                            <Row style={{ flex: 1, justifyContent: "space-around" }}>
                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("TODAY")}
                                    style={styles.selectDayButton}
                                >
                                    <Text style={{ color: colors.textColor }}>Today</Text>
                                </TouchableOpacity>
                                {/* <TimeButton name="Today" startDay={"Today"} status="active" /> */}
                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("YESTERDAY")}
                                    style={styles.selectDayButton}
                                >
                                    <Text style={{ color: colors.textColor }}>Yesterday</Text>
                                </TouchableOpacity>


                            </Row>
                            <Row style={{ flex: 1, justifyContent: "space-around" }}>
                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("THIS_WEEK")}
                                    style={styles.selectDayButton}
                                >
                                    <Text style={{ color: colors.textColor }}>This Week</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("LAST_WEEK")}
                                    style={styles.selectDayButton}
                                >
                                    <Text style={{ color: colors.textColor }}>Last Week</Text>
                                </TouchableOpacity>


                            </Row>
                            <Row style={{ flex: 1, justifyContent: "space-around" }}>

                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("THIS_MONTH")}
                                    style={styles.selectDayButton}
                                >
                                    <Text style={{ color: colors.textColor }}>This Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.predefinedSalesData("LAST_MONTH")}
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

                    </View>
                </Modal>
            </View>
        )
    }
}

export default PickerModal

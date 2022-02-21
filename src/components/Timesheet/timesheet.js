/* eslint-disable */
import React, {Component, Fragment} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    Animated,
    ActivityIndicator
} from 'react-native';
import HeaderComponent from "../Header/header";
import {Col, Container, Label, Left, Right, Row} from "native-base";
import {Appearance} from 'react-native-appearance';
import Moment from "moment";
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {helperFunctions} from "../../_helpers";
import styles from "./styles";
import {getTechHoursData} from '../../Redux/SagaActions/timeSheet_saga_action'
import {connect} from "react-redux";
import Modal from 'react-native-modal'
import PickerModal from "../Modal/pickerModal";

const defaultMode = Appearance.getColorScheme() || 'light';
const {width, height} = Dimensions.get('window')

class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
            sunday: {},
            count: 0,
            salesCount: 1,
            maxCount: 1,
            mode: '',
            min: '',
            max: '',
            durat: '',
            process: '',
            predefined: 'THIS_WEEK',
            defaultStartDate: Moment().startOf('week'),
            defaultEndDate: Moment(),
            revenues: [],
            timeCount: 1,
            maxTimeCount: 1,
            timeSheet: false,
            revenue: false,
            day: {
                mon: [],
                sun: [],
                sat: [],
                tue: [],
                wed: [],
                fri: [],
                thu: []
            },
            monT: {
                monP: 0,
                satP: 0,
                sunP: 0,
                wedP: 0,
                thuP: 0,
                friP: 0,
                tueP: 0,
                monS: 0,
                satS: 0,
                sunS: 0,
                wedS: 0,
                thuS: 0,
                friS: 0,
                tueS: 0

            },
            wedT: {},
            thuT: {},
            satT: {},
            tueT: {},
            friT: {},
            sunT: {},
            active: null,
            opacity: new Animated.Value(0),
            scaleY: new Animated.Value(0),
            animHeight: new Animated.Value(0),
            loading: true
        }

        this.navigationWillFocusListener = props.navigation.addListener(
            "willFocus",
            () => {
                this.initializeTimeData();
            }
        );
    }

    componentDidMount() {
        this.initializeTimeData();
    }

    initializeTimeData = () => {
        this.setState({
            loading: true
        })
        const {defaultStartDate, defaultEndDate, timeCard} = this.state
        if (timeCard == 'all') {
          getTechHoursData(this.props.StoreLocationInfo[0].id, defaultStartDate.format('YYYY-MM-DD'), defaultEndDate.format('YYYY-MM-DD'), this.state.type).then(techHours => {
                console.log('TECHS',techHours)
                this.setState({
                    techHours,
                    loading: false
                })
            })
        } else {
            getTechHoursData(this.props.StoreLocationInfo[0].id, defaultStartDate.format('YYYY-MM-DD'), defaultEndDate.format('YYYY-MM-DD'), this.state.type).then(techHours => {
                this.setState({
                    techHours,
                    loading: false
                })
            })
        }
    }

    getNextSales = () => {
        const maxCount = this.state.maxCount;
        const salesCount = this.state.salesCount
        if (maxCount > 1 && salesCount <= maxCount) {
            if (this.state.predefined == 'THIS_MONTH') {
                if ((maxCount - salesCount) == 1) {
                    const start = Moment(this.state.defaultEndDate).add(1, 'days');
                    const end = Moment();
                    this.setState({
                        defaultStartDate: start,
                        defaultEndDate: end,
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {

                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();
                    });
                }

            } else if (this.state.predefined == 'LAST_MONTH') {
                if ((maxCount - salesCount) == 1) {
                    const start = Moment(this.state.defaultEndDate).add(1, 'days');
                    const end = Moment().subtract(1, 'months').endOf('month');
                    this.setState({
                        defaultStartDate: start,
                        defaultEndDate: end,
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {

                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                }

            } else if (this.state.predefined == 'RANGE') {
                if ((maxCount - salesCount) == 1) {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.specificEnd),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                }
            } else {

                if ((maxCount - salesCount) == 1) {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment().subtract(1, 'months').endOf('month'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                }
            }


        }
    }
    getPrevSales = () => {
        const maxCount = this.state.maxCount;
        const salesCount = this.state.salesCount;


        if (this.state.predefined == 'THIS_MONTH') {
            if (maxCount > 1 && salesCount != 1) {
                if (salesCount == 2) {
                    const start = Moment().startOf('month')
                    this.setState({
                        defaultStartDate: Moment().startOf('month'),
                        defaultEndDate: start.add(6, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultStartDate).subtract(7, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).subtract(7, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                }

            }
        } else {
            if (maxCount > 1 && salesCount != 1) {
                if (salesCount == 2) {
                    const start = Moment().subtract(1, 'months').startOf('month')
                    this.setState({
                        defaultStartDate: start,
                        defaultEndDate: Moment().subtract(1, 'months').startOf('month').add(6, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultStartDate).subtract(7, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).subtract(7, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeTimeData();

                    });
                }

            }
        }


    }

    makeKeyActive = (active) => {
        if (this.state.active == active) {
            this.setState({
                active: null
            })
        } else {
            this.setState({
                active
            })
        }

    }

    openPickerModal = () => {
        this.setState({
            revenue: true
        })
    }
    closePicker = () => {
        this.setState({
            revenue: false
        })
    }

    showSalesData = (startDay, endDay) => {
        this.closePicker()
        const start = startDay
        const end = endDay
        const diff = Moment(end).diff(start, 'days')
        this.setState({
            maxCount: 1,
            salesCount: 1,
            loading: true
        })
        if (diff >= 7) {

            this.setState({
                predefined: 'RANGE',
                maxCount: Math.ceil(diff / 7),
                defaultStartDate: Moment(start),
                defaultEndDate: Moment(start).add(7, 'days'),
                specificEnd: this.state.defaultEndDate
            }, () => {
                this.initializeTimeData();

            })
        } else {
            this.setState({
                defaultStartDate: Moment(start),
                defaultEndData: Moment(end)
            }, () => {
                this.initializeTimeData();
            })
        }

    }

    predefinedSalesData = (type) => {
        this.closePicker()
        this.setState({
            loading: true
        });
        if (type == 'TODAY') {
            this.setState({
                defaultStartDate: Moment(),
                defaultEndDate: Moment(),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeTimeData();
            })
        } else if (type == 'YESTERDAY') {
            this.setState({
                defaultStartDate: Moment().subtract(1, 'days'),
                defaultEndDate: Moment().subtract(1, 'days'),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeTimeData();
            })
        } else if (type == 'THIS_WEEK') {
            this.setState({
                defaultStartDate: Moment().startOf('week'),
                defaultEndDate: Moment(),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeTimeData();
            })
        } else if (type == 'LAST_WEEK') {

            this.setState({
                defaultStartDate: Moment().subtract(1, 'weeks').startOf('week'),
                defaultEndDate: Moment().subtract(1, 'weeks').endOf('week'),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeTimeData();

            })
        } else if (type == 'THIS_MONTH') {

            const start = Moment().startOf('month')
            const end = Moment()
            const maxCount = Math.ceil(end.diff(start, 'days') / 7)
            this.setState({
                defaultStartDate: Moment().startOf('month'),
                defaultEndDate: start.add(6, 'days'),
                maxCount: maxCount,
                predefined: type
            }, () => {
                this.initializeTimeData();

            })
        } else if (type == 'LAST_MONTH') {
            const start = Moment().subtract(1, 'months').startOf('month')
            const end = Moment().subtract(1, 'months').endOf('month')
            this.setState({
                defaultStartDate: start,
                defaultEndDate: Moment().subtract(1, 'months').startOf('month').add(6, 'days'),
                maxCount: Math.ceil(end.diff(start, 'days') / 7),
                predefined: type

            }, () => {
                this.initializeTimeData();

            })
        }

        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 1000)

    }
    checkTotalWeekHOurs = (weeks) => {
        console.log(weeks)
        var sum = 0;
        for (var i = 0; i < weeks.length; i++) {
            sum += moment(weeks[i].period.to).diff(moment(weeks[i].period.from))
        }
        return parseInt(moment.duration(sum).asHours()) + "h" + " " + parseInt(moment.duration(sum).asMinutes()) % 60 + 'm'

    }
    calculateWeekWiseRegular = (weeks) => {
        var sum = 0;
        var totalBreaks = 0;
        for (var i = 0; i < weeks.length; i++) {
            sum += Moment(weeks[i].period.to).diff(Moment(weeks[i].period.from))

            if (weeks[i].breaks.length > 0) {
                weeks[i].breaks.map(b => {
                    totalBreaks += Moment(b.period.to).diff(Moment(b.period.from))
                })
            }

        }
        const totalMinute = parseInt(moment.duration(sum).asMinutes());
        const totalBreakMinute = parseInt(moment.duration(totalBreaks).asMinutes());
        const totalTimes = totalMinute - totalBreakMinute;
        return this.timeConvert(totalTimes)
    }


    calculateWeekWiseBreak = (weeks) => {

        var totalBreaks = 0;
        for (var i = 0; i < weeks.length; i++) {
            if (weeks[i].breaks.length > 0) {
                weeks[i].breaks.map(b => {
                    totalBreaks += Moment(b.period.to).diff(Moment(b.period.from))
                })
            }

        }
        return parseInt(Moment.duration(totalBreaks).asHours()) + "h" + " " + parseInt(Moment.duration(totalBreaks).asMinutes()) % 60 + 'm'
    }

    calculateBreakingTime = (breaks) => {
        var sum = 0;
        breaks.map(b => {
            sum += moment(b.period.to).diff(moment(b.period.from))
        })
        return parseInt(moment.duration(sum).asHours()) + "h" + " " + parseInt(moment.duration(sum).asMinutes()) % 60 + 'm'

    }

    calculateRegularPerDay=(periods, breaks)=>{

        const total = moment(periods.to).diff(moment(periods.from));


        var totalBreaks = 0;
        for (var i = 0; i < breaks.length; i++) {
             totalBreaks += Moment(breaks[i].period.to).diff(Moment(breaks[i].period.from))

        }
        //
         const totalMinutes = parseInt(moment.duration(total).asMinutes());

         const breakMinutes = parseInt(moment.duration(totalBreaks).asMinutes());
         const totalRegularMinutes = totalMinutes - breakMinutes;
         return this.timeConvert(totalRegularMinutes)

    }
   timeConvert = (n) => {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }


    render() {
        const {revenues} = this.state
        console.log(revenues)
        return (
            <Container style={styles.pro_background}>
                {this.state.loading == true ? (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height
                    }}><ActivityIndicator color="#999"/></View>
                ) : (
                    <><View style={{justifyContent: "center", ...helperFunctions.headerHeight()}}>
                        <HeaderComponent Left={"false"} title="Clock" {...this.props}
                                         color={defaultMode === 'dark' ? 'white' : '#424E9C'}
                        />
                    </View>

                      <ScrollView>
                          <View style={styles.Fir_st_block}>
                        <Row>
                          {/* <ICON name="left" /> */}
                          <Left/>
                          <Col style={styles.Fir_st_block_col}>
                            <View
                                style={{
                                  ...helperFunctions.flexRow(),
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                              {this.state.salesCount != 1 &&
                              <TouchableOpacity onPress={this.getPrevSales} style={{marginRight: 20}}>
                                <AntDesign color={helperFunctions.darkLightColor()} size={20} name="left"/>
                              </TouchableOpacity>}
                              <TouchableOpacity
                                  onPress={() => {
                                    this.openPickerModal();
                                  }}
                              >
                                <Text style={styles.Fir_st_block_text}>
                                    {helperFunctions.getTimelineDate(this.state.defaultStartDate) + '-' + helperFunctions.getTimelineDate(this.state.defaultEndDate)}
                                </Text>
                              </TouchableOpacity>
                              {this.state.salesCount != this.state.maxCount && this.state.maxCount != 1 &&
                              <TouchableOpacity style={{marginLeft: 20}} onPress={this.getNextSales}>
                                <AntDesign color={helperFunctions.darkLightColor()} size={20} name="left"
                                           name="right"/>
                              </TouchableOpacity>
                              }
                            </View>
                          </Col>
                          <Right/>
                          {/* <ICON name="right" /> */}
                        </Row>
                      </View>

                       <View>
                           <View style={{...helperFunctions.flexRow(), justifyContent: 'center', paddingVertical: 10}}><Text style={{...helperFunctions.textBlack()}}>Total Hours - &nbsp;
                               {this.state.techHours.length > 0 &&
                               this.checkTotalWeekHOurs(this.state.techHours)
                               }
                               {this.state.techHours.length == 0 && `0h 0m`}</Text></View>
                       </View>

                        <View style={{...helperFunctions.flexRow(), justifyContent: 'center'}}>
                            <View style={{width: 200,...helperFunctions.flexRow(), justifyContent: 'space-between', marginLeft: 20}}>
                                <View style={{width: '45%',...helperFunctions.flexColumn(), alignItems: 'flex-end', marginRight: '10%'}}>
                                    <Text style={{...helperFunctions.textBlack(), color: helperFunctions.yellow()}}>Regular</Text>
                                    <Text style={{...helperFunctions.smallFont(), color: helperFunctions.darkLightColor()}}>{this.state.techHours.length > 0 &&
                                    this.calculateWeekWiseRegular(this.state.techHours)
                                    }
                                        {this.state.techHours.length == 0 && `0h 0m`}</Text>
                                </View>
                                <View  style={{width: '45%'}}>
                                    <Text style={{...helperFunctions.textBlack(), color: helperFunctions.yellow()}}>Break</Text>
                                    <Text style={{...helperFunctions.smallFont(), color: helperFunctions.darkLightColor()}}>
                                        {this.state.techHours.length > 0 &&
                                        this.calculateWeekWiseBreak(this.state.techHours)
                                        }
                                        {this.state.techHours.length == 0 && `0h 0m`}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{height: 20}}/>
                        <View>
                            <View style={{height: 5}}/>

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#555',borderTopWidth: 1, borderTopColor: '#333'}}/>
                            <View style={{height: 5}}></View>
                            <View style={{...helperFunctions.flexRow(), paddingHorizontal: 10, justifyContent: 'space-between',paddingVertical: 7}}>
                                <View style={{width: '25%'}}><Text style={{...helperFunctions.smallFont(), fontWeight: 'bold',color: helperFunctions.darkLightColor()}}>Day</Text></View>
                                <View style={{width: '18%'}}><Text style={{...helperFunctions.smallFont(), fontWeight: 'bold',color: helperFunctions.darkLightColor()}}>In</Text></View>
                                <View style={{width: '17%'}}><Text style={{...helperFunctions.smallFont(), fontWeight: 'bold',color: helperFunctions.darkLightColor()}}>Out</Text></View>
                                <View style={{width: '23%'}}><Text style={{...helperFunctions.smallFont(), fontWeight: 'bold',color: helperFunctions.darkLightColor()}}>Regular</Text></View>
                                <View style={{width: '17%'}}><Text style={{...helperFunctions.smallFont(), fontWeight: 'bold',color: helperFunctions.darkLightColor()}}>Break</Text></View>
                            </View>
                            <View style={{height: 5}}/>

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#555',borderTopWidth: 1, borderTopColor: '#333'}}/>
                            <View style={{height: 5}}></View>
                            {this.state.techHours.length > 0 && this.state.techHours.map((t, k) => {
                                return <TouchableOpacity  onPress={() =>
                                    this.props.navigation.navigate('TimesheetViewNew', { timeSheetData: t })

                                } key={k}><View style={k%2 == 0 ? {
                                    ...helperFunctions.flexRow(),
                                    paddingHorizontal: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                } :  {
                                    ...helperFunctions.flexRow(),
                                    paddingHorizontal: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <View style={{width: '23%',paddingVertical: 7}}><Text style={t.status == "Initiated" ? {...helperFunctions.smallFont(), color: '#999'} : {...helperFunctions.smallFont(), color: helperFunctions.yellow()}}>{helperFunctions.formatDateTimeWithDay(t.createdTime, 'timeCard')}</Text></View>
                                    <View style={{width: '18%'}}><Text style={t.status == "Initiated" ? {...helperFunctions.smallFont(), color: '#999'} : {...helperFunctions.smallFont(), color: helperFunctions.yellow()}}>{helperFunctions.formatDateTimeWithDay(t.period.from, 'time')}</Text></View>
                                    <View style={{width: '19%'}}><Text style={t.status == "Initiated" ? {...helperFunctions.smallFont(), color: '#999'} : {...helperFunctions.smallFont(), color: helperFunctions.yellow()}}>{helperFunctions.formatDateTimeWithDay(t.period.to, 'time')}</Text></View>
                                    <View style={{width: '23%'}}><Text style={t.status == "Initiated" ? {...helperFunctions.smallFont(), color: '#999'} : {...helperFunctions.smallFont(), color: helperFunctions.yellow()}}>
                                        {this.calculateRegularPerDay(t.period,t.breaks)}</Text></View>
                                    <View style={{width: '17%'}}><Text style={t.status == "Initiated" ? {...helperFunctions.smallFont(), color: '#999'} : {...helperFunctions.smallFont(), color: helperFunctions.yellow()}}>{t.breaks.length > 0 &&
                                    this.calculateBreakingTime(t.breaks)
                                    }
                                        {t.breaks.length == 0 && '---'}</Text></View>
                                </View>
                                    <View style={{height: 5}}/>

                                <View style={{borderBottomWidth: 1, borderBottomColor: '#555',borderTopWidth: 1, borderTopColor: '#333'}}/>
                                <View style={{height: 5}}></View>
                                </TouchableOpacity>
                            })}
                        </View>
                      </ScrollView>

                        <View>
                            <PickerModal predefinedSalesData={this.predefinedSalesData}
                                         getSalesDataByFilter={this.showSalesData} closePicker={this.closePicker}
                                         revenue={this.state.revenue}/>
                        </View></>

                )
                }

            </Container>
        )
    }


}

const Styles = StyleSheet.create({
    totalViewTitle: {
        ...helperFunctions.textBlack(),
        color: helperFunctions.yellow()
    },
    totalValue: {
        ...helperFunctions.textBlack(),
    },
    subTitle: {
        ...helperFunctions.textSize(),
        color: helperFunctions.darkLightColor()
    }
})

const mapStateProps = state => {
    const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations;
    const TimeSheetData = state.TimeSheetReducer.TimeSheetData;

    return {
        StoreLocationInfo,
        TimeSheetData
    };
};

export default connect(mapStateProps)(Sales);


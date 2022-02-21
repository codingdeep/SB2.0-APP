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
import AntDesign from 'react-native-vector-icons/AntDesign'
import {helperFunctions} from "../../_helpers";
import styles from "./styles";
import {getTechSalesData} from '../../Redux/SagaActions/sales_saga_action'
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
    }

    componentDidMount() {
        this.initializeSalesData();
    }

    initializeSalesData = () => {
        const {defaultStartDate, defaultEndDate} = this.state

        getTechSalesData(this.props.StoreLocationInfo[0].id, defaultStartDate.format('YYYY-MM-DD'), defaultEndDate.format('YYYY-MM-DD')).then(salesData => {

            console.log('SALES DATA', salesData)

            var keys = ''
            if (Object.keys(salesData) != 0) {
                keys = Object.keys(salesData)
            }

            const mon = []
            const wed = []
            const sun = []
            const sat = []
            const thu = []
            const fri = []
            const tue = []

            var monP = 0
            var wedP = 0
            var thuP = 0
            var satP = 0
            var tueP = 0
            var friP = 0
            var sunP = 0

            var monS = 0
            var wedS = 0
            var thuS = 0
            var satS = 0
            var tueS = 0
            var friS = 0
            var sunS = 0
            const salesInfo = []


            for (var i = 0; i < keys.length; i++) {
                let dayInfo = {
                    date: '',
                    day: '',
                    serviceChargeAmount: 0,
                    productPurchaseAmount: 0,
                    singleDayData: []
                }

                salesData[keys[i]].filter(item=>item.status == 'Checked Out').map(s => {
                    console.log('furs',s)
                    dayInfo.date = Moment(keys[i]).format('MMM D');
                    dayInfo.day = helperFunctions.getDay(keys[i]);
                    dayInfo.serviceChargeAmount += s.serviceChargeAmount * 1
                    dayInfo.productPurchaseAmount += s.productPurchaseAmount * 1
                    dayInfo.singleDayData.push({
                        bookedTime: helperFunctions.formatDateTimeWithDay(s.bookedTime, 'time'),
                        purchaseItems: s.purchaseItems,
                        visitTechnicians: s.visitTechnicians,
                        client: s.client.fullName
                    })

                })
                if(dayInfo.date !=''){
                    salesInfo.push(dayInfo);
                }



            }

            this.setState({
                revenues: salesInfo.reverse()
            })


            for (var i = 0; i < keys.length; i++) {
                var name = helperFunctions.getDay(keys[i]);
                if (name == 'Mon') {
                    salesData[keys[i]].map(s => {
                        console.log(s)
                        mon.push(s)
                        monS += s.serviceChargeAmount * 1
                        monP += s.productPurchaseAmount * 1

                    })
                } else if (name == "Wed") {
                    salesData[keys[i]].map(s => {
                        wed.push(s)
                        wedS += s.serviceChargeAmount * 1
                        wedP = s.productPurchaseAmount * 1
                    })
                } else if (name == "Sun") {
                    salesData[keys[i]].map(s => {
                        sun.push(s)
                        sunS += s.serviceChargeAmount * 1
                        sunP += s.productPurchaseAmount * 1
                    })
                } else if (name == "Sat") {
                    salesData[keys[i]].map(s => {
                        sat.push(s)
                        satS += s.serviceChargeAmount * 1
                        satP += s.productPurchaseAmount * 1
                    })
                } else if (name == "Thu") {
                    salesData[keys[i]].map(s => {
                        thu.push(s)
                        thuS += s.serviceChargeAmount * 1
                        thuP += s.productPurchaseAmount * 1
                    })
                } else if (name == "Tue") {
                    salesData[keys[i]].map(s => {
                        tue.push(s)
                        tueS += s.serviceChargeAmount * 1
                        tueP += s.productPurchaseAmount * 1
                    })
                } else if (name == "Fri") {
                    salesData[keys[i]].map(s => {
                        fri.push(s)
                        friS += s.serviceChargeAmount * 1
                        friP += s.productPurchaseAmount * 1
                    })
                }
            }

            this.setState({
                salesData,

                day: {
                    mon: mon,
                    tue: tue,
                    wed: wed,
                    thu: thu,
                    fri: fri,
                    sat: sat,
                    sun: sun

                },
                monT: {
                    monS: monS,
                    monP: monP
                },
                wedT: {
                    wedS: wedS,
                    wedP: wedP

                },
                thuT: {
                    thuS: thuS,
                    thuP: thuP
                },
                satT: {
                    satS: satS,
                    satP: satP
                },
                tueT: {
                    tueS: tueS,
                    tueP: tueP
                },
                friT: {
                    friS: friS,
                    friP: friP

                },
                sunT: {
                    sunS: sunS,
                    sunP: sunP
                },
                loading: false

            })
        })
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

                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()
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

                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()

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
                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()

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
                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultEndDate).add(1, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).add(6, 'days'),
                        salesCount: this.state.salesCount + 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()

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
                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultStartDate).subtract(7, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).subtract(7, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()

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
                        this.initializeSalesData()

                    });
                } else {
                    this.setState({
                        defaultStartDate: Moment(this.state.defaultStartDate).subtract(7, 'days'),
                        defaultEndDate: Moment(this.state.defaultEndDate).subtract(7, 'days'),
                        salesCount: this.state.salesCount - 1,
                        loading: true
                    }, () => {
                        this.initializeSalesData()

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
                this.initializeSalesData()

            })
        } else {
            console.log('start',start)
            console.log('end',end)
            this.setState({
                defaultStartDate: Moment(start),
                defaultEndDate: Moment(end)
            }, () => {
                this.initializeSalesData()
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
                this.initializeSalesData()
            })
        } else if (type == 'YESTERDAY') {
            this.setState({
                defaultStartDate: Moment().subtract(1,'days'),
                defaultEndDate: Moment(),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeSalesData()
            })
        }else if (type == 'THIS_WEEK') {
            this.setState({
                defaultStartDate: Moment().startOf('week'),
                defaultEndDate: Moment(),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeSalesData()
            })
        } else if (type == 'LAST_WEEK') {

            this.setState({
                defaultStartDate: Moment().subtract(1, 'weeks').startOf('week'),
                defaultEndDate: Moment().subtract(1, 'weeks').endOf('week'),
                maxCount: 1,
                salesCount: 1,
                predefined: type
            }, () => {
                this.initializeSalesData()

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
                this.initializeSalesData()

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
                this.initializeSalesData()

            })
        }

        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 1000)

    }

    totalProducts=()=>{
        const {revenues} = this.state;
        if(revenues.length > 0 ){
            let total = 0;
            revenues.map(rev=>{
                total += rev.productPurchaseAmount;
            })

            return (total*1).toFixed(2)
        }else{
            return '0.00'
        }
    }


    render() {
        const {revenues} = this.state

        console.log('REV',revenues)

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
                        <HeaderComponent Left={"false"} title="Sales" {...this.props}
                                         color={defaultMode === 'dark' ? 'white' : '#424E9C'}
                        />
                    </View>
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
                                            <Text
                                                style={styles.Fir_st_block_text}>{helperFunctions.getTimelineDate(this.state.defaultStartDate)} - {helperFunctions.getTimelineDate(this.state.defaultEndDate)}</Text>
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
                        <View style={{flex: 7, paddingHorizontal: 10, paddingVertical: 20}}>
                            <ScrollView>
                                <View style={{...helperFunctions.flexRow(), justifyContent: 'space-between'}}>
                                    <View style={{
                                        ...helperFunctions.flexColumn(),
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={Styles.totalViewTitle}>Total (Services)</Text>
                                        <Text style={Styles.totalValue}> ${(
                                            (this.state.satT.satS * 1)
                                            + (this.state.sunT.sunS * 1)
                                            + (this.state.monT.monS * 1)
                                            + (this.state.tueT.tueS * 1)
                                            + (this.state.wedT.wedS * 1)
                                            + (this.state.thuT.thuS * 1)
                                            + (this.state.friT.friS * 1)).toFixed(2)}</Text>
                                    </View>
                                    <View style={{
                                        ...helperFunctions.flexColumn(),
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={Styles.totalViewTitle}>Total (Products)</Text>

                                        <Text
                                            style={Styles.totalValue}>${this.totalProducts()}</Text>
                                    </View>
                                </View>
                                <View style={{height: 30}}/>
                                {revenues && revenues.length > 0 && revenues.map((rev, key) => {
                                    return (<Fragment key={key}><View style={{
                                        ...helperFunctions.flexRow(),
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <View style={{
                                            width: 60,
                                            borderColor: '#999',
                                            borderWidth: 1,
                                            height: 60, ...helperFunctions.flexColumn(),
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderRadius: 5,

                                        }}>
                                            <View style={{
                                                ...helperFunctions.themeBg(),
                                                width: '100%',
                                                height: 30,
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5,
                                                alignItems: 'center', ...helperFunctions.flexRow(),
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    ...helperFunctions.textBlack(),
                                                    color: helperFunctions.yellow(),
                                                    textAlign: 'center'
                                                }}>{rev.day}</Text>
                                            </View>
                                            <View style={{
                                                width: '100%',
                                                height: 30,
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5,
                                                alignItems: 'center', ...helperFunctions.flexRow(),
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    ...helperFunctions.smallFont(),
                                                    color: helperFunctions.darkLightColor()
                                                }}> {rev.date}</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Text style={Styles.subTitle}>Services</Text>
                                            <Text
                                                style={Styles.subTitle}>${(rev.serviceChargeAmount * 1).toFixed(2)}</Text>
                                        </View>
                                        <View>
                                            <Text style={Styles.subTitle}>Products</Text>
                                            <Text
                                                style={Styles.subTitle}>${(rev.productPurchaseAmount * 1).toFixed(2)}</Text>
                                        </View>
                                        <View style={{width: 30}}>
                                            <TouchableWithoutFeedback onPress={() => this.makeKeyActive(key)}>
                                                <AntDesign size={20} color={helperFunctions.darkLightColor()}
                                                           name={this.state.active == key ? 'up' : 'down'}/>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                        <View style={{height: 9}}></View>
                                        {this.state.active == key &&
                                        <View>
                                            {rev && rev.singleDayData.length > 0 && rev.singleDayData.map((s, k) => {
                                                return <Fragment key={k}><View
                                                    style={{...helperFunctions.flexRow(), paddingVertical: 5}}>
                                                    <View style={{width: width / 2}}>
                                                        {s.visitTechnicians.length > 0 && s.visitTechnicians.map((t, ks) => {
                                                            return <View style={{
                                                                ...helperFunctions.flexRow(),
                                                                justifyContent: 'space-between',
                                                                marginVertical: 7
                                                            }}><View style={{width: width / 2 - 85}}>
                                                                <Text
                                                                    style={{...helperFunctions.tinyFont()}}>{t.offeredService.name}</Text>
                                                                <Text
                                                                    style={{...helperFunctions.tinyFont()}}>{s.client}</Text>
                                                            </View>
                                                                <View style={{width: 55}}>
                                                                    <Text
                                                                        style={{...helperFunctions.tinyFont()}}>{t.chargeAmount != '-1' ? '$' + (t.chargeAmount * 1).toFixed(2) : 'Per Consult'}</Text>
                                                                    <Text
                                                                        style={{...helperFunctions.tinyFont()}}>{s.bookedTime}</Text>
                                                                </View></View>
                                                        })}

                                                        {s.visitTechnicians.length == 0 &&
                                                        <View style={{
                                                            ...helperFunctions.flexRow(),
                                                            justifyContent: 'space-between',
                                                            marginVertical: 7
                                                        }}><View style={{width: width / 2 - 85}}>
                                                            <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                            <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                        </View>
                                                            <View style={{width: 55}}>
                                                                <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                                <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                            </View></View>}
                                                    </View>


                                                    <View style={{
                                                        width: width / 2,
                                                    }}>
                                                        {s.purchaseItems.length > 0 && s.purchaseItems.map((p, pk) => {
                                                            return <View style={{
                                                                ...helperFunctions.flexRow(),
                                                                justifyContent: 'space-between',
                                                                marginVertical: 7
                                                            }}><View style={{width: width / 2 - 80}}>
                                                                <Text
                                                                    style={{...helperFunctions.tinyFont()}}>{p.locatedProductVariant.variant.product.name}</Text>
                                                                <Text
                                                                    style={{...helperFunctions.tinyFont()}}>Qty: {p.quantity}</Text>
                                                            </View>
                                                                <View style={{width: 100}}>
                                                                    <Text
                                                                        style={{...helperFunctions.tinyFont()}}>{p.locatedProductVariant.variant.product.brand.name}</Text>
                                                                    <Text
                                                                        style={{...helperFunctions.tinyFont()}}>${(p.chargeAmount * 1).toFixed(2)}</Text>
                                                                </View></View>
                                                        })}
                                                        {s.purchaseItems.length == 0 && <View style={{
                                                            ...helperFunctions.flexRow(),
                                                            justifyContent: 'space-between',
                                                            marginVertical: 7
                                                        }}><View style={{width: width / 2 - 80}}>
                                                            <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                            <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                        </View>
                                                            <View style={{width: 100}}>
                                                                <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                                <Text style={{...helperFunctions.tinyFont()}}>---</Text>
                                                            </View></View>
                                                        }
                                                    </View>
                                                </View>

                                                    <View style={{height: 8}}/>
                                                    {rev.singleDayData.length - k != 1 &&
                                                    <View style={{borderTopWidth: .5, borderTopColor: '#999'}}/>
                                                    }
                                                    <View style={{height: 8}}/>
                                                    <View style={{height: 8}}/></Fragment>
                                            })}</View>}
                                        {revenues.length - key > 1 &&
                                        <View style={{borderTopWidth: 1, borderTopColor: '#999'}}/>
                                        }
                                        <View style={{height: 10}}/></Fragment>)
                                })}

                                <View style={{height: 150}}/>
                            </ScrollView>
                        </View>
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

    return {
        StoreLocationInfo
    };
};

export default connect(mapStateProps)(Sales);


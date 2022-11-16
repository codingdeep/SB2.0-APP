/* eslint-disable */
import React, {Component, Fragment} from 'react';
import {
    Text,
    Alert,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {
    Left,
    Right,
    ListItem,
    List,
    Thumbnail,
    Col,
    Label,
    Container,
    Form,
    Textarea,
    Button,
} from 'native-base';
import HeaderComponent from '../Header/header';
import Moment from 'moment';
import styles from './styles';
import {connect} from 'react-redux';
import MiniModal from '../Modal/miniModal';
import {
    saveBooking,
    _getSingleVisit,
    DeleteProduct,
    DeleteService,
    updateBooking,
} from './../../Redux/SagaActions/UpcommingAppoinments_action';
import CustomDateTimePicker from '../ImportantFunction/datePicker';
import {toast} from '../Toast/Toast';
import {helperFunctions} from '../../_helpers';
import Modal from 'react-native-modal';
import AddEditServices from '../Modal/addEditServices';
import AddEditProducts from '../Modal/addEditProducts';
import moment from 'moment';
import Icons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {_requestToPasrAppoApi} from '../../Redux/SagaActions/AppoinmentsSagaAction';
import ActionSheet from '../ActionSheet/actionSheet';
import Animated from 'react-native-reanimated';
import { State} from 'react-native-gesture-handler';
import {withTransition} from 'react-native-redash';
import Feather from 'react-native-vector-icons/Feather';
import {Appearance} from 'react-native-appearance';
import {updateCustomerNote} from '../../Redux/SagaActions/UpcommingAppoinments_action'
import Items from './items'


const defaultMode = Appearance.getColorScheme() || 'light';
const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    not,
    interpolate
} = Animated;
let setProductName = [];
//const translateY = new Animated.Value(400);
const isOpen = new Animated.Value(0);
const state = new Animated.Value(State.UNDETERMINED);
const transition = withTransition(isOpen);





class Appointment extends Component {
    constructor(props) {
        super(props);

        let apptDateBook = this.props.navigation.state.params.selectedDayData
            ? this.props.navigation.state.params.selectedDayData[0][1][0].start
            : '';
        apptDateBook = new Date(apptDateBook);

        this.state = {
            location: {
                id: this.props.locationId.id,
            },
            technicians: [],
            requestSource: Platform.OS === 'ios' ? 'iOS App' : 'Android App',
            requestType: 'Appointment',
            standingAppointment: false,
            customerNotes: '',
            visitTechnicians: [],
            purchaseItems: [],
            isModalVisible: false,
            clientInfo: '',
            clientRoute: '',
            visitID: '',
            item: '',
            isEditable: false,
            isProductModalVisible: false,
            visitTechId: '',
            isReasonModal: false,
            cancelReason: '',
            apptDate: this.props.navigation.state.params.selectedDayData,
            loading: false,
            updateDate: '',
            visit: '',
            appointments: '',
            miniModal: false,
            names: '',
            checkInOutAllowed: false,
            isCheckInModalVisible: false,
            status: '',
            value:'',
            client: {
                id:
                    this.props.navigation.getParam('ClientInfo') != null
                        ? props.navigation.getParam('ClientInfo').id
                        : '',
            },
            proccess: false,
            vt: '',
            chargeAmount: '',
            checkOutModal: false,
            staffNotes: '',
            actionSheetOpen: false,
            saveBooking: true
        };

        this.navigationWillFocusListener = props.navigation.addListener(
            "willFocus",
            () => {
                if (this.props.navigation.state.params.visit) {
                    this.getSingleVisit(this.props.navigation.state.params.visit);
                }
            }
        );

    }

    tapStateEvent = Animated.event([{
        nativeEvent: ({state}) =>{
            return cond(
                eq(state, State.END),
                set(isOpen,not(isOpen)),
                [state,isOpen]
                //cond(eq(translateY, 400), set(translateY, 0), set(translateY, 400)),
            )
            //return cond
        }

    }]);
    translateY = interpolate(transition,{
        inputRange:[0,1],
        outputRange: [400,0]
    });

    zIndex = interpolate(transition,{
        inputRange:[0,1],
        outputRange:[-1,1]
    })




    onSourceValueChange = value => {
        this.setState({
            requestSource: value,
        });
    };



    componentDidMount() {
        const visits = [];
        const purchaseItems= []
        this.GetClientInfo();
        if (this.props.navigation.state.params.visit) {
            this.getSingleVisit(this.props.navigation.state.params.visit);
        }
        if(this.props.navigation.state.params.Rebook == true){
                //console.log('VIINFO',this.props.navigation.state.params.ApptInfo.visitTechnicians)
            const ownVisit = this.props.navigation.state.params.ApptInfo.visitTechnicians.filter(vt=>vt.technician.id === this.props.TechnicianId);
            ownVisit.map(vt=>{
                visits.push({
                    id: vt.id,
                    key: vt.id,
                    timeStart: moment(new Date()),
                    timeEnd: moment(new Date()).add(this.getDuration(vt.expectedEndTime, vt.expectedStartTime),'minutes'),
                    servicename: this.findServiceName(
                        vt.offeredService.id,
                        vt.offeredService.category.id,
                    ),
                    price: (vt.chargeAmount * 1).toFixed(2),
                    technician: vt.technician.id,
                    service: vt.offeredService.id,
                    technicianname: this.findTechnician(vt.technician.id, 'nick'),
                    technicianImage: this.findTechnician(vt.technician.id, 'image')
                })
            });
            if(this.props.navigation.state.params.ApptInfo.purchaseItems.length > 0){
                this.props.navigation.state.params.ApptInfo.purchaseItems.map(p=>{
                    purchaseItems.push({
                        id: p.locatedProductVariant.id,
                        itemId: p.id,
                        key: p.id,
                        name: p.locatedProductVariant.variant.product.name,
                        brand: p.locatedProductVariant.variant.product.brand.name,
                        price: p.locatedProductVariant.salePrice,
                        image: p.locatedProductVariant.variant.imageUrls[0],
                        quantity: p.quantity,
                        technician: p.technician.id,
                    })
                })
            }
            this.setState({
                visitTechnicians: visits,
                purchaseItems,
                customerNotes: this.props.navigation.state.params.ApptInfo.customerNotes,
                requestType: this.props.navigation.state.params.ApptInfo.requestType,
                requestSource: this.props.navigation.state.params.ApptInfo.requestSource
            })
        }
    }

    reloadData=()=>{
        if (this.props.navigation.state.params.visit) {
            this.getSingleVisit(this.props.navigation.state.params.visit);
        }
    }

    getSingleVisit = visitId => {
        _getSingleVisit(visitId).then(res => {
            //console.log('RES f',res);
            const visits = [];
            res.visitTechnicians.map(vt => {
                if (vt.status != 'Cancelled' && vt.technician.id === this.props.TechnicianId) {
                    visits.push({
                        id: vt.id,
                        key: res.visitTechnicians.length + 1,
                        timeStart: moment(vt.expectedStartTime),
                        timeEnd: moment(vt.period.to),
                        servicename: this.findServiceName(
                            vt.offeredService.id,
                            vt.offeredService.category.id,
                        ),
                        price: (vt.chargeAmount * 1).toFixed(2),
                        technician: vt.technician.id,
                        service: vt.offeredService.id,
                        technicianname: this.findTechnician(vt.technician.id, 'nick'),
                        technicianImage: this.findTechnician(vt.technician.id, 'image'),
                        visitId: res.id,
                        checkInOutAllowed: vt.checkInOutAllowed,
                        vtStatus: vt.status
                    });
                }
            });

            const products = [];
            if (res.purchaseItems.length > 0) {
                res.purchaseItems.map(p => {
                    products.push({
                        id: p.locatedProductVariant.id,
                        itemId: p.id,
                        key: p.id,
                        name: p.locatedProductVariant.variant.product.name,
                        brand: p.locatedProductVariant.variant.product.brand.name,
                        price: p.locatedProductVariant.salePrice,
                        image: p.locatedProductVariant.variant.imageUrls[0],
                        quantity: p.quantity,
                        technician: p.technician.id,
                        visitId: res.id,

                    });
                });
            }
            if (res.status != 'Cancelled') {
                //console.log('DD',res)
                this.setState({
                    visit: res,
                    visitTechnicians: visits,
                    purchaseItems: products,
                    customerNotes: res.customerNotes,
                    apptDate: res.bookedTime,
                    requestType: res.requestType,
                    requestSource: res.requestSource,
                    visitID: res.id,
                    clientInfo: res.client,
                    checkInOutAllowed: res.checkInOutAllowed,
                    client:{
                        id: res.client.id
                    },
                    status: res.status,
                    chargeAmount: '',
                    staffNotes: res.staffNotes
                },()=>{

                    this.setState({
                        proccess: true
                    })
                });
            } else {
                this.props.navigation.navigate('UpComingAppoinmentsScreen', {ClientInfo: this.state.clientInfo});
            }
        });
    };

    GetClientInfo = () => {
        const clientInfo =
            this.props.navigation.getParam('clientRoute') == 'MyBook'
                ? ''
                : this.props.navigation.getParam('ClientInfo');
        const clientRoute = this.props.navigation.getParam('clientRoute');
        this.setState({
            clientInfo: clientInfo,
            clientRoute: clientRoute,
        });
    };

    static getDerivedStateFromProps(props, state) {
        const {AllClientsData, businessId} = props;
        return {
            AllClientsData,
            businessId,
        };
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    };

    onNoteChange = text => {
        //console.log('onNoteChange', text);
        this.setState({
            ...this.state,
            staffNotes: text,
        });
    };

    toggleAddModal = () => {
        this.setState({
            isModalVisible: true,
            isEditable: false,
        });
    };
    toggleProductModal = () => {
        this.setState({
            isProductModalVisible: true,
            isEditable: false,
        });
    };
    closeModal = () => {
        this.setState({
            isModalVisible: false,
            isEditable: false,
        });
    };
    closeProductModal = () => {
        this.setState({
            isProductModalVisible: false,
            isEditable: false,
        });
    };

    addService = services => {
        if (this.state.visitID != '') {
            this.getSingleVisit(this.state.visitID);
            this.setState({
                isModalVisible: false,
                isEditable: false,
            });
        } else {
            this.setState(
                {
                    visitTechnicians: services,
                    isModalVisible: false,
                    isEditable: false,
                },
                () => {
                    //console.log(this.state.visitTechnicians);
                },
            );
        }
    };
    addProduct = products => {
        if (this.state.visitID != '') {
            this.getSingleVisit(this.state.visitID);
            this.setState(
                {
                    isProductModalVisible: false,
                    isEditable: false,
                },
                () => {
                    //console.log(this.state.purchaseItems);
                },
            );
        } else {
            this.setState(
                {
                    purchaseItems: products,
                    isProductModalVisible: false,
                    isEditable: false,
                },
                () => {
                    //console.log(this.state.purchaseItems);
                },
            );
        }
    };

    deleteTechnician = (item) => {
        if (this.state.visitTechnicians.length == 1) {
            this.setState({
                visitTechnicians: [],
                purchaseItems: [],
            });
        } else {
            const newCollection = this.state.visitTechnicians.filter(
                visit => visit.key != item.key,
            );
            this.setState({
                visitTechnicians: newCollection,
            });
        }
    };
    deleteRealTechnician = (item) => {

        this.setState(
            {
                visitTechId: item.id,
            },
            () => {

                Alert.alert(
                    'Warning',
                    `${
                        this.state.visitTechnicians.length > 1
                            ? 'Are you sure to delete?'
                            : 'This will also cancel the appointment. Are you sure you want to delete ?'
                    }`,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this.setState({isReasonModal: true})},
                    ],
                    {cancelable: false},
                );
            },
        );
    };
    confirmDelete = async () => {
        this.setState({
            loading: true,
        });
        await DeleteService(
            this.state.visitTechId,
            this.state.cancelReason,
            response => {
                this.getSingleVisit(this.state.visitID);
                this.setState({
                    loading: false,
                    isReasonModal: false,
                    cancelReason: ''
                });
            },
            error => {
                this.setState({
                    loading: false,
                    isReasonModal: false,
                });
                alert(error.errors ? error.errors : error.message);
            },
        );
    };

    editAddedService = item => {
        this.setState(
            {
                item,
                isEditable: true,
            },
            () => {
                this.setState({
                    isModalVisible: true,
                });
            },
        );
    };
    editProduct = item => {
        this.setState(
            {
                item,
                isEditable: true,
            },
            () => {
                this.setState({
                    isProductModalVisible: true,
                });
            },
        );
    };
    deleteProduct = (item) => {
        if (this.state.purchaseItems.length == 1) {
            this.setState({
                purchaseItems: [],
            });
        } else {
            const newCollection = this.state.purchaseItems.filter(
                visit => visit.key != item.key,
            );
            this.setState({
                purchaseItems: newCollection,
            });
        }
    };
    deleteRealProduct = async (item) => {

        await DeleteProduct(
            item.itemId,
            response => {
                this.getSingleVisit(this.state.visitID);
            },
            error => {
                alert(error.errors ? error.errors : error.message);
            },
        );
    };

    datepicker = () => {
        this.show('date');
    };
    setDate = (event, apptDate) => {
        const selectedMinutes = Moment.duration(Moment(apptDate)).asMinutes();
        //alert(selectedMinutes)
        const currentDate = Moment().format('YYYY-MM-DD');

        const currentMinutes  = Moment.duration(Moment(currentDate)).asMinutes();
        if(selectedMinutes >= currentMinutes) {
            this.setState({
                show: Platform.OS === 'ios' ? true : false,
                apptDate,
                updateDate: apptDate,
            }, () => {
                if (this.state.visitTechnicians.length > 0) {
                    const newServices = [];
                    for (let i = 0; i < this.state.visitTechnicians.length; i++) {
                        if (i == 0) {
                            newServices.push({
                                ...this.state.visitTechnicians[i],

                                timeEnd: moment(this.state.updateDate)
                                    .add(this.getDuration(this.state.visitTechnicians[0].timeEnd, this.state.visitTechnicians[0].timeStart), 'minutes')
                                    .format('YYYY-MM-DDTHH:mm:ss'),
                                timeStart: Moment(this.state.updateDate).format(
                                    'YYYY-MM-DDTHH:mm:ss',
                                ),

                            })
                        } else {
                            let datePart = Moment(this.state.updateDate).format('YYYY-MM-DDT')
                            newServices.push({
                                ...this.state.visitTechnicians[i],

                                timeEnd: datePart +
                                    Moment(this.state.visitTechnicians[i].timeEnd).format(
                                        'HH:mm:ss',
                                    ),
                                timeStart: Moment(this.state.updateDate).format(
                                    'YYYY-MM-DDTHH:mm:ss',
                                ),

                            })
                        }
                    }

                    this.setState({visitTechnicians: newServices})
                }
            })
        }else{
            alert('Please add a valid date!!')
        }
    };
    getDuration = (timeB,timeS) => {
        const sum = moment(timeB).diff(
            moment(timeS),
        );
        const minutes = parseInt(moment.duration(sum).asMinutes());

        return minutes;
    };
    saveBooking = async () => {
        this.setState({
            saveBooking: false
        })
        if (this.props.navigation.state.params.realUpdate == true) {

            var tech = [];
            var purchaseItems = [];
            if (this.state.purchaseItems.length > 0) {
                for (var i = 0; i < this.state.purchaseItems.length; i++) {
                    var singleProduct = {
                        id: this.state.purchaseItems[i].itemId,
                        technician: {
                            id: this.state.purchaseItems[i].technician,
                        },
                        quantity: this.state.purchaseItems[i].quantity,
                        chargeAmount: this.state.purchaseItems[i].price,
                        locatedProductVariant: {
                            id: this.state.purchaseItems[i].id,
                        },
                    };

                    purchaseItems.push(singleProduct);
                }
            } else {
                purchaseItems = [];
            }
            let datePart = '';
            if (this.state.updateDate != '') {
                datePart = Moment(this.state.updateDate).format('YYYY-MM-DDT');

            } else {
                datePart = Moment(this.state.apptDate).format('YYYY-MM-DDT');

            }

            for (var i = 0; i < this.state.visitTechnicians.length; i++) {
                let singleTech = '';
                if (this.state.updateDate != '') {
                    if (i == 0) {
                        singleTech = {
                            id: this.state.visitTechnicians[i].id,
                            technician: {
                                id: this.state.visitTechnicians[i].technician,
                            },
                            offeredService: {
                                id: this.state.visitTechnicians[i].service,
                            },
                            expectedStartTime: Moment(this.state.updateDate).format(
                                'YYYY-MM-DDTHH:mm:ss',
                            ),
                            period: {
                                to: moment(this.state.updateDate)
                                    .add(this.getDuration(this.state.visitTechnicians[0].timeEnd,this.state.visitTechnicians[0].timeStart), 'minutes')
                                    .format('YYYY-MM-DDTHH:mm:ss'),
                            },
                        };
                    }
                } else {
                    singleTech = {
                        id: this.state.visitTechnicians[i].id,
                        technician: {
                            id: this.state.visitTechnicians[i].technician,
                        },
                        offeredService: {
                            id: this.state.visitTechnicians[i].service,
                        },
                        expectedStartTime:
                            datePart +
                            Moment(this.state.visitTechnicians[i].timeStart).format(
                                'HH:mm:ss',
                            ),
                        period: {
                            to:
                                datePart +
                                Moment(this.state.visitTechnicians[i].timeEnd).format(
                                    'HH:mm:ss',
                                ),
                        },
                    };
                }

                tech.push(singleTech);
            }
            const apptJSON = {
                location: this.state.location,
                requestSource: this.state.requestSource,
                requestType: this.state.requestType,
                standingAppointment: false,
                customerNotes: this.state.customerNotes,
                staffNotes: this.state.staffNotes,
                visitTechnicians: tech,
                purchaseItems: purchaseItems,
                client: this.state.client,
            };
            //.log('UPDATE JSON', apptJSON);
            await updateBooking(
                this.state.visitID,
                apptJSON,
                response => {
                    this.setState({
                        purchaseItems: [],
                        visitTechnicians: [],
                        customerNotes: '',
                        saveBooking: true
                    });
                    this.props.navigation.navigate('UpComingAppoinmentsScreen', {
                        ClientInfo: this.props.navigation.state.params.ClientInfo,
                    });
                },
                error => {
                    toast(error.errors ? error.errors : error.message, 'BOTTOM');
                },
            );
        } else {
            await saveBooking(
                this.state,
                response => {
                    this.setState({
                        purchaseItems: [],
                        visitTechnicians: [],
                        customerNotes: '',
                        saveBooking: true
                    });
                    this.props.navigation.navigate('UpComingAppoinmentsScreen', {
                        ClientInfo: this.props.navigation.state.params.ClientInfo,
                        reloadData:()=>this.reloadData()
                    });
                },
                error => {
                    toast(error.errors ? error.errors : error.message, 'BOTTOM');
                },
            );
        }
    };
    closeReasonModal = () => {
        this.setState({
            isReasonModal: false,
        });
    };

    openMiniModal = (id) => {

        _requestToPasrAppoApi(this.state.location.id, id).then(a => {
            //.log('mini', a);
            this.setState({
                appointments: a,
            }, () => {
                this.setState({
                    miniModal: true,
                });
            });
        });
    };

    closeMiniModal = () => {
        this.setState({
            miniModal: false,
        });
    };

    updateNote=()=>{
        const notes = {
            staffNotes: this.state.staffNotes
        }
        updateCustomerNote(this.state.visitID,notes).then(res=>{
            alert('Notes is updated successfully!!')
            this.getSingleVisit(this.state.visitID);

        }).catch(e=>{
            e.json().then(err=>{
                alert(err.message)
            })
        })
    }

    closeActionSheets=()=>{
        this.setState({
            actionSheetOpen: !this.state.actionSheetOpen
        })
    }

    changeActionSheet=()=>{
        this.setState({actionSheetOpen: !this.state.actionSheetOpen})
    }


    render() {
        const {
            show,
            apptDate,
            mode,
            search,
            clientRoute,
            clientInfo,
            payload,
            productName,
        } = this.state;



        const {navigation} = this.props;

        let self = this;

        return (
            <Container
                style={{...styles.pro_background, ...helperFunctions.themeBg()}}>
                <View style={{justifyContent: 'center', ...helperFunctions.headerHeight()}}>
                    <HeaderComponent
                        color="white"
                        title={
                            this.props.navigation.state.params.realUpdate == true
                                ? 'Edit Appointment'
                                : 'Appointment'
                        }
                        // forFunction="true"
                        // rightImg="rightImg"
                        rightTitle={
                            this.state.visitTechnicians.length > 0 &&
                            this.props.navigation.state.params.realUpdate == true
                                ? 'Update'
                                : this.props.navigation.state.params.Rebook == true ? 'Rebook' : this.state.visitTechnicians.length > 0 && 'Add Appt'
                        }
                        onFunctionCall={() => {
                            this.saveBooking();
                        }}
                        {...this.props}
                    />
                </View>
                <View
                    style={{
                        flex: 8,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }}>
                    <ScrollView style={{...helperFunctions.lightDarkBg()}}>
                        <View style={{marginHorizontal: 20}}>

                            <View
                                style={{
                                    ...helperFunctions.flexRow(),
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        ...helperFunctions.flexColumn(),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Thumbnail
                                        style={styles.userImage}
                                        source={{uri: clientInfo.imageUrl}}
                                    />
                                    <Text
                                        style={{
                                            ...helperFunctions.textBlack(),
                                            ...helperFunctions.mediumFont(),
                                            textTransform: 'uppercase',
                                            ...helperFunctions.themeColor(),
                                        }}>
                                        {clientInfo.fullName}
                                    </Text>
                                    <Text
                                        style={{
                                            textTransform: 'uppercase',
                                            ...helperFunctions.textSize(),
                                            color: helperFunctions.darkLightColor()
                                        }}>
                                        {clientInfo.mobileNumber &&
                                        this.formatMobileNumber(clientInfo.mobileNumber)}
                                    </Text>
                                    <Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>
                                        Balance: $
                                        {clientInfo.rewardBalance
                                            ? clientInfo.rewardBalance.toFixed(2)
                                            : '0.00'}
                                    </Text>
                                </View>
                            </View>

                            <View style={{height: 20}}/>

                            <List>
                                <ListItem
                                    style={{
                                        ...helperFunctions.assBg(),
                                        borderBottomWidth: 0,
                                        marginLeft: 0,
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                    }}>
                                    <Col>
                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                ...helperFunctions.textSize(),
                                                ...helperFunctions.assColor(),
                                                marginTop: -5,
                                            }}>
                                            Last Visit
                                        </Text>

                                        <View
                                            style={{
                                                ...helperFunctions.flexRow(),
                                                justifyContent: 'space-between',
                                            }}><Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                marginBottom: -5,
                                            }}>
                                            {clientInfo.lastVisit
                                                ? clientInfo.lastVisit.readableBookedTime
                                                : 'NONE'}{' '}
                                        </Text>
                                            {clientInfo.lastVisit && (
                                                <View>
                                                    <TouchableOpacity onPress={this.changeActionSheet}><Text><AntDesign name="eyeo" color="skyblue" size={20}/></Text></TouchableOpacity>
                                                </View>

                                            )}
                                        </View>
                                    </Col>
                                </ListItem>
                                <View style={{height: 10}}/>
                                <ListItem
                                    style={{
                                        marginLeft: 0,
                                        borderBottomWidth: 0,
                                        ...helperFunctions.assBg(),
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                    }}>
                                    <Col>
                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                ...helperFunctions.textSize(),
                                                ...helperFunctions.assColor(),
                                                marginTop: -5,
                                            }}>
                                            Next Visit
                                        </Text>

                                        <View
                                            style={{
                                                ...helperFunctions.flexRow(),
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text
                                                style={{
                                                    ...helperFunctions.textBlack(),
                                                    marginBottom: -5,
                                                }}>
                                                {clientInfo.nextVisit
                                                    ? clientInfo.nextVisit.readableBookedTime
                                                    : 'NONE'}{' '}
                                            </Text>

                                        </View>
                                    </Col>
                                </ListItem>
                                <View style={{height: 10}}/>
                                <ListItem
                                    style={{
                                        marginLeft: 0,
                                        borderBottomWidth: 0,
                                        ...helperFunctions.assBg(),
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                    }}>
                                    <Col>
                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                ...helperFunctions.textSize(),
                                                ...helperFunctions.assColor(),
                                                marginTop: -5,
                                            }}>
                                            Appt Date
                                        </Text>

                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                marginBottom: -5,
                                            }}>
                                            {helperFunctions.formatDateTimeWithDay(
                                                Moment(this.state.apptDate),
                                                'time_after',
                                            )}
                                        </Text>
                                    </Col>
                                    <View>
                                        {show && (
                                            <CustomDateTimePicker
                                                value={this.state.apptDate}
                                                mode={'datetime'}
                                                showPicker={show}
                                                setTime={(e, date) => {
                                                    this.setDate(null, date);
                                                }}
                                                onCancleDatePicker={() =>
                                                    this.setState({
                                                        show: false,
                                                    })
                                                }
                                            />
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={this.datepicker}>
                                        <Feather name="edit-2" size={20} color={defaultMode === 'dark' ? "white" : "#424E9C"}/>
                                    </TouchableOpacity>
                                </ListItem>
                                <View style={{height: 10}}/>
                                <ListItem
                                    style={{
                                        marginLeft: 0,
                                        borderBottomWidth: 0,
                                        ...helperFunctions.assBg(),
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                    }}>
                                    <Col style={{marginLeft: 0}}>
                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                ...helperFunctions.textSize(),
                                                ...helperFunctions.assColor(),
                                            }}>
                                            {/* {clientInfo.rewardBalance} */}
                                            Source
                                        </Text>

                                        {/* <Item picker> */}
                                        <View><Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>{Platform.OS == 'android' ? 'Android App' : 'iOS App'}</Text></View>
                                        {/* </Item> */}
                                    </Col>
                                </ListItem>
                                <View style={{height: 10}}/>
                                <ListItem
                                    style={{
                                        borderBottomWidth: 0,
                                        marginLeft: 0,
                                        ...helperFunctions.assBg(),
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                    }}>
                                    <Col>
                                        <Text
                                            style={{
                                                ...helperFunctions.textBlack(),
                                                ...helperFunctions.textSize(),
                                                ...helperFunctions.assColor(),
                                            }}>
                                            {/* {clientInfo.rewardBalance} */}
                                            Client Note
                                        </Text>

                                        <TextInput
                                            style={{paddingHorizontal: 5, paddingVertical: 30, color: helperFunctions.darkLightColor()}}
                                            placeholder="1200 Chars Max"
                                            placeholderTextColor="#999999"
                                            fontFamily={'Poppins-Medium'}
                                            fontSize={13.5}
                                            multiline={true}
                                            maxLength={1200}
                                            padding={0}
                                            onChangeText={text => this.onNoteChange(text)}
                                            value={this.state.staffNotes}
                                        />
                                    </Col>

                                </ListItem>
                                {this.state.status == 'Booked' && this.state.checkInOutAllowed == true && this.props.customerBookingAllowed == true &&
                                <><View style={{height: 10}}/>
                                    <Col>
                                        <Button onPress={this.updateNote} style={{width: 120, ...helperFunctions.assBg(),...helperFunctions.flexRow(), justifyContent: 'center', alignSelf: 'flex-end'}}><Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>Update Note</Text></Button>
                                    </Col></>
                                }
                                {this.state.status == 'Checked In' && this.state.checkInOutAllowed == true && this.props.customerBookingAllowed == true &&
                                <><View style={{height: 10}}/>
                                    <Col>
                                        <Button onPress={this.updateNote} style={{width: 120,...helperFunctions.assBg(),...helperFunctions.flexRow(), justifyContent: 'center', alignSelf: 'flex-end'}}><Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>Update Note</Text></Button>
                                    </Col></>
                                }
                                <View style={{height: 10}}/>
                                <ListItem
                                    style={{
                                        // height: 49,
                                        paddingHorizontal: 25,
                                        borderRadius: 3,
                                        borderWidth: 0,
                                        borderBottomWidth: 0,
                                        borderTopWidth: 0,
                                        borderTopColor: 'transparent',
                                        marginLeft: 0,
                                        ...helperFunctions.assBg()
                                    }}>
                                    <Left style={{borderTopWidth: 0}}>
                                        <Text style={{...helperFunctions.textBlack()}}>
                                            {/* {clientInfo.rewardBalance} */}
                                            Services Booked
                                        </Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={this.toggleAddModal}>
                                            <Feather name="plus" size={25} color={defaultMode === 'dark' ? "white" : "#424E9C"}/>
                                        </TouchableOpacity>
                                    </Right>
                                </ListItem>

                                {this.state.visitTechnicians &&
                                this.state.visitTechnicians.length > 0 &&
                                this.state.visitTechnicians.map((item, index) => (
                                    <Fragment key={index}>
                                        <Items editAddedServices={this.editAddedService} deleteTechs={this.props.navigation.state.params.realUpdate ==
                                        true ? this.deleteRealTechnician : this.deleteTechnician } {...this.props} {...{item}}/>
                                        {this.state.visitTechnicians.length - 1 != index && (
                                            <View
                                                style={{
                                                    borderBottomColor: '#ddd',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                        )}
                                    </Fragment>
                                ))}

                                {this.props.StoreAllData &&
                                this.props.StoreAllData.locations[0].brands.length > 0 &&
                                this.state.visitTechnicians.length > 0 && (
                                    <ListItem
                                        style={{
                                            // height: 49,
                                            paddingHorizontal: 20,
                                            borderBottomWidth: 0,
                                            borderRadius: 3,
                                            marginLeft: 0,
                                            ...helperFunctions.assBg()
                                        }}>
                                        <Left>
                                            <Text style={{...helperFunctions.textBlack()}}>
                                                {/* {clientInfo.rewardBalance} */}
                                                Products
                                            </Text>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={this.toggleProductModal}>
                                                <Feather name="plus" size={25} color={defaultMode === 'dark' ? "white" : "#424E9C"}/>
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>
                                )}
                                {this.state.purchaseItems.length > 0 &&
                                this.state.purchaseItems.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Items
                                                purchaseItems={true}
                                                editProducts={this.editProduct}
                                                deleteProducts={this.props.navigation.state.params.realUpdate ==
                                                true ? this.deleteRealProduct : this.deleteProduct } {...this.props}
                                                item={item}/>
                                            {this.state.purchaseItems.length - 1 != index && (
                                                <View
                                                    style={{
                                                        borderBottomColor: '#ddd',
                                                        borderBottomWidth: 1,
                                                    }}
                                                />
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </List>

                            <Label style={{height: 20}}/>
                        </View>
                        <View style={{height: 62}}/>
                    </ScrollView>
                </View>
                <View>
                    <Modal
                        style={{margin: 0}}
                        backgroundColor="white"
                        animationIn="slideInDown"
                        animationOut="slideOutDown"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        isVisible={this.state.isModalVisible}>
                        <AddEditServices
                            item={this.state.item}
                            closeModal={this.closeModal}
                            TechnicianId={this.props.TechnicianId}
                            addService={this.addService}
                            servicesCounter={this.state.visitTechnicians}
                            isEditable={this.state.isEditable}
                            realUpdate={this.props.navigation.state.params.realUpdate}
                            visitId={this.props.navigation.state.params.visit}
                            apptDate={this.state.apptDate}
                        />
                    </Modal>
                </View>
                <View>
                    <Modal
                        style={{margin: 0}}
                        backgroundColor="white"
                        animationIn="slideInDown"
                        animationOut="slideOutDown"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        isVisible={this.state.isProductModalVisible}>
                        <AddEditProducts
                            item={this.state.item}
                            closeProductModal={this.closeProductModal}
                            addProduct={this.addProduct}
                            productsCounter={this.state.purchaseItems}
                            isEditable={this.state.isEditable}
                            realUpdate={this.props.navigation.state.params.realUpdate}
                            visitId={this.props.navigation.state.params.visit}
                        />
                    </Modal>
                </View>
                <View style={{backgroundColor: '#FFFFFF'}}>
                    <Modal
                        backdropColor={'#000000'}
                        backdropOpacity={0.5}
                        isVisible={this.state.isReasonModal}>
                        <View
                            style={{
                                backgroundColor: '#FFFFFF',
                                ...helperFunctions.padding(30, 30, 30, 30),
                                position: 'relative',
                                zIndex: -1,
                            }}>
                            <View
                                style={{
                                    ...helperFunctions.flexRow(),
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text style={{...helperFunctions.textSize()}}>
                                    Cancellation Reason
                                </Text>
                                <TouchableOpacity onPress={this.closeReasonModal}>
                                    <Icons color="red" name="close" size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 30}}/>
                            <Form>
                                <Textarea
                                    onChangeText={txt => this.setState({cancelReason: txt})}
                                    name="customerNotes"
                                    rowSpan={5}
                                    bordered
                                    value={this.state.cancelReason}
                                />
                                <View style={{height: 30}}/>
                                <View
                                    style={{
                                        ...helperFunctions.flexRow(),
                                        justifyContent: 'flex-end',
                                    }}>
                                    <Button
                                        onPress={this.confirmDelete}
                                        rounded
                                        style={{
                                            ...helperFunctions.buttonHeight(),
                                            width: 100,
                                            ...helperFunctions.flexRow(),
                                            justifyContent: 'center',
                                            ...helperFunctions.yellowBg(),
                                        }}>
                                        <Text
                                            style={{...helperFunctions.textBlack(), color: 'white'}}>
                                            Delete
                                        </Text>
                                    </Button>
                                </View>
                            </Form>
                            {this.state.loading == true && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255,255,255,.8)',
                                        zIndex: 1,
                                        ...helperFunctions.flexColumn(),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator size="large" color="#424E9C"/>
                                </View>
                            )}
                        </View>
                    </Modal>
                </View>
                <View style={{backgroundColor: '#FFFFFF'}}>
                    <Modal
                        backdropColor={'#000000'}
                        backdropOpacity={0.5}
                        isVisible={this.state.miniModal}>
                        <MiniModal closeMiniModal={this.closeMiniModal}/>
                    </Modal>

                </View>

                <ActionSheet closeActionSheets={this.closeActionSheets} StoreAllData={this.props.StoreAllData} locationId={this.props.locationId} id={this.props.navigation.state.params.ClientInfo && this.props.navigation.getParam('ClientInfo').id}   translateY={this.state.actionSheetOpen}/>

            </Container>
        );
    }

    //find service name from the storage
    findServiceName = (serviceId, categoryId) => {
        // eslint-disable-next-line
        if (this.props.StoreAllData != '') {
            let category = this.props.StoreAllData.offeredServiceCategories.find(
                sc => sc.id == categoryId,
            );
            if (category == null) {
                return 'Service not found';
            }
            let service = category.services.find(s => s.id == serviceId);
            if (service == null) {
                return 'Service not found';
            }
            return service.name;
        }
    };

    findTechnician(technicianId, query) {
        // eslint-disable-next-line
        if (this.props.StoreAllData != '') {
            let technician = this.props.StoreAllData.locations[0].technicians.find(
                technician => technician.id == technicianId,
            );
            if (technician) {
                if (query == 'image') {
                    //console.log(technician.user.imageUrl);
                    return technician.user.imageUrl;
                }
            }
            if (query == 'nick') {
                return technician.user.names.nick;
            } else {
                return technician.user.fullName;
            }
            return '';
        }
    }

    findDurationPrice = (displayedPrice, query) => {
        if (displayedPrice.substring(0, 1) == '$') {
            if (displayedPrice.includes('-')) {
                const newOne = displayedPrice.split('-');

                const firstPart = newOne[0].substring(1);
                const secondPart = newOne[1].replace(' ', '');

                return (
                    '$' +
                    (firstPart * 1).toFixed(2) +
                    ' - ' +
                    '$' +
                    (secondPart.substring(1, secondPart.length) * 1).toFixed(2)
                );
            } else {
                //console.log('FUN',technician)
                return (
                    '$' +
                    (displayedPrice.substring(1, displayedPrice.length) * 1).toFixed(2)
                );
            }
        } else if (displayedPrice.includes('From')) {
            const newOne = displayedPrice.split('From');
            const secondPart = newOne[1].replace(' ', '');

            return (
                'from ' +
                ' $' +
                (secondPart.substring(1, secondPart.length) * 1).toFixed(2)
            );
        } else {
            return displayedPrice;
        }
    };

    formatMobileNumber = number => {
        let firstThree = number.toString().substring(0, 3);
        let middleThree = number.toString().substring(3, 6);
        let remainderNumber = number
            .toString()
            .substring(6, number.toString().length);
        return firstThree + '-' + middleThree + '-' + remainderNumber;
    };
}

const mapStateProps = state => {
    const TechnicianId = state.LoggedData.TechnicianId;
    const customerBookingAllowed = state.LoggedData.customerBookingAllowed;
    const ServiceList =
        state.StoreDataReducer.StoreLocationInfo[0].offeredServices;
    const Technicians = state.StoreDataReducer.StoreLocationInfo[0].technicians;
    const locationId = state.LoggedData.locationId;
    const AllClientsData = state.ClientsReducer.AllClientsData;
    const businessId = state.LoggedData.businessId;
    const StoreAllData = state.StoreDataReducer.StoreAllData;

    return {
        // StoreLocationInfo,
        // FormulaListData,
        // TechniciansInfo,
        // TechnicianId,
        // ClientInfo,
        // UserFormulaTypes
        ServiceList,
        Technicians,
        locationId,
        AllClientsData,
        businessId,
        TechnicianId,
        StoreAllData,
        customerBookingAllowed
    };
};

export default connect(mapStateProps)(Appointment);

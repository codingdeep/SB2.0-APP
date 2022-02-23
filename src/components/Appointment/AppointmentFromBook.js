/* eslint-disable */
import React, {Component, Fragment} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Platform, TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import {
    Left, Container,
    Right,
    Item,
    Form,
    Body,
    Icon,
    Content,
    Title,
    Row,
    ListItem,
    List,
    Thumbnail,
    Badge,
    Col,
    Label,
    Picker,
    Input, Textarea, Button, Toast,
    Card, CardItem,
    Header
} from 'native-base';

import HeaderComponent from '../Header/header';
import Moment from 'moment';
import styles from './styles';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Iconn from 'react-native-vector-icons/AntDesign';
import CheckOut from '../Modal/checkOut';
import {
    _checkInBooking, _checkServiceIn, _checkServiceOut,
    _getSingleVisit,
    DeleteProduct,
    DeleteService,
    saveBooking, updateBooking, updateCustomerNote,
} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import {SearchBar} from 'react-native-elements';
import Search from 'react-native-search-box';
import {GetSearchClient} from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import CustomDateTimePicker from '../ImportantFunction/datePicker';
import CellPhoneNumFormat from '../ImportantFunction/cellPhoneNumFormat';
import DecimalFormat from '../ImportantFunction/decimalFormat';
import {helperFunctions} from '../../_helpers';
import {GetSearchService} from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import Animated, {floor} from 'react-native-reanimated';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import {toast} from '../Toast/Toast';
import {_requestToPasrAppoApi} from '../../Redux/SagaActions/AppoinmentsSagaAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionSheet from '../ActionSheet/actionSheet';
import {withTransition} from 'react-native-redash';
import moment from 'moment';
import Modal from 'react-native-modal';
import AddEditServices from '../Modal/addEditServices';
import AddEditProducts from '../Modal/addEditProducts';
import Icons from 'react-native-vector-icons/EvilIcons';
import MiniModal from '../Modal/miniModal';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import Items from './items';
import CheckIn from '../Modal/checkIn';
import Entypo from 'react-native-vector-icons/Entypo';
import CreateClient from "../Clinets/createClient";

const defaultMode = Appearance.getColorScheme() || 'light';

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    not,
    interpolate,
} = Animated;
let setProductName = [];
//const translateY = new Animated.Value(400);
const isOpen = new Animated.Value(0);
const state = new Animated.Value(State.UNDETERMINED);
const transition = withTransition(isOpen);
const {width, height} = Dimensions.get('window')

class Appointment extends Component {
    constructor(props) {

        super(props);
        let dayPart = '';
        let apptDateBook = this.props.navigation.state.params.selectedDayData;
        if (apptDateBook) {

            dayPart = moment(apptDateBook.start).format('YYYY-MM-DDT');
            //if(this.props.navigation.state.params.times.hour == ''){}
            var apptDate = '';
            let difference = this.getDuration(dayPart + this.props.StoreAllData.visualAttributes.silverbirdCalStart, dayPart + this.props.navigation.state.params.times.hour);
            if (difference > 1) {
                let added = moment(dayPart + this.props.StoreAllData.visualAttributes.silverbirdCalStart).add(1, 'minutes');
                apptDate = added;
            } else {
                apptDate = dayPart + this.props.navigation.state.params.times.hour;
            }
        }

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
            clientInfo: this.props.navigation.state.params.ClientInfo != undefined ? this.props.navigation.state.params.ClientInfo : '',
            clientRoute: '',
            visitID: '',
            item: '',
            isEditable: false,
            isProductModalVisible: false,
            visitTechId: '',
            isReasonModal: false,
            cancelReason: '',
            apptDate: apptDate,
            loading: false,
            updateDate: '',
            visit: '',
            appointments: '',
            miniModal: false,
            checkInOutAllowed: false,
            isCheckInModalVisible: false,
            status: '',
            value: '',
            items: [],
            client: {
                id: this.props.navigation.state.params.ClientInfo != undefined ? this.props.navigation.state.params.ClientInfo.id : '',
            },
            proccess: false,
            vt: '',
            chargeAmount: '',
            checkOutModal: false,
            staffNotes: '',
            actionSheetOpen: false,
            clientSelected: false,
            saveBooking: true,
            errors:{},
            visibility: false,
            popUp: false
        };
    }

    tapStateEvent = Animated.event([{
        nativeEvent: ({state}) => {
          console.log('native',state)
            return cond(
                eq(state, State.END),
                set(isOpen, not(isOpen)),
                [state, isOpen],
                //cond(eq(translateY, 400), set(translateY, 0), set(translateY, 400)),
            );
            //return cond
        },

    }]);
    translateY = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [400, 0],
    });

    zIndex = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [-1, 1],
    });

    onSourceValueChange = value => {
        this.setState({
            requestSource: value,
        });
    };

  changeActionSheet=()=>{
    this.setState({actionSheetOpen: !this.state.actionSheetOpen})
  }

    componentDidMount() {
        const visits = [];
        const purchaseItems = [];
        if (this.props.navigation.state.params.visit) {
            this.getSingleVisit(this.props.navigation.state.params.visit);
        }
        if (this.props.navigation.state.params.Rebook == true) {
            console.log('VIINFO', this.props.navigation.state.params.ApptInfo.visitTechnicians);
            const ownVisit = this.props.navigation.state.params.ApptInfo.visitTechnicians.filter(vt => vt.technician.id === this.props.TechnicianId);
            ownVisit.map(vt => {
                visits.push({
                    id: vt.id,
                    key: vt.id,
                    timeStart: moment(new Date()),
                    timeEnd: moment(new Date()).add(this.getDuration(vt.expectedEndTime, vt.expectedStartTime), 'minutes'),
                    servicename: this.findServiceName(
                        vt.offeredService.id,
                        vt.offeredService.category.id,
                    ),
                    price: (vt.chargeAmount * 1).toFixed(2),
                    technician: vt.technician.id,
                    service: vt.offeredService.id,
                    technicianname: this.findTechnician(vt.technician.id, 'nick'),
                    technicianImage: this.findTechnician(vt.technician.id, 'image'),
                });
            });
            if (this.props.navigation.state.params.ApptInfo.purchaseItems.length > 0) {
                this.props.navigation.state.params.ApptInfo.purchaseItems.map(p => {
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
                    });
                });
            }
            this.setState({
                visitTechnicians: visits,
                purchaseItems,
                staffNotes: this.props.navigation.state.params.ApptInfo.staffNotes,
                requestType: this.props.navigation.state.params.ApptInfo.requestType,
                requestSource: this.props.navigation.state.params.ApptInfo.requestSource,
            });
        }
    }

    getSingleVisit = visitId => {
        _getSingleVisit(visitId).then(res => {

            console.log('ede',res);

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
                        vtStatus: vt.status,

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
                        checkInOutAllowed: res.checkInOutAllowed,

                    });
                });
            }
            if (res.status != 'Cancelled') {
                this.setState({
                    visit: res,
                    visitTechnicians: visits.reverse(),
                    purchaseItems: products,
                    customerNotes: res.customerNotes,
                    apptDate: res.bookedTime,
                    requestType: res.requestType,
                    requestSource: res.requestSource,
                    visitID: res.id,
                    clientInfo: res.client,
                    checkInOutAllowed: res.checkInOutAllowed,
                    loading: false,
                    client: {
                        id: res.client.id,
                    },
                    status: res.status,
                    chargeAmount: '',
                    staffNotes: res.staffNotes,
                }, () => {

                    this.setState({
                        proccess: true,
                    });
                });
            } else {
                if (this.props.navigation.state.params.reloadData) {
                    this.props.navigation.state.params.reloadData()();
                }
                this.props.navigation.navigate('MyBook');
            }
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
        this.setState({
            ...this.state,
            staffNotes: text,
        },()=>{
            console.log(this.state.staffNotes);
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
                    console.log(this.state.visitTechnicians);
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
                    console.log(this.state.purchaseItems);
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
                    console.log(this.state.purchaseItems);
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
        console.log('ITEMSSS', item);
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
        console.log(item);
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

        const currentMinutes = Moment.duration(Moment(currentDate)).asMinutes();
        if (selectedMinutes >= currentMinutes) {
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

                            });
                        } else {
                            let datePart = Moment(this.state.updateDate).format('YYYY-MM-DDT');
                            newServices.push({
                                ...this.state.visitTechnicians[i],

                                timeEnd: datePart +
                                    Moment(this.state.visitTechnicians[i].timeEnd).format(
                                        'HH:mm:ss',
                                    ),
                                timeStart: Moment(this.state.updateDate).format(
                                    'YYYY-MM-DDTHH:mm:ss',
                                ),

                            });
                        }
                    }

                    this.setState({visitTechnicians: newServices});
                }
            });
        } else {
            alert('Please add a valid date!!');
        }
    };
    getDuration = (timeB, timeS) => {
        const sum = moment(timeB).diff(
            moment(timeS),
        );
        const minutes = parseInt(moment.duration(sum).asMinutes());

        return minutes;
    };
    saveBooking = async () => {
        this.setState({
            saveBooking: false,
            loading:true
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
                                    .add(this.getDuration(this.state.visitTechnicians[0].timeEnd, this.state.visitTechnicians[0].timeStart), 'minutes')
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
                staffNotes: this.state.staffNotes,
                visitTechnicians: tech,
                purchaseItems: purchaseItems,
                client: this.state.client,

            };
            console.log('UPDATE JSON', apptJSON);
            if(this.state.saveBooking == true) {
                await updateBooking(
                    this.state.visitID,
                    apptJSON,
                    response => {
                        this.setState({
                            purchaseItems: [],
                            visitTechnicians: [],
                            staffNotes: '',
                            saveBooking: true
                        });
                        // alert()

                        if (this.props.navigation.state.params.reloadData) {
                            this.props.navigation.state.params.reloadData()();
                        }
                        this.props.navigation.navigate('MyBook');
                    },
                    error => {
                        this.setState({
                            saveBooking: true
                        });
                        toast(error.errors ? error.errors : error.message, 'BOTTOM');
                    },
                )
            }
        } else {
            if(this.state.saveBooking == true) {
                await saveBooking(
                    this.state,
                    response => {
                        this.setState({
                            purchaseItems: [],
                            visitTechnicians: [],
                            staffNotes: '',
                            saveBooking: true,
                            loading: false
                        });
                        if (this.props.navigation.state.params.reloadData) {
                            this.props.navigation.state.params.reloadData()();
                        }
                        this.props.navigation.navigate('MyBook');

                    },
                    error => {
                        this.setState({
                            saveBooking: true,
                            loading: false
                        });
                        let err = error.errors ? error.errors : error.message
                        alert(err)
                    },
                );
            }
        }
    };
    closeReasonModal = () => {
        this.setState({
            isReasonModal: false,
        });
    };

    openMiniModal = (id) => {

        _requestToPasrAppoApi(this.state.location.id, id).then(a => {
            console.log('mini', a);
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


    searchItems = async txt => {
        this.setState({
            value: txt,
        });
        const inputLength = txt.length;
        if (inputLength === 0) {
            this.setState({
                items: [],
                ServiceList: [],
                isSearchable: false,
            });
        } else {
            let clientInfo = await GetSearchClient(this.props.businessId, txt);
            this.setState({
                items: clientInfo,
            });
        }
    };

    onClientSelect = (clientInfo) => {
        this.setState({
            clientInfo,
            value: clientInfo.fullName,
            client: {
                id: clientInfo.id,
            },
            items: [],
        }, () => {
            this.setState({
                clientSelected: !this.state.clientSelected,
                popUp: true
            })
        });
    };

    toggleModal = id => {
        this.setState(
            {
                visitId: id,
                isModalVisible: true,
            },
            () => {
                this.setState({
                    isCheckIn: true,
                });
            },
        );
    };
    closeCheckinModal = () => {
        this.setState({
            isCheckInModalVisible: false,
        });
    };

    checkIn = customerNotes => {
        this.setState({
            loading: true,
        });
        _checkInBooking(customerNotes, this.state.visitID)
            .then(res => {
                this.setState({
                    loading: false,
                    isCheckInModalVisible: false,
                });
                this.getSingleVisit(this.state.visitID);
                if (this.props.navigation.state.params.reloadData) {
                    this.props.navigation.state.params.reloadData()();
                }
            })
            .catch(e => {
                this.setState({
                    loading: false,
                    isCheckInModalVisible: false,
                });
                e.json().then(err => {
                    alert(err.message);
                });
            });
    };

    checkServiceIn = (id) => {

        this.setState({
            loading: true,
        });

        _checkServiceIn(id).then(res => {
            if (this.props.navigation.state.params.reloadData) {
                this.props.navigation.state.params.reloadData()();
            }
            this.getSingleVisit(this.props.navigation.state.params.visit);
        }).catch(err => {
            err.json().then(e => {
                alert(e.message());
            });
        });


    };
    checkServiceOut = (id, chargeAmount) => {

        this.setState({
            vt: id,
            checkOutModal: true,
            chargeAmount,
        });
    };

    closeCheckOutModal = () => {
        this.setState({
            vt: '',
            checkOutModal: false,
            errors: {}
        });
    };

    checkOutService = (amount) => {
        //alert(amount)
        let errors = this.state.errors
        if(amount == 0 || amount < -1){
            errors.chargeAmount = 'Amount is not valid!';
        }
        this.setState({
            errors
        });

        if(Object.keys(this.state.errors).length === 0 ) {
            this.setState({
               loading: true
            });
            _checkServiceOut(this.state.vt, amount).then(res => {
                ///console.log('RES', res);
                this.setState({
                    loading: false,
                    chargeAmount: '',
                    vt: '',
                    errors: {}
                });
                this.closeCheckOutModal();

                if (this.props.navigation.state.params.reloadData) {
                    this.props.navigation.state.params.reloadData()();
                }
                this.props.navigation.navigate('MyBook');
            }).catch(err => {
                this.setState({
                    loading: false,
                    checkOutModal: false,
                    errors:{}
                });
                err.json().then(e => {

                    alert(e.message());

                });
            });
        }

    };

    toggleCheckInModal = () => {
        this.setState({
            isCheckInModalVisible: true,
        });
    };

    updateNote = async () => {
        const notes = {
            staffNotes: this.state.staffNotes,
        };
         await updateCustomerNote(this.state.visitID, notes).then(res => {
             alert('Notes is updated successfully!!')
            this.getSingleVisit(this.state.visitID);

        }).catch(e => {
            e.json().then(err => {
                alert(err.message);
            });
        });
    };

    closeActionSheets=()=>{
        this.setState({
            actionSheetOpen: !this.state.actionSheetOpen
        })
    }
    getClientInfo=(info)=>{
        this.setState({
            clientInfo:info,
            value: info.fullName,
            client: {
                id: info.id,
            },
            items: [],
        }, () => {
            this.setState({
                clientSelected: !this.state.clientSelected,
                popUp: true
            })
        });
    }

    cancelProcess=()=>{
        this.setState({
            clientInfo:{},
            value: '',
            client: {
                id: '',
            },
            items: [],
        }, () => {
            this.setState({
                clientSelected: !this.state.clientSelected,
                popUp: false
            })
        });
    }


    render() {
        const {show, apptDate, mode, search, clientRoute, clientInfo, payload, productName, items, visibility} = this.state;

        const {navigation} = this.props;

        return this.state.loading == true ? (<View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center', ...helperFunctions.lightDarkBg(),
        }}><ActivityIndicator color="#999"/></View>) : (
            <Fragment><Container style={{...styles.pro_background, ...helperFunctions.whiteToDark()}}>
                <View
                    style={{justifyContent: 'center', ...helperFunctions.themeBg(), ...helperFunctions.headerHeight()}}>
                    <HeaderComponent
                        color="white"
                        title={!this.props.navigation.state.params.status ? 'Appointment' : this.props.navigation.state.params.status && this.props.navigation.state.params.status == 'Checked Out' && this.props.navigation.state.params.realUpdate == true ? 'Appointment' : this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' && this.props.navigation.state.params.realUpdate == true ? 'Edit Appointment' : 'Appointment'
                        }
                        // forFunction="true"
                        // rightImg="rightImg"
                        rightTitle={
                            !this.props.navigation.state.params.status ? 'Add Appt' : this.props.navigation.state.params.status && this.props.navigation.state.params.status == 'Checked Out' && this.state.visitTechnicians.length > 0 && this.props.navigation.state.params.realUpdate == true ? 'Details' : this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' && this.state.visitTechnicians.length > 0 && this.props.navigation.state.params.realUpdate == true ? 'Update' : 'Add Appt'}

                        onFunctionCall={!this.props.navigation.state.params.status && this.state.saveBooking != false ? () => this.saveBooking() : this.props.navigation.state.params.status && this.props.navigation.state.params.status == 'Checked Out' && this.state.visitTechnicians.length > 0 && this.props.navigation.state.params.realUpdate == true ? () => console.log('Deetails') : this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' && this.state.visitTechnicians.length > 0 && this.props.navigation.state.params.realUpdate == true && this.state.saveBooking != false ?  () => this.saveBooking() : this.state.saveBooking != false ? () => this.saveBooking() : () => console.log('Do Nothing')}
                        {...this.props}
                    />
                </View>
                <View style={{flex: 8}}>
                    <ScrollView>


                        <View style={{marginHorizontal: 20, marginBottom: 20}}>
                            {!this.props.navigation.state.params.calendar &&
                            <View>

                                <View style={{height: 15}}/>
                                {this.props.navigation.state.params.ClientInfo == undefined &&
                                <><Text
                                    style={{
                                        ...helperFunctions.textBlack(),
                                        ...helperFunctions.themeColor(),
                                    }}>
                                    Search or create clients
                                </Text>
                                    <View style={{height: 15}}/>


                                    <Item
                                        style={{
                                            borderColor: '#FFFFFF',
                                            paddingHorizontal: 10,
                                            borderRadius: 3,
                                            ...helperFunctions.assBg(),
                                            borderBottomColor: 'transparent',
                                        }}>
                                        <Input
                                            value={this.state.value}
                                            style={{
                                                ...helperFunctions.inputHeight(),
                                                ...helperFunctions.mediumFont(),
                                                color: helperFunctions.darkLightColor(),
                                            }}
                                            placeholderTextColor="#999"
                                            placeholder="Search here"
                                            onChangeText={text => this.searchItems(text)}
                                        />
                                        <TouchableOpacity onPress={()=>this.setState({visibility: true})}>
                                            <Text style={{...helperFunctions.themeColor()}}>+ Add New</Text>
                                        </TouchableOpacity>
                                    </Item></>
                                }

                                {items.length > 0 && (
                                    <View
                                        style={{width: width - 40}}>
                                        {items.map((i, k) => {
                                            return (
                                                <View
                                                    style={{
                                                        paddingVertical: 10,
                                                        ...helperFunctions.borderBottom(),
                                                    }}
                                                    key={k}>
                                                    <TouchableWithoutFeedback
                                                        onPress={() => this.onClientSelect(i)}>
                                                        <Text style={{...helperFunctions.textBlack()}}>
                                                            {i.fullName} ({this.formatMobileNumber(i.mobileNumber)})
                                                        </Text>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            );
                                        })}
                                    </View>
                                )}
                            </View>}
                            <View>
                                <View style={{height: 10}}></View>
                                {Object.keys(clientInfo).length > 0 &&
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
                                        <View style={{...helperFunctions.flexRow(), alignItems: 'center'}}><Thumbnail
                                            style={styles.userImage}
                                            source={{uri: clientInfo.imageUrl}}
                                        />
                                            <Text
                                                style={{
                                                    ...helperFunctions.textBlack(),
                                                    ...helperFunctions.mediumFont(),
                                                    textTransform: 'uppercase',
                                                    ...helperFunctions.themeColor(),
                                                    marginLeft: 10,
                                                }}>
                                                {clientInfo.fullName}
                                            </Text></View>
                                        <Text
                                            style={{
                                                textTransform: 'uppercase',
                                                ...helperFunctions.textSize(),
                                                color: helperFunctions.darkLightColor(),
                                            }}>
                                            {clientInfo.mobileNumber &&
                                            this.formatMobileNumber(clientInfo.mobileNumber)}
                                        </Text>
                                        <Text style={{
                                            ...helperFunctions.textSize(),
                                            color: helperFunctions.darkLightColor(),
                                        }}>
                                            Balance: $
                                            {clientInfo.rewardBalance
                                                ? clientInfo.rewardBalance.toFixed(2)
                                                : '0.00'}
                                        </Text>
                                    </View>
                                </View>}

                                <View>
                                    {this.state.status != '' && this.state.status == 'Checked In' &&
                                    <Button
                                        style={{
                                            width: 100,
                                            ...helperFunctions.flexRow(),
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                        }}
                                        rounded
                                        warning
                                        small>
                                        <Text style={{textAlign: 'center'}}>
                                            <Entypo color='#2babe3' size={15} name="arrow-down"/>{' '}
                                            {helperFunctions.formatDateTimeWithDay(
                                                moment(this.state.visit.bookedTime),
                                                'time',
                                            )}
                                        </Text>
                                    </Button>
                                    }
                                    {this.state.status != '' && this.state.status == 'Checked Out' &&
                                    <Button
                                        style={{
                                            width: 100,
                                            ...helperFunctions.flexRow(),
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                        }}
                                        rounded
                                        warning
                                        small>
                                        <Text style={{textAlign: 'center'}}>
                                            <Entypo color='#2babe3' size={15} name="arrow-up"/>{' '}
                                            {helperFunctions.formatDateTimeWithDay(
                                                moment(this.state.visit.bookedTime),
                                                'time',
                                            )}
                                        </Text>
                                    </Button>
                                    }
                                    {this.state.status == 'Booked' && this.state.checkInOutAllowed == true && this.props.customerBookingAllowed == true &&
                                    <Button
                                        style={{width: 100, alignSelf: 'center', marginTop: 5}}
                                        onPress={() => this.toggleCheckInModal()}
                                        block
                                        warning
                                        rounded
                                        small>
                                        <Text>Check In</Text>
                                    </Button>
                                    }
                                </View>

                                <View style={{height: 20}}/>
                                {Object.keys(clientInfo).length > 0 &&
                                <List>
                                    <ListItem
                                        style={{
                                            ...helperFunctions.assBg(),
                                            borderBottomWidth: 0,
                                            marginLeft: 0,
                                            paddingHorizontal: 25,
                                            borderRadius: 3,
                                        }}>
                                        <View style={{
                                            ...helperFunctions.flexRow(),
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}>
                                            <View style={{...helperFunctions.flexRow(), alignItems: 'center'}}>
                                                <Text
                                                    style={{
                                                        ...helperFunctions.textBlack(),
                                                        ...helperFunctions.textSize(),
                                                        ...helperFunctions.assColor(),
                                                        marginRight: 20,
                                                    }}>
                                                    Last Visit:
                                                </Text>
                                                <Text
                                                    style={{
                                                        ...helperFunctions.textBlack(),
                                                    }}>
                                                    {clientInfo.lastVisit
                                                        ? clientInfo.lastVisit.readableBookedTime
                                                        : 'NONE'}{' '}
                                                </Text>
                                            </View>
                                            {clientInfo.lastVisit &&

                                                <View>
                                                  <TouchableOpacity onPress={this.changeActionSheet}><Text><AntDesign name="eyeo" color="skyblue" size={20}/></Text></TouchableOpacity>
                                                </View>
                                            }


                                        </View>
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
                                        <View style={{...helperFunctions.flexRow(), alignItems: 'center'}}>
                                            <Text
                                                style={{
                                                    ...helperFunctions.textBlack(),
                                                    ...helperFunctions.textSize(),
                                                    ...helperFunctions.assColor(),
                                                    marginRight: 20,
                                                }}>
                                                Next Visit:
                                            </Text>
                                            <Text
                                                style={{
                                                    ...helperFunctions.textBlack(),
                                                }}>
                                                {clientInfo.nextVisit
                                                    ? clientInfo.nextVisit.readableBookedTime
                                                    : 'NONE'}{' '}
                                            </Text>


                                        </View>
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
                                        <View
                                            style={{marginLeft: 0, ...helperFunctions.flexRow(), alignItems: 'center'}}>
                                            <Text
                                                style={{
                                                    ...helperFunctions.textBlack(),
                                                    ...helperFunctions.textSize(),
                                                    ...helperFunctions.assColor(),
                                                    marginRight: 20,
                                                }}>
                                                {/* {clientInfo.rewardBalance} */}
                                                Source:
                                            </Text>
                                            <Text style={{
                                                ...helperFunctions.textBlack(),
                                                color: helperFunctions.darkLightColor(),
                                            }}>{Platform.OS == 'ios' ? 'iOS App' : 'Android App'}</Text>

                                        </View>
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
                                        {this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' && this.props.navigation.state.params.status != 'Cancelled' &&
                                        <TouchableOpacity onPress={this.datepicker}>
                                            <Feather name="edit-2" size={15}
                                                     color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                        </TouchableOpacity>
                                        }
                                        {this.props.navigation.state.params.status == undefined &&
                                        <TouchableOpacity onPress={this.datepicker}>
                                            <Feather name="edit-2" size={15}
                                                     color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                        </TouchableOpacity>}
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
                                                style={{
                                                    paddingHorizontal: 5,
                                                    paddingVertical: 30,
                                                    color: helperFunctions.darkLightColor(),
                                                }}
                                                placeholder="Please enter note (max 1200 chars)"
                                                placeholderTextColor="#999999"
                                                fontFamily={'Poppins-Medium'}
                                                fontSize={13.5}
                                                multiline={true}
                                                maxLength={1200}
                                                padding={0}
                                                onChangeText={text => this.onNoteChange(text)}
                                                value={this.state.staffNotes }
                                            />
                                        </Col>
                                    </ListItem>
                                    {this.state.status == 'Booked' && this.props.customerBookingAllowed == true &&
                                    <><View style={{height: 10}}/>
                                        <Col>
                                            <Button onPress={this.updateNote} style={{
                                                width: 120, ...helperFunctions.assBg(), ...helperFunctions.flexRow(),
                                                justifyContent: 'center',
                                                alignSelf: 'flex-end',
                                            }}><Text style={{
                                                ...helperFunctions.textSize(),
                                                color: helperFunctions.darkLightColor(),
                                            }}>Update Note</Text></Button>
                                        </Col></>
                                    }
                                    {this.state.status == 'Checked In' && this.state.checkInOutAllowed == true && this.props.customerBookingAllowed == true &&
                                    <><View style={{height: 10}}/>
                                        <Col>
                                            <Button onPress={this.updateNote} style={{
                                                width: 120, ...helperFunctions.assBg(), ...helperFunctions.flexRow(),
                                                justifyContent: 'center',
                                                alignSelf: 'flex-end',
                                            }}><Text style={{
                                                ...helperFunctions.textSize(),
                                                color: helperFunctions.darkLightColor(),
                                            }}>Update Note</Text></Button>
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
                                            ...helperFunctions.assBg(),
                                        }}>
                                        <Left style={{borderTopWidth: 0}}>
                                            <Text style={{...helperFunctions.textBlack()}}>
                                                {/* {clientInfo.rewardBalance} */}
                                                Services Booked
                                            </Text>
                                        </Left>
                                        <Right>

                                            {!this.props.navigation.state.params.status ?
                                                <TouchableOpacity onPress={this.toggleAddModal}>
                                                    <Feather name="plus" size={25}
                                                             color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                                </TouchableOpacity>
                                                : this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' ?
                                                    <TouchableOpacity onPress={this.toggleAddModal}>
                                                        <Feather name="plus" size={25}
                                                                 color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                                    </TouchableOpacity>
                                                    : <Text/>}
                                        </Right>
                                    </ListItem>

                                    {this.state.visitTechnicians &&
                                    this.state.visitTechnicians.length > 0 &&
                                    this.state.visitTechnicians.map((item, index) => (
                                        <Fragment key={index}>
                                            <Items
                                                purchaseItems={false}
                                                checkServiceIn={this.checkServiceIn}
                                                checkServiceOut={this.checkServiceOut}
                                                bookedTime={item.bookedTime}
                                                permission={this.props.customerBookingAllowed}
                                                checkInCheckOutPerission={this.state.checkInOutAllowed}
                                                status={item.vtStatus && item.vtStatus}
                                                editAddedServices={this.editAddedService}
                                                deleteTechs={this.props.navigation.state.params.realUpdate ==
                                                true ? this.deleteRealTechnician : this.deleteTechnician} {...this.props} {...{item}} />
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
                                                backgroundColor: '#F1F0F5',
                                                paddingHorizontal: 20,
                                                borderBottomWidth: 0,
                                                borderRadius: 3,
                                                marginLeft: 0,
                                                ...helperFunctions.assBg(),
                                            }}>
                                            <Left>
                                                <Text style={{...helperFunctions.textBlack()}}>
                                                    {/* {clientInfo.rewardBalance} */}
                                                    Products
                                                </Text>
                                            </Left>
                                            <Right>

                                                {!this.props.navigation.state.params.status ?
                                                    <TouchableOpacity onPress={this.toggleProductModal}>
                                                        <Feather name="plus" size={25}
                                                                 color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                                    </TouchableOpacity>
                                                    : this.props.navigation.state.params.status && this.props.navigation.state.params.status != 'Checked Out' ?
                                                        <TouchableOpacity onPress={this.toggleProductModal}>
                                                            <Feather name="plus" size={25}
                                                                     color={defaultMode === 'dark' ? 'white' : '#424E9C'}/>
                                                        </TouchableOpacity>
                                                        : <Text/>}
                                            </Right>
                                        </ListItem>
                                    )}
                                    {this.state.purchaseItems.length > 0 &&
                                    this.state.purchaseItems.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <Items
                                                    permission={this.props.customerBookingAllowed}
                                                    checkInCheckOutPerission={this.state.checkInOutAllowed}
                                                    product={true}
                                                    status={item.vtStatus && item.vtStatus}
                                                    purchaseItems={true}
                                                    editProducts={this.editProduct}
                                                    deleteProducts={this.props.navigation.state.params.realUpdate ==
                                                    true ? this.deleteRealProduct : this.deleteProduct} {...this.props}
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
                                }

                                <Label style={{height: 20}}/>
                            </View>
                            <View style={{height: 62}}/>
                        </View>

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
                            myBook={true}
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
                <View>
                    <Modal
                        backdropColor={'#000000'}
                        backdropOpacity={0.5}
                        isVisible={this.state.isReasonModal}>
                        <View
                            style={{
                                ...helperFunctions.lightDarkBg(),
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

                <CheckIn
                    closeModal={this.closeCheckinModal}
                    isModalVisible={this.state.isCheckInModalVisible}
                    checkIn={this.checkIn}
                />

                <CheckOut
                    closeCheckOut={this.closeCheckOutModal}
                    checkOutModal={this.state.checkOutModal}
                    checkServiceOut={this.checkOutService}
                    chargeAmount={this.state.chargeAmount}
                    errors={this.state.errors.chargeAmount && this.state.errors.chargeAmount}
                />


            </Container>
                {this.state.client.id != '' &&
                <ActionSheet closeActionSheets={this.closeActionSheets} StoreAllData={this.props.StoreAllData} locationId={this.props.locationId}
                             id={this.state.client.id}
                             translateY={this.state.actionSheetOpen}/>
                }

                <Modal style={{margin: 0}} isVisible={visibility}>
                    <CreateClient getClient={this.getClientInfo} hideModal={()=>this.setState({visibility: false})}/>
                </Modal>
                <Modal hasBackdrop={false} style={{margin: 0,height: 200,backgroundColor:'red'}} isVisible={false}>
                    <View style={{paddingHorizontal: 40}}>
                        <Card>
                            <CardItem header bordered style={{...helperFunctions.themeBg()}}>
                                <Text style={{fontSize: 20,color:'#fff'}}>ADD SERVICES</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text style={{fontSize: 20}}>
                                        Would you like to add service/services to continue the process?
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                <View style={{...helperFunctions.flexRow(),justifyContent:'space-between',width:'100%'}}>
                                    <TouchableOpacity onPress={()=>this.cancelProcess()}><Text style={{fontWeight:'700',...helperFunctions.themeColor()}}>NO</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={this.toggleAddModal}><Text style={{fontWeight:'700',...helperFunctions.themeColor()}}>YES</Text></TouchableOpacity>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </Modal>



            </Fragment>


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
                    console.log(technician.user.imageUrl);
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
    formatMobileNumber = (number) => {
        let firstThree = number.toString().substring(0, 3);
        let middleThree = number.toString().substring(3, 6);
        let remainderNumber = number.toString().substring(6, number.toString().length);
        return firstThree + '-' + middleThree + '-' + remainderNumber;
    };
}

const mapStateProps = state => {
    const TechnicianId = state.LoggedData.TechnicianId;
    const ServiceList =
        state.StoreDataReducer.StoreLocationInfo[0].offeredServices;
    const Technicians = state.StoreDataReducer.StoreLocationInfo[0].technicians;
    const locationId = state.LoggedData.locationId;
    const AllClientsData = state.ClientsReducer.AllClientsData;
    const businessId = state.LoggedData.businessId;
    const StoreAllData = state.StoreDataReducer.StoreAllData;
    const customerBookingAllowed = state.LoggedData.customerBookingAllowed;

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
        customerBookingAllowed,
    };
};

export default connect(mapStateProps)(Appointment);

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
  Platform,
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
  Button,
  Input
} from 'native-base';
import HeaderComponent from '../Header/header';
import Moment from 'moment';
import styles from './styles';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateBooking } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import { SearchBar } from 'react-native-elements';
import Search from 'react-native-search-box';
import { GetSearchClient } from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import { EditServiceGenerator } from './ServiceGenerator';
import { EditProductGenerator } from './ProductGenerator';
import { ServiceGenerator } from './ServiceGenerator';
import LOADER from '../Loader/Loader';
import Modal from 'react-native-modal';
import { DeleteService } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import { DeleteProduct } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import { toast } from '../Toast/Toast'

import { from } from 'rxjs';
import { saveBooking } from './../../Redux/SagaActions/UpcommingAppoinments_action';
import { GetServiceInfo } from './../../Redux/SagaActions/UpcommingAppoinments_action';
import CustomDateTimePicker from "../ImportantFunction/datePicker"

import CellPhoneNumFormat from "../ImportantFunction/cellPhoneNumFormat"
import DecimalFormat from "../ImportantFunction/decimalFormat"
import {helperFunctions} from '../../_helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let setProductName = []
let setProductImage = [];
class Rebook extends Component {
  constructor(props) {
    super(props);
    let productName = []

    const ApptInfo = this.props.navigation.state.params.ApptInfo

    let payload = {
      location: {
        id: this.props.locationId.id,
      },
      requestSource: ApptInfo.requestSource,
      requestType: ApptInfo.requestType,
      standingAppointment: ApptInfo.standingAppointment,
      customerNotes: ApptInfo.customerNotes,
      visitTechnicians: [],
      purchaseItems: this.getApptProduct(ApptInfo.id, ApptInfo.purchaseItems),
      client: {
        id:
          this.props.navigation.state.params.ApptInfo.client.id
      },
    };




    this.state = {
      apptDate: new Date(ApptInfo.visitTechnicians[0].expectedStartTime),
      mode: 'date',
      show: false,
      productName,
      payload,

      clientInfo: '',

      ApptInfo: '',
      isModalVisible: false,
      deleteServiceItem: '',
      deleteServiceIndex: '',
      cancellaTionReason: '',
      updatedServiceIndex: '',
      updatedProductIndex: ''

    };
    if (this.props.navigation.state.params.ApptInfo) {
      this.getApptService(ApptInfo.id, ApptInfo.visitTechnicians).then((data) => {
        this.state.payload.visitTechnicians = data
        this.setState({
          payload: this.state.payload
        })
      })
    }



  }
  componentDidMount() {
    this.GetApptClientInfo();
  }
  GetApptClientInfo = () => {
    const { navigation } = this.props;
    const ApptInfo = navigation.state.params.ApptInfo



    const clientInfo = ApptInfo.client
    this.setState({
      clientInfo: clientInfo,
      ApptInfo: ApptInfo
    });
  };

  static getDerivedStateFromProps(props, state) {
    const { AllClientsData, businessId } = props;
    return {
      AllClientsData,
      businessId,
    };
  }


  getApptService = (visitId, visitTechnicians) => {
    return new Promise(resolve => {
      let promises = []
      visitTechnicians.forEach(item => {
        promises.push(this.getSingleServiceInfo(item, item.offeredService.id, item.technician.id))
      })
      Promise.all(promises).then((data) => {

        return resolve(data)
      })
    })

  }
  getSingleServiceInfo = (item, serviceId, technicianId) => {
    return new Promise((resolve, reject) => {
      GetServiceInfo(
        serviceId,
        (response) => {
          response.then(data => {
            if (data.technicianServices.find(technician => technician.technician.id == technicianId)) {
              return resolve(ServiceGenerator(
                // null,  // item.id,
                // null, // visitId ? visitId : null, //visit id
                item.technician.id,
                item.offeredService.id,
                item.expectedStartTime,
                item.expectedEndTime,
              ))
            } else {
              return resolve(
                ServiceGenerator(
                  // null,  // item.id,
                  // null, // visitId ? visitId : null, //visit id
                  response.technicianServices[0].technician.id,
                  item.offeredService.id,
                  item.expectedStartTime,
                  item.expectedEndTime,
                )
              )
            }
            // data.technicianServices.filter
            // this.onEditSave(data)
          })
        },
        error => {
          return reject(error)
        }
      )

    })




  }

  getApptProduct = (visitId, purchaseItems) => {
    let self = this
    let product = purchaseItems.map(item => {

      let productDetail = EditProductGenerator(
        item.locatedProductVariant.variant.product.name,
        null, // item.id,
        null, //visitId,
        item.technician.id,
        item.locatedProductVariant.quantity,
        item.locatedProductVariant.salePrice,
        item.locatedProductVariant.id,
      )
      setProductName.push(productDetail.name)
      setProductImage.push(item.locatedProductVariant.variant.imageUrls[0]);
      return productDetail.main
    })
    return product
  };
  setDate = async (event, apptDate) => {
    apptDate = apptDate || this.state.apptDate;
    await this.onChangeApptDate(apptDate)
    this.setState({
      // show: Platform.OS === 'ios' ? true : false,
      apptDate,
      initialLastDate: true,
    });

  };
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };
  onSourceValueChange = value => {
    this.setState({
      sourceValue: value,
    })
    this.state.payload.requestSource = value
  };

  getbackService = () => {
    let self = this;
    return function (data) {
      self.state.payload.visitTechnicians.push(data);
      self.setState({
        payload: self.state.payload,
      });
    };
  };
  getbackEditService = () => {
    let self = this;
    return function (data) {
      self.state.payload.visitTechnicians[self.state.updatedServiceIndex] = data
      self.setState({
        payload: self.state.payload,
      });
    };
  };
  getbackProduct = () => {
    let self = this;

    return function (data) {
      self.state.payload.purchaseItems.push(data.main);
      setProductName.push(data.name);
      self.setState({
        payload: self.state.payload,
        // productName: data.name
      });

    };
  };
  getbackEditProduct = () => {
    let self = this;

    return function (data) {
      self.state.payload.purchaseItems[self.state.updatedProductIndex] = data.main;
      setProductName[self.state.updatedProductIndex] = data.name;
      self.setState({
        payload: self.state.payload,
        // productName: data.name
      });

    };
  };

  getServiceName = id => {
    for (let i = 0; i < this.props.ServiceList.length; i++) {
      if (this.props.ServiceList[i].id == id) {
        return this.props.ServiceList[i].name;
      }
    }
  };

  getServicePrice = id => {
    for (let i = 0; i < this.props.ServiceList.length; i++) {
      if (this.props.ServiceList[i].id == id) {
        return this.props.ServiceList[i].displayedPrice;
      }
    }
  };

  getTechnicialName = id => {
    for (let i = 0; i < this.props.Technicians.length; i++) {
      if (this.props.Technicians[i].id == id) {
        return this.props.Technicians[i].user.fullName;
      }
    }
  };

  saveBooking = async () => {

    await saveBooking(
      this.state.payload,
      response => {
        // if (this.props.navigation.state.params.reloadData) {
        //   this.props.navigation.state.params.reloadData()();
        // }
        this.props.navigation.goBack();
      },
      error => {
        toast(error.errors ? error.errors : error.message, "BOTTOM");
        console.log(error);
      },
    );
  }


  onChangeApptDate = async (newApptDate) => {
    console.log("newApptDate", newApptDate);


    let visitTechnicians = this.state.payload.visitTechnicians
    visitTechnicians.map((service, index) => {
      console.log("service111", service.expectedStartTime, " jjjj ", newApptDate);
      let timeStart;
      if (Moment(service.expectedStartTime).format('A').toLocaleLowerCase() == "pm") {
        timeStart = (parseInt(Moment(service.expectedStartTime).format('hh')) + 12) + Moment(service.expectedStartTime).format(':mm:ssZ')
      } else {
        timeStart = Moment(service.expectedStartTime).format('hh:mm:ssZ')
      }
      let startTime = Moment(newApptDate).format('YYYY-MM-DD') + 'T' + timeStart;


      let timeEnd;
      if (Moment(service.period.to).format('A').toLocaleLowerCase() == "pm") {
        timeEnd = (parseInt(Moment(service.period.to).format('hh')) + 12) + Moment(service.period.to).format(':mm:ssZ')
      } else {
        timeEnd = Moment(service.period.to).format('hh:mm:ssZ')
      }
      let endTime = Moment(newApptDate).format('YYYY-MM-DD') + 'T' + timeEnd;
      // startDate = Moment(this.state.date).format('MM-DD-YYYY') + " " + Moment(startDate).format('hh:mm:ss Z A');
      startTime = Moment(startTime).format("YYYY-MM-DD" + 'T' + "HH:mm:ss")
      endTime = Moment(endTime).format("YYYY-MM-DD" + 'T' + "HH:mm:ss")

      // let startTime = Moment(newApptDate).format('YYYY-MM-DD') + "T" + Moment(service.expectedStartTime).format('hh:mm:ss')

      // let endTime = Moment(newApptDate).format('YYYY-MM-DD') + "T" + Moment(service.period.to).format('hh:mm:ss')
      this.state.payload.visitTechnicians[index].expectedStartTime = startTime
      this.state.payload.visitTechnicians[index].period.to = endTime

      console.log("mmmmmmmmoooo", startTime);

    })

  }


  afterFocus = () => {
    return new Promise((resolve, reject) => {

      resolve();
    });
  }
  onNoteChange = text => {

    this.setState({
      payload: {
        ...this.state.payload,
        customerNotes: text,
      },
    })
  }
  onServiceDeleteModal = (item, index) => {
    this.setState({
      deleteServiceItem: this.state.payload.visitTechnicians[index],
      deleteServiceIndex: index
    })
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  deleteTechnician = index => {
    this.state.payload.visitTechnicians.splice(index, 1);
    this.setState({
      payload: this.state.payload,
    });
  };

  deleteProduct = (index) => {
    this.state.payload.purchaseItems.splice(index, 1);
    this.setState({
      payload: this.state.payload,
    });

  };
  onCenServiceDelete = async () => {
    await this.setState({ isModalVisible: !this.state.isModalVisible });
    this.setState({
      deleteServiceItem: '',
      deleteServiceIndex: ''
    })

  };
  render() {

    const { show, apptDate, mode, clientInfo, payload, productName, ApptInfo } = this.state;

    const { navigation } = this.props;
    const visitTechnicians = ApptInfo.visitTechnicians ? ApptInfo.visitTechnicians[0] : ""

    return !visitTechnicians ? (
      <LOADER />
    ) : (
        <Container style={{...styles.pro_background, ...helperFunctions.themeBg()}}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>

            <HeaderComponent
              title="Rebook"
              color='white'
              // rightImg="rightImg"
              rightTitle={"Rebook"}
              onFunctionCall={() => {
                this.saveBooking()
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
            <ScrollView>
              <View style={{height: 20}}></View>
              <View
                  style={{
                    ...helperFunctions.flexRow(),
                    justifyContent: 'center',
                    marginHorizontal: 20
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
                      }}>
                    {clientInfo.mobileNumber &&
                    this.formatMobileNumber(clientInfo.mobileNumber)}
                  </Text>
                  <Text style={{...helperFunctions.textSize()}}>
                    Balance: $
                    {clientInfo.rewardBalance
                        ? clientInfo.rewardBalance.toFixed(2)
                        : '0.00'}
                  </Text>
                </View>
              </View>

              <View style={{height: 40}} />

              <List style={{marginHorizontal: 20}}>
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

                    <Text
                        style={{
                          ...helperFunctions.textBlack(),
                          marginBottom: -5,
                        }}>
                      {clientInfo.lastVisit
                          ? clientInfo.lastVisit.readableBookedTime
                          : 'NONE'}{' '}
                    </Text>
                  </Col>
                </ListItem>
                <View style={{height: 10}} />
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

                    <Text
                        style={{
                          ...helperFunctions.textBlack(),
                          marginBottom: -5,
                        }}>
                      {clientInfo.nextVisit
                          ? clientInfo.nextVisit.readableBookedTime
                          : 'NONE'}{' '}
                    </Text>
                  </Col>
                </ListItem>
                <View style={{height: 10}} />
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
                      {Moment(show ? clientInfo.createdTime : apptDate).format(
                          'ddd, MMM D, YYYY  hh:mm A',
                      )}
                    </Text>
                  </Col>
                  <View>
                    {show && (
                        <CustomDateTimePicker
                            value={apptDate}
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
                    <Image
                        style={styles.edit}
                        source={require('../../Assets/ic-contact-edit.png')}
                    />
                  </TouchableOpacity>
                </ListItem>
                <View style={{height: 10}} />
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
                    <Picker
                        mode="dropdown"
                        // iosIcon={<Icon name="arrow-down" />}
                        style={{width: '100%', marginLeft: 0}}
                        placeholder="Select Source"
                        placeholderStyle={{color: '#999999'}}
                        placeholderIconColor="#999999"
                        selectedValue={this.state.sourceValue}
                        onValueChange={val => this.onSourceValueChange(val)}>
                      <Picker.Item
                          style={{marginLeft: 0, paddingLeft: 0}}
                          label="Select Source"
                          value=""
                      />
                      <Picker.Item label="iOS App" value="iOS App" />
                      <Picker.Item label="Android App" value="Android App" />
                    </Picker>
                    {/* </Item> */}
                  </Col>
                </ListItem>
                <View style={{height: 10}} />
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
                        style={{paddingHorizontal: 5, paddingVertical: 30}}
                        placeholder="1200 Chars Max"
                        placeholderTextColor="#999999"
                        fontFamily={'Poppins-Medium'}
                        fontSize={13.5}
                        multiline={true}
                        maxLength={1200}
                        padding={0}
                        onChangeText={text => this.onNoteChange(text)}
                        value={this.state.payload.customerNotes}
                    />
                  </Col>
                </ListItem>
                <View style={{height: 10}} />
                <ListItem
                    style={{
                      // height: 49,
                      backgroundColor: '#F1F0F5',
                      paddingHorizontal: 25,
                      borderRadius: 3,
                      borderWidth: 0,
                      borderBottomWidth: 0,
                      borderTopWidth: 0,
                      borderTopColor: 'transparent',
                      marginLeft: 0,
                    }}>
                  <Left style={{borderTopWidth: 0}}>
                    <Text style={{...helperFunctions.textBlack()}}>
                      {/* {clientInfo.rewardBalance} */}
                      Services Booked
                    </Text>
                  </Left>
                  <Right>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('AddEditService', {
                              onGoBack: () => this.getbackService(),
                              apptDate: apptDate,
                              FromEditAppt: 'FromEditAppt',
                              visitId: ApptInfo.id,
                              realUpdate: true,
                            })
                        }>
                      <Image
                          style={styles.plus}
                          source={require('../../Assets/timesheet/plus.png')}
                      />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                {this.state.payload.visitTechnicians.map((item, index) => (
                    <Fragment key={index}>
                      <View
                          style={{
                            ...helperFunctions.flexRow(),
                            marginRight: 30,
                            alignItems: 'center',
                            paddingVertical: 15,
                          }}>
                        <Image
                            style={{
                              width: 50,
                              height: 50,
                              marginRight: 10,
                              borderRadius: 25,
                            }}
                            source={{
                              uri: this.findTechnician(item.technician.id, 'image'),
                            }}
                        />
                        <View style={{width: '80%'}}>
                          <View
                              style={{
                                ...helperFunctions.flexColumn(),
                                justifyContent: 'space-between',
                              }}>
                            <Text style={{...helperFunctions.textSize()}}>
                              {this.getServiceName(item.offeredService.id)} with{' '}
                              {this.findTechnician(item.technician.id, 'nick')}
                            </Text>
                            <View
                                style={{
                                  ...helperFunctions.flexRow(),
                                  marginTop: 10,
                                }}>
                              <Text style={{color: '#666', marginRight: 15}}>
                                <FontAwesome color="#666" name="circle" />{' '}
                                {this.findDurationPrice(
                                    this.getServicePrice(item.offeredService.id),
                                    'price',
                                )}
                              </Text>
                              <Text style={{color: '#666'}}>
                                <FontAwesome color="#666" name="circle" />{' '}
                                {Moment(item.startTime).format('hh:mm a')} -{' '}
                                {Moment(item.endTime).format('hh:mm a')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{...helperFunctions.flexRow()}}>
                          <TouchableOpacity
                              onPress={() => {
                                this.onServiceDeleteModal(item, index);
                              }}>
                            <Image
                                style={styles.edit}
                                source={require('../../Assets/time/ic-actions-trash.png')}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                              style={{marginLeft: 10}}
                              onPress={() => {
                                this.props.navigation.navigate('AddEditService', {
                                  onGoBack: () => this.getbackEditService(),
                                  apptDate: apptDate,
                                  FromEditAppt: 'FromEditAppt',
                                  visitId: ApptInfo.id,
                                  EditService: item,
                                  serviceName: this.getServiceName(
                                      item.offeredService.id,
                                  ),
                                  id: item.id
                                });
                                this.setState({
                                  updatedServiceIndex: index,
                                });
                              }}>
                            <Image
                                style={styles.edit}
                                source={require('../../Assets/ic-contact-edit.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {this.state.payload.visitTechnicians.length - 1 !=
                      index && (
                          <View
                              style={{
                                borderBottomColor: '#ddd',
                                borderBottomWidth: 1,
                              }}
                          />
                      )}
                    </Fragment>
                ))}
                {!this.state.payload.visitTechnicians && <Label />}

                {this.props.StoreAllData.locations[0].brands.length > 0 && (
                    <ListItem
                        style={{
                          // height: 49,
                          backgroundColor: '#F1F0F5',
                          paddingHorizontal: 20,
                          borderBottomWidth: 0,
                          borderRadius: 3,
                          marginLeft: 0,
                        }}>
                      <Left>
                        <Text style={{...helperFunctions.textBlack()}}>
                          {/* {clientInfo.rewardBalance} */}
                          Products
                        </Text>
                      </Left>
                      <Right>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('AddEditProduct', {
                                  onGoBack: () => this.getbackProduct(),
                                  TechnicianId: this.props.TechnicianId,
                                  apptDate: apptDate,
                                  FromEditAppt: 'FromEditAppt',
                                  visitId: ApptInfo.id,
                                  selectedProducts: this.state.payload.purchaseItems,
                                  realUpdate: true,
                                })
                            }>
                          <Image
                              style={styles.plus}
                              source={require('../../Assets/timesheet/plus.png')}
                          />
                        </TouchableOpacity>
                      </Right>
                    </ListItem>
                )}

                {this.state.payload.purchaseItems.map((item, index) => {
                  return (
                      <Fragment key={index}>
                        <View
                            style={{
                              ...helperFunctions.flexRow(),
                              marginRight: 30,
                              alignItems: 'center',
                              paddingVertical: 15,
                            }}>
                          <Image
                              style={{
                                width: 50,
                                height: 50,
                                marginRight: 10,
                                borderRadius: 25,
                              }}
                              source={{uri: setProductImage[index]}}
                          />
                          <View style={{width: '80%'}}>
                            <View
                                style={{
                                  ...helperFunctions.flexColumn(),
                                  justifyContent: 'space-between',
                                }}>
                              <Text style={{...helperFunctions.textSize()}}>
                                {setProductName[index]}
                              </Text>
                              <View
                                  style={{
                                    ...helperFunctions.flexRow(),
                                    marginTop: 10,
                                  }}>
                                <Text style={{color: '#666', marginRight: 15}}>
                                  <FontAwesome color="#666" name="circle" /> Qty:{' '}
                                  {item.quantity}
                                </Text>
                                <Text style={{color: '#666'}}>
                                  <FontAwesome color="#666" name="circle" />{' '}
                                  Price: $ {(item.chargeAmount * 1).toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{...helperFunctions.flexRow()}}>
                            <TouchableOpacity
                                onPress={() => {
                                  this.deleteProduct(index);
                                }}>
                              <Image
                                  style={styles.edit}
                                  source={require('../../Assets/time/ic-actions-trash.png')}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginLeft: 10}}
                                onPress={() => {
                                  this.props.navigation.navigate('AddEditProduct', {
                                    TechnicianId: this.props.TechnicianId,
                                    onGoBackProduct: () => this.getbackEditProduct(),
                                    apptDate: apptDate,
                                    FromEditAppt: 'FromEditAppt',
                                    visitId: ApptInfo.id,
                                    EditProduct: item,
                                    name: setProductName[index],
                                    editable: true
                                  })
                                  this.setState({
                                    updatedProductIndex: index
                                  })
                                }}>
                              <Image
                                  style={styles.edit}
                                  source={require('../../Assets/ic-contact-edit.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        {this.state.payload.visitTechnicians.length - 1 !=
                        index && (
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


              <View style={{ marginHorizontal: 35, marginBottom: 70 }}>
                <ListItem style={styles.ClientInfo}>
                  <Text style={styles.ClientInfoText}>Client Info</Text>
                </ListItem>

                <List>
                  <ListItem avatar style={styles.listItem}>
                    <Left>
                      <Thumbnail
                        style={styles.userImage}
                        source={{ uri: clientInfo.imageUrl }}
                      />
                    </Left>
                    <Body style={styles.body}>
                      <Text style={styles.name}>
                        {clientInfo.fullName}
                        {/* Marie Winter */}
                      </Text>
                      <CellPhoneNumFormat
                        mobileNumber={clientInfo.mobileNumber}
                        color={'#979797'}
                        fontSize={12}
                        fontWeight={'400'}
                        fontFamily={'Poppins-Light'}
                      />

                      <Text style={styles.dollar}>
                        Balance: {' $'}
                        {clientInfo.rewardBalance.toFixed(1)}
                      </Text>
                    </Body>
                    <Right></Right>
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <Col>
                      <Text style={styles.dollar}>
                        Appt Date
                  </Text>

                      <Text style={styles.source}>
                        {Moment(apptDate).format(
                          'ddd, MMM D, YYYY  hh:mm A',
                        )}
                      </Text>
                    </Col>
                    <View>
                      {show && (
                        <CustomDateTimePicker
                          value={apptDate}
                          mode={"date"}
                          showPicker={show}
                          setTime={
                            (e, date) => {
                              this.setDate(null, date)
                            }
                          }
                          onCancleDatePicker={
                            () => this.setState({
                              show: false
                            })
                          }
                        />
                      )}
                    </View>
                    <TouchableOpacity onPress={this.datepicker}>
                      <Image
                        style={styles.edit}
                        source={require('../../Assets/ic-contact-edit.png')}
                      />
                    </TouchableOpacity>
                  </ListItem>
                  <ListItem>
                    <Col>
                      <Text style={styles.dollar}>
                        Source
                  </Text>

                      <Item picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: '100%' }}
                          placeholder="Source"
                          placeholderStyle={{ color: '#bfc6ea' }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.sourceValue}
                          onValueChange={val => this.onSourceValueChange(val)}>
                          <Picker.Item label={ApptInfo.requestSource} value={ApptInfo.requestSource}
                          />
                          <Picker.Item label="iOS App" value="iOS App" />
                          <Picker.Item label="Android App" value="Android App" />

                        </Picker>
                      </Item>
                    </Col>
                  </ListItem>
                  <ListItem>
                    <Col>
                      <Text style={styles.dollar}>
                        Client Note
                  </Text>
                      <TextInput
                        // placeholder={ApptInfo.customerNotes}
                        placeholderTextColor="#0e1317"
                        fontFamily={'Poppins-Medium'}
                        fontSize={13.5}
                        multiline={true}
                        maxLength={1200}
                        padding={15}
                        onChangeText={text => this.onNoteChange(text)}
                        value={this.state.payload.customerNotes}
                      />
                    </Col>
                  </ListItem>
                  <ListItem
                    style={{
                      height: 49,
                      backgroundColor: '#F1F0F5',
                      paddingHorizontal: 3,
                    }}>
                    <Left>
                      <Text style={[styles.addService, {}]}>
                        Services Booked
                  </Text>
                    </Left>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('AddEditService', {
                            onGoBack: () => this.getbackService(),
                            "apptDate": apptDate,
                            // FromEditAppt: "FromEditAppt",
                            visitId: ApptInfo.id
                          })
                        }>
                        <Image
                          style={styles.plus}
                          source={require('../../Assets/timesheet/plus.png')}
                        />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                  {/* Service */}
                  {this.state.payload.visitTechnicians && this.state.payload.visitTechnicians.length > 0 && this.state.payload.visitTechnicians.map((item, index) => (
                    <ListItem key={index} >
                      {item.expectedStartTime && (
                        <Col>
                          <Text style={styles.dollar}>
                            {Moment(item.expectedStartTime).format(' hh:mm A',
                            )}
                          </Text>
                          <Row>
                            <Left>
                              <Text style={styles.addService}>
                                {/* {clientInfo.rewardBalance} */}
                                {this.getServiceName(item.offeredService.id)}
                              </Text>
                            </Left>
                            <TouchableOpacity
                              onPress={() => {
                                this.deleteTechnician(index)
                              }}>
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/time/ic-actions-trash.png')}
                              />
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate('AddEditService', {
                                  onGoBack: () => this.getbackEditService(),
                                  "apptDate": apptDate,
                                  FromEditAppt: "FromEditAppt",
                                  visitId: ApptInfo.id,
                                  EditService: item
                                })
                                this.setState({
                                  updatedServiceIndex: index
                                })
                              }
                              }
                            >
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/ic-contact-edit.png')}
                              />
                            </TouchableOpacity>
                          </Row>
                          <Row>
                            <Left>
                              <Text style={styles.dollar}>
                                {this.getTechnicialName(item.technician.id)}
                              </Text>
                            </Left>
                            <Right style={{ marginLeft: -20 }}>
                              <DecimalFormat
                                price={this.getServicePrice(item.offeredService.id)}
                                color={'#979797'}
                                fontSize={12}
                                fontFamily={'Poppins-Light'}
                                fontWeight={'400'}
                              />

                              {/* <Text style={styles.dollar}>
                            {this.getServicePrice(item.offeredService.id)}
                          </Text> */}
                            </Right>
                          </Row>
                        </Col>

                      )}
                    </ListItem>
                  ))}

                  <ListItem
                    style={{
                      height: 49,
                      backgroundColor: '#F1F0F5',
                      paddingHorizontal: 3,
                    }}>
                    <Left>
                      <Text style={[styles.addService, {}]}>
                        Products
                  </Text>
                    </Left>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            'AddEditProduct',
                            {
                              TechnicianId: this.props.TechnicianId,
                              onGoBackProduct: () => this.getbackProduct(),
                              "apptDate": apptDate,
                              // FromEditAppt: "FromEditAppt",
                              visitId: ApptInfo.id
                            }
                          )}
                      >
                        <Image
                          style={styles.plus}
                          source={require('../../Assets/timesheet/plus.png')}
                        />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>

                  {/* Product  */}
                  {productName && this.state.payload.purchaseItems.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <Col>
                          <Row>
                            <Left>
                              <Text style={styles.addService}>
                                {setProductName[index]}
                              </Text>
                            </Left>
                            <TouchableOpacity
                              onPress={() => {
                                this.deleteProduct(index)
                              }}
                            >
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/time/ic-actions-trash.png')}
                              />
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'AddEditProduct',
                                  {
                                    TechnicianId: this.props.TechnicianId,
                                    onGoBackProduct: () => this.getbackEditProduct(),
                                    "apptDate": apptDate,
                                    FromEditAppt: "FromEditAppt",
                                    visitId: ApptInfo.id,
                                    EditProduct: item,
                                    name: setProductName[index]
                                  }
                                )
                                this.setState({
                                  updatedProductIndex: index
                                })
                              }}
                            >
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/ic-contact-edit.png')}
                              />
                            </TouchableOpacity>
                          </Row>
                          <Row>
                            <Left>
                              <Text style={styles.dollar}>
                                Price : {" "} {item.chargeAmount.toFixed(1)}
                              </Text>
                            </Left>
                            <Right>
                              <Text style={styles.dollar}>
                                Qty : {" "} {item.quantity}
                              </Text>
                            </Right>
                          </Row>
                        </Col>
                      </ListItem>
                    )
                  }
                  )}
                </List>
                <Label style={{ height: 20 }} />
              </View>
            </ScrollView>
            <View style={{ flex: 1 }}>
              {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
              <Modal isVisible={this.state.isModalVisible}>
                <View style={{ height: 300, backgroundColor: "white", justifyContent: "center", paddingHorizontal: 5 }}>
                  {/* <View style={{ height: 50 }}> */}
                  <Text>
                    Reason for Cangel
                </Text>
                  {/* </View> */}
                  <View style={{ height: 50, width: "100%", }}>
                    {/* <Input placeholder="Username" /> */}
                    <Input
                      style={{ borderWidth: 1 }}
                      // placeholder={ApptInfo.customerNotes}
                      placeholderTextColor="#0e1317"
                      fontFamily={'Poppins-Medium'}
                      fontSize={13.5}
                      multiline={true}
                      maxLength={1200}
                      // padding={15}
                      onChangeText={text => {
                        this.setState({
                          cancellaTionReason: text
                        })
                      }}
                      value={this.state.cancellaTionReason}
                    />
                  </View>

                  <Label />
                  <TouchableOpacity style={{ backgroundColor: "red", height: 30, justifyContent: "center", alignItems: "center" }} onPress={this.deleteTechnician} >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  <Label />
                  <TouchableOpacity style={{ backgroundColor: "green", height: 30, justifyContent: "center", alignItems: "center" }} onPress={this.onCenServiceDelete} >
                    <Text>Cancel</Text>
                  </TouchableOpacity>


                  {/* <Button title="Hide modal" /> */}
                </View>
              </Modal>
            </View>
          </View>
        </Container>
      );
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
  findTechnician = (id, query) => {
    const technician = this.props.Technicians.find(tech => tech.id == id);
    if (technician) {
      if (query == 'image') {
        return technician.user.imageUrl;
      } else if (query === 'nick') {
        return technician.user.names.nick;
      }
    }
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
    StoreAllData
  };
};

export default connect(mapStateProps)(Rebook);

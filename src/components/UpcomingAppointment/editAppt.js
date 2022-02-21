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
  Left,
  Right,
  Item,
  Body,
  Icon,
  Row,
  ListItem,
  List,
  Thumbnail,
  Badge,
  Col,
  Label,
  Picker,
  Container,
} from 'native-base';
import HeaderComponent from '../Header/header';
import Moment from 'moment';
import styles from './styles';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {saveBooking} from './../../Redux/SagaActions/UpcommingAppoinments_action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GetSearchClient} from './../../Redux/SagaActions/AppoinmentsSagaAction.js';
import CustomDateTimePicker from '../ImportantFunction/datePicker';
import CellPhoneNumFormat from '../ImportantFunction/cellPhoneNumFormat';
import DecimalFormat from '../ImportantFunction/decimalFormat';
import {toast} from '../Toast/Toast';
import {helperFunctions} from '../../_helpers';
import Modal from 'react-native-modal';
import StoreDataReducer from '../../Redux/Reducer/StoreDataReducer';
import {_requestSingleService} from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import Details from '../ClientsProfile/details';
import AddEditServices from '../Modal/addEditServices';
import AddEditProducts from '../Modal/addEditProducts';

let setProductName = [];

class EditAppt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        id: this.props.locationId.id,
      },
      technicians: [],
      requestSource: 'Phone Call',
      requestType: 'Appointment',
      standingAppointment: false,
      customerNotes: '',
      visitTechnicians: [],
      purchaseItems: [],
      isModalVisible: false,
      clientInfo: '',
      clientRoute: '',
      item: '',
      apptDate: '',
    };
  }

  onSourceValueChange = value => {
    this.setState({
      requestSource: value,
    });
  };

  componentDidMount() {
    this.GetClientInfo();
    this.getSingleVisit()
  }

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
    console.log('onNoteChange', text);
    this.setState({
      ...this.state,
      customerNotes: text,
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
  };

  datepicker = () => {
    this.show('date');
  };
  setDate = (event, apptDate) => {
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      apptDate,
    });
  };



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

    console.log('ALL STORE DATA', payload);
    console.log('SINGLE', this.state.purchaseItems);
    return (
      <Container
        style={{...styles.pro_background, ...helperFunctions.themeBg()}}>
        <View style={{flex: 1.5, justifyContent: 'center'}}>
          <HeaderComponent
            color="white"
            title="Edit Appointment"
            // forFunction="true"
            // rightImg="rightImg"
            rightTitle={'Save'}
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
          <ScrollView>
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
                    }}>
                    {clientInfo.mobileNumber &&
                      this.formatMobileNumber(clientInfo.mobileNumber)}
                  </Text>
                  <Text style={{...helperFunctions.textSize()}}>
                    Balance: $
                    {clientInfo.rewardBalance
                      ? clientInfo.rewardBalance.toFixed(1)
                      : '0.00'}
                  </Text>
                </View>
              </View>

              <View style={{height: 40}} />

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
                      selectedValue={this.state.requestSource}
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
                      value={this.state.customerNotes}
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
                    <TouchableOpacity onPress={this.toggleAddModal}>
                      <Image
                        style={styles.plus}
                        source={require('../../Assets/timesheet/plus.png')}
                      />
                    </TouchableOpacity>
                  </Right>
                </ListItem>

                {this.state.visitTechnicians &&
                  this.state.visitTechnicians.length > 0 &&
                  this.state.visitTechnicians.map((item, index) => (
                    <Fragment>
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
                            uri: item.technicianImage,
                          }}
                        />
                        <View style={{width: '80%'}}>
                          <View
                            style={{
                              ...helperFunctions.flexColumn(),
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{...helperFunctions.textSize()}}>
                              {item.servicename} with {item.technicianname}
                            </Text>
                            <View
                              style={{
                                ...helperFunctions.flexRow(),
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#666', marginRight: 15}}>
                                <FontAwesome color="#666" name="circle" />{' '}
                                {item.price}
                              </Text>
                              <Text style={{color: '#666'}}>
                                <FontAwesome color="#666" name="circle" />{' '}
                                {Moment(item.timeStart).format('hh:mm a')} -{' '}
                                {Moment(item.timeEnd).format('hh:mm a')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{...helperFunctions.flexRow()}}>
                          <TouchableOpacity
                            onPress={() => this.deleteTechnician(item.key)}>
                            <Image
                              style={styles.edit}
                              source={require('../../Assets/time/ic-actions-trash.png')}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{marginLeft: 10}}
                            onPress={() => this.editAddedService(item)}>
                            <Image
                              style={styles.edit}
                              source={require('../../Assets/ic-contact-edit.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
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
                  this.props.StoreAllData.brands.length > 0 &&
                  this.state.visitTechnicians.length > 0 && (
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
                        <TouchableOpacity onPress={this.toggleProductModal}>
                          <Image
                            style={styles.plus}
                            source={require('../../Assets/timesheet/plus.png')}
                          />
                        </TouchableOpacity>
                      </Right>
                    </ListItem>
                  )}
                {this.state.purchaseItems.length > 0 &&
                  this.state.purchaseItems.map((item, index) => {
                    return (
                      <Fragment>
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
                            source={{uri: item.image}}
                          />
                          <View style={{width: '80%'}}>
                            <View
                              style={{
                                ...helperFunctions.flexColumn(),
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{...helperFunctions.textSize()}}>
                                {item.name}
                              </Text>
                              <View
                                style={{
                                  ...helperFunctions.flexRow(),
                                  marginTop: 10,
                                }}>
                                <Text style={{color: '#666', marginRight: 15}}>
                                  <FontAwesome color="#666" name="circle" />{' '}
                                  Qty: {item.quantity}
                                </Text>
                                <Text style={{color: '#666'}}>
                                  <FontAwesome color="#666" name="circle" />{' '}
                                  Price: {(item.price * 1).toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{...helperFunctions.flexRow()}}>
                            <TouchableOpacity
                              onPress={() => {
                                this.deleteProduct(item.key);
                              }}>
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/time/ic-actions-trash.png')}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{marginLeft: 10}}
                              onPress={() => this.editProduct(item)}>
                              <Image
                                style={styles.edit}
                                source={require('../../Assets/ic-contact-edit.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
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

              <Label style={{height: 20}} />
            </View>
            <View style={{height: 150}} />
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
            />
          </Modal>
        </View>
      </Container>
    );
  }

  findTechnician = (id, query) => {
    const tech =
      this.props.StoreAllData &&
      this.props.StoreAllData.locations[0].technicians.find(
        tech => tech.id == id,
      );
    if (tech) {
      console.log('TEC', tech);
      if (query == 'image') {
        return tech.user.imageUrl;
      } else if (query == 'nick') {
        return tech.user.names.nick;
      }
    }
  };

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
  };
};

export default connect(mapStateProps)(EditAppt);

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  Left,
  Right,
  Container,
  Button,
  Content,
  ListItem,
  List,
  Thumbnail,
  Root,
  Toast,
  Form,
  Textarea,
} from 'native-base';
import HeaderComponent from '../Header/header';
import styles from './styles';

import { connect } from 'react-redux';
import Moment from 'moment';
import { GetUpcomingData } from '../../Redux/Action/UpcomingAppoinments';
import { helperFunctions } from '../../_helpers';
import moment from 'moment';
import Icons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import CheckIn from '../Modal/checkIn';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
const { width, height } = Dimensions.get('window')
import {
  _checkInBooking,
  DeleteService,
  DeleteAppointment

} from '../../Redux/SagaActions/UpcommingAppoinments_action';
class AppointMents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      newKey: '',
      loader: true,
      getData: [],
      isModalVisible: false,
      visitId: '',
      loading: false,
      isReasonModal: false,
      cancelReason: '',
    };
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      () => {
        this.GetUpcomingData();
      },
    );
  }

  componentDidMount() {
    this.props.apptReload().setRetrive(this.fcmApptReload)
    this.GetUpcomingData();
  }
  GetUpcomingData = () => {
    const { navigation } = this.props;
    const clientInfo = navigation.getParam('ClientInfo');
    const clientId = clientInfo.id;
    this.props.dispatch(
      GetUpcomingData(
        this.props.StoreLocationInfo,
        this.props.navigation,
        clientId,
      ),
    );
  };
  fcmApptReload = (data) => {
    const { navigation } = this.props;
    const clientInfo = navigation.getParam('ClientInfo');
    const clientId = clientInfo.id;
    let bookedTime = Moment(data.bookedTime).format("YYYY-MM-DD")

    if (data.clientId == clientId) {
      console.log("fcmApptReload", data);
      this.GetUpcomingData()
    }

  }
  componentWillUnmount() {
    this.props.apptReload().setRetrive(null)
  }
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
  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  checkIn = customerNotes => {
    this.setState({
      loading: true,
    });
    _checkInBooking(customerNotes, this.state.visitId)
      .then(res => {
        this.setState({
          loading: false,
          isModalVisible: false,
        });
        this.GetUpcomingData();
        Toast.show({
          text: 'Appointment checked in successful!',
          buttonText: 'OK',
          buttonTextStyle: { color: '#ffffff' },
          buttonStyle: { backgroundColor: '#424E9C' },
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
          isModalVisible: false,
          isCheckIn: false,
        });
        e.json().then(err => {
          alert(err.message);
        });
      });
  };

  editAppointment = item => {
    console.log(item);
    const visits = [];
    if (item.visitTechnicians) {
      item.visitTechnicians.map(vt => {
        visits.push({
          id: vt.id,
          key: item.visitTechnicians.length + 1,
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
          visitId: item.id,
        });
      });
    }
    const products = [];
    if (item.purchaseItems.length > 0) {
      item.purchaseItems.map(p => {
        products.push({
          id: p.id,
          key: p.id,
          name: p.locatedProductVariant.variant.product.name,
          brand: p.locatedProductVariant.variant.product.brand.name,
          price: p.locatedProductVariant.salePrice,
          image: p.locatedProductVariant.variant.imageUrls[0],
          quantity: p.quantity,
          technician: p.technician.id,
          visitId: item.id,
        });
      });
    }
    const visitJSON = {
      customerNotes: item.customerNotes,
      bookedTime: item.bookedTime,
      requestType: item.requestType,
      requestSource: item.requestSource,
      visitTechnicians: visits,
      purchaseItems: products,

    };

    // if (this.props.navigation.state.params.reloadData) {
    //     this.props.navigation.state.params.reloadData()();
    // }

    this.props.navigation.navigate('Appointment', {
      ClientInfo: item.client,
      visitJSON: visitJSON,
      realUpdate: true,
      visit: item.id,
      apptDate: item.bookedTime,
    });
  };

  proccedToCancel = visitId => {
    this.setState({
      visitId,
      isReasonModal: true,
    });
  };
  closeReasonModal = () => {
    this.setState({
      isReasonModal: false,
    });
  };

  confirmDelete = async () => {
    this.setState({
      loading: true,
    });
    await DeleteAppointment(
      this.state.visitId,
      this.state.cancelReason,
      response => {
        this.GetUpcomingData();
        this.setState({
          loading: false,
          isReasonModal: false,
        });
      },
      error => {
        this.setState({
          loading: false,
        });
        alert(error.errors ? error.errors : error.message);
      },
    );
  };

  render() {
    const { UpcomingAppoinments, ServiceList } = this.props;

    console.log('CLIENT', UpcomingAppoinments);
    const mainView = UpcomingAppoinments.map((value, key) => {
      const mainView = (
        <View key={key}>
          <View style={{ ...styles.secondContainer, ...helperFunctions.themeDark() }}>
            <View style={{ ...styles.fiftyPercentLeft, width: '35%' }}>
              <Text style={{...styles.yellowText,...helperFunctions.smallFont()}}>Appt Date</Text>
              <Text style={styles.whiteText}>
                {helperFunctions.formatDateTimeWithDay(
                  moment(value.bookedTime),
                  'time',
                )}
              </Text>
              <Text style={{...styles.whiteText,...helperFunctions.smallFont()}}>
                {helperFunctions.formatDateTimeWithDay(
                  moment(value.bookedTime),
                  'date',
                )}
              </Text>
            </View>
            <View style={{ ...styles.fiftyPercentRight, width: '65%' }}>
              <Left style={{ ...helperFunctions.flexRow() }}>
                {value.status == 'Booked' && value.checkInOutAllowed == true && this.props.customerBookingAllowed == true && (
                  <Button
                    style={{ width: 70 }}
                    onPress={() => this.toggleModal(value.id)}
                    block
                    warning
                    rounded
                    small>
                    <Text>Check In</Text>
                  </Button>
                )}
                {value.status == 'Checked In' && (
                  <Button
                    style={{
                      width: 73,
                      ...helperFunctions.flexRow(),
                      justifyContent: 'center',
                    }}
                    rounded
                    warning
                    small>
                    <Text style={{ textAlign: 'center',...helperFunctions.smallFont() }}>
                      <Iconn name="check" />{' '}
                      {helperFunctions.formatDateTimeWithDay(
                        moment(value.bookedTime),
                        'time',
                      )}
                    </Text>
                  </Button>
                )}
                {this.props.customerBookingAllowed && this.props.customerBookingAllowed == true && value.checkInOutAllowed == true && value.status == "Booked" && (
                  <Button
                    onPress={() => this.editAppointment(value)}
                    block
                    rounded
                    warning
                    small
                    style={{ marginLeft: 8, width: 70 }}>
                    <Text>Modify</Text>
                  </Button>
                )}
              </Left>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      hidden: true,
                      newKey: key,
                      icon: false,
                    });
                  }}>
                  <Icons name="chevron-down" size={35} color="#ffffff" />
                </TouchableOpacity>
              </Right>
            </View>
          </View>
          <View style={{ ...styles.secondContainer, ...helperFunctions.themeDark() }}>
            <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
              {value.visitTechnicians.map((t, k) => {
                return (
                  <Image
                    style={{ ...helperFunctions.smallIconWidth() }}
                    key={k}
                    source={{
                      uri: this.findTechnician(t.technician.id, 'image'),
                    }}
                  />
                );
              })}
            </Left>
            <Right style={{ textAlign: 'right' }}>
              <Text style={styles.whiteText}>
                ${(value.totalChargeAmount * 1).toFixed(2)}
              </Text>
            </Right>
          </View>
          {UpcomingAppoinments.length - 1 != key ? (
            <View style={styles.boderBack}>
              <View style={styles.borderStyleWhite} />
            </View>
          ) : (
              <Text />
            )}
        </View>
      );

      const hiddenView = (
        <Content style={{ backgroundColor: 'white' }} key={key}>

          <List style={{ ...helperFunctions.assBg() }}>
            <ListItem>
              <View style={{ ...helperFunctions.flexRow(), justifyContent: 'space-between', width }}>
                <Text style={{ ...helperFunctions.textBlack() }}>
                  APPOINTMENTS
                </Text>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    this.setState({
                      hidden: false,
                      newKey: '',
                      icon: true,
                    });
                  }}>
                  <Icons name="chevron-up" size={45} color={helperFunctions.darkLightColor()} />
                </TouchableOpacity>
              </View>
            </ListItem>
          </List>
          <List style={{ ...helperFunctions.lightDarkBg() }}>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text style={{ ...styles.text3, color: helperFunctions.darkLightColor() }}>Appt Date</Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  {helperFunctions.formatDateTimeWithDay(
                    moment(value.bookedTime),
                    'time_after',
                  )}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text style={{ ...styles.text3, color: helperFunctions.darkLightColor() }}>Source</Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  {this.getRequestSource(value.requestSource)}{' '}
                  {value.requestSource}
                </Text>
              </View>
            </ListItem>

            {value.visitTechnicians.length > 0 &&
              value.visitTechnicians.map((vt, key) => {
                return (
                  <ListItem
                    key={key}
                    style={
                      value.visitTechnicians.length - 1 != key
                        ? {
                          ...helperFunctions.listItemBorder(),
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }
                        : {
                          borderBottomWidth: 0,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginRight: 20
                        }
                    }>
                    <View>
                      <Text style={{ ...styles.text3, color: helperFunctions.darkLightColor() }}>
                        {helperFunctions.formatDateTimeWithDay(
                          vt.expectedStartTime,
                          'time',
                        )} - {helperFunctions.formatDateTimeWithDay(
                          vt.period.to,
                          'time',
                        )}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                        <Image
                          style={{
                            ...helperFunctions.smallIconWidth(),
                          }}
                          source={{
                            uri: this.findTechnician(
                              vt.technician.id,
                              'image',
                            ),
                          }}
                        />{' '}
                        {this.findServiceName(
                          vt.offeredService.id,
                          vt.offeredService.category.id,
                        )}
                        <Text style={{ ...styles.text3, color: helperFunctions.darkLightColor() }}> with</Text>{' '}
                        {this.findTechnician(
                          vt.technician.id,
                          'nick',
                        )}
                      </Text>
                    </View>
                  </ListItem>
                );
              })}
          </List>
          {value.purchaseItems.length > 0 && (
            <Fragment>
              <List style={{ ...helperFunctions.assBg() }}>
                <ListItem>
                  <View>
                    <Text style={{ ...helperFunctions.textBlack() }}>
                      PRODUCTS
                    </Text>
                  </View>
                </ListItem>
              </List>
              <List style={{ ...helperFunctions.lightDarkBg() }}>
                {value.purchaseItems.map((p, key) => {
                  return (
                    <ListItem key={key}>
                      <View
                        style={{
                          width: Dimensions.get('window').width - 40,
                          ...helperFunctions.flexColumn(),
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            ...helperFunctions.flexRow(),
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{ ...helperFunctions.textBlack() }}>
                            {p.locatedProductVariant.variant.product.name}
                          </Text>
                          <Text style={{ ...helperFunctions.textBlack() }}>
                            Qty: {p.quantity}
                          </Text>
                        </View>

                        <View
                          style={{
                            ...helperFunctions.flexRow(),
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                          }}>
                          <Image
                            style={{ width: 40, height: 40 }}
                            source={{
                              uri: p.locatedProductVariant.variant.imageUrls[0],
                            }}
                          />
                          <Text style={{ ...helperFunctions.textBlack() }}>
                            Price:{' '}
                            ${(p.locatedProductVariant.salePrice * 1).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </ListItem>
                  );
                })}
              </List>
            </Fragment>
          )}

          <List style={{ ...helperFunctions.assBg() }}>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                marginRight: 20
              }}>
              <View>
                <Text style={{ ...helperFunctions.textBlack() }}>
                  COST
                </Text>
              </View>
            </ListItem>

            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Service Charge Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.serviceChargeAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Product Purchase Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.productPurchaseAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>

            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Gift Card Sale Amount{' '}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.giftCardSaleAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Tip Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.tipAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Tax Amount{' '}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.taxAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                borderBottomWidth: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...helperFunctions.mediumFont(),
                    ...helperFunctions.textBlack(),
                    color: helperFunctions.darkLightColor()
                  }}>
                  Total Amount
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...helperFunctions.mediumFont(),
                    ...helperFunctions.textBlack(),
                    color: helperFunctions.darkLightColor()
                  }}>
                  $
                  {(
                    value.serviceChargeAmount * 1 +
                    value.productPurchaseAmount * 1 +
                    value.tipAmount * 1 +
                    value.taxAmount * 1 +
                    value.giftCardSaleAmount * 1
                  ).toFixed(2)}
                </Text>
              </View>
            </ListItem>
          </List>

          <List style={{ ...helperFunctions.assToDarkBg() }}>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
              }}>
              <View>
                <Text style={{ ...helperFunctions.textBlack(), marginRight: 20, color: helperFunctions.darkLightColor() }}>
                  PAYMENT
                </Text>
              </View>
            </ListItem>

            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Credit Paid Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.creditPaidAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Cash Paid Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.cashPaidAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>

            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Check Paid Amount{' '}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.checkPaidAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase',
                    color: helperFunctions.darkLightColor()
                  }}>
                  Gift Card Paid Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.giftCardPaidAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                ...helperFunctions.listItemBorder(),
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase', color: helperFunctions.darkLightColor()
                  }}>
                  Reward Points Used{' '}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.rewardDeductionAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
            <ListItem
              style={{
                borderBottomWidth: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginRight: 20
              }}>
              <View>
                <Text
                  style={{
                    ...styles.text3,
                    textTransform: 'uppercase', color: helperFunctions.darkLightColor()
                  }}>
                  Discount Amount
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.textBlack, color: helperFunctions.darkLightColor() }}>
                  ${(value.discountDeductionAmount * 1).toFixed(2)}
                </Text>
              </View>
            </ListItem>
          </List>
        </Content>
      );
      return this.state.newKey == key && this.state.hidden
        ? hiddenView
        : mainView;
    });

    return (
      <Container style={{ ...styles.pro_background, ...helperFunctions.blackWhite() }}>
        {this.state.loading == true && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              ...helperFunctions.flexColumn(),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#424E9C" />
          </View>
        )}
        {this.state.loading == false && (
          <Fragment>
            <View style={{ flex: 1.5, justifyContent: 'center', ...helperFunctions.blackWhite() }}>
              <HeaderComponent
                color={defaultMode === 'dark' ? 'white' : '#424E9C'}
                title="Upcoming Appt"
                // rightTitle="Save"
                {...this.props}
              />
            </View>
          </Fragment>
        )}

        <View style={{ flex: 8 }}>
          <ScrollView style={{ borderRadius: 35, ...helperFunctions.themeDark() }}>
            <View style={{ height: 20 }} />
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
                  source={{
                    uri: this.props.navigation.state.params.ClientInfo.imageUrl,
                  }}
                />
                <Text
                  style={{
                    ...helperFunctions.textBlack(),
                    ...helperFunctions.mediumFont(),
                    textTransform: 'uppercase',
                    color: 'white',
                  }}>
                  {this.props.navigation.state.params.ClientInfo.fullName}
                </Text>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    ...helperFunctions.textSize(),
                    color: 'white',
                  }}>
                  {this.props.navigation.state.params.ClientInfo.mobileNumber &&
                    this.formatMobileNumber(
                      this.props.navigation.state.params.ClientInfo
                        .mobileNumber,
                    )}
                </Text>
                <Text style={{ ...helperFunctions.textSize(), color: 'white' }}>
                  Balance: $
                  {this.props.navigation.state.params.ClientInfo.rewardBalance
                    ? this.props.navigation.state.params.ClientInfo.rewardBalance.toFixed(
                      2,
                    )
                    : '0.00'}
                </Text>
              </View>
            </View>
            <View style={{ height: 40 }} />
            {this.state.getData ? mainView : null}
            <View style={{ height: 150 }} />
          </ScrollView>
        </View>

        <CheckIn
          closeModal={this.closeModal}
          isModalVisible={this.state.isModalVisible}
          checkIn={this.checkIn}
        />

        <View style={{ backgroundColor: '#FFFFFF' }}>
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
                <Text style={{ ...helperFunctions.textSize() }}>
                  Cancellation Reason
                </Text>
                <TouchableOpacity onPress={this.closeReasonModal}>
                  <Icons color="red" name="close" size={25} />
                </TouchableOpacity>
              </View>
              <View style={{ height: 30 }} />
              <Form>
                <Textarea
                  onChangeText={txt => this.setState({ cancelReason: txt })}
                  name="customerNotes"
                  rowSpan={5}
                  bordered
                  value={this.state.cancelReason}
                />
                <View style={{ height: 30 }} />
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
                      style={{ ...helperFunctions.textBlack(), color: 'white' }}>
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
                  <ActivityIndicator size="large" color="#424E9C" />
                </View>
              )}
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
  //find out the the appointment source
  getRequestSource(reqSrc) {
    let src = '';
    src =
      reqSrc == 'Phone Call' ? (
        <Icon name="phone" size={20} color="#ff7676" />
      ) : reqSrc == 'Walk In' ? (
        <Image
          resizeMode="cover"
          style={{ width: 20, height: 20 }}
          source={require('../../Assets/walk.png')}
        />
      ) : reqSrc == 'Android App' ? (
        <Icon name="android" size={20} color="#424E9C" />
      ) : reqSrc == 'iOS App' ? (
        <Icon name="apple" size={20} color="#000" />
      ) : reqSrc == 'Website' ? (
        <Icon name="globe" size={20} color="#000" />
      ) : reqSrc == 'iPad App' ? (
        <Icon name="mobile" size={20} color="#000" />
      ) : reqSrc == 'Tablet App' ? (
        <Icon name="tablet" size={20} color="#000" />
      ) : (
                      ''
                    );

    return src;
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
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
  const ServiceList =
    state.StoreDataReducer.StoreLocationInfo[0].offeredServices;
  const customerBookingAllowed = state.LoggedData.customerBookingAllowed;
  const UpcomingAppoinments =
    state.UpcomingAppoinmentsReducer.AllUpcomingAppoinmentsData;
  const StoreAllData = state.StoreDataReducer.StoreAllData;
  return {
    UpcomingAppoinments,
    ServiceList,
    StoreLocationInfo,
    StoreAllData,
    customerBookingAllowed
  };
};

export default connect(mapStateProps)(AppointMents);

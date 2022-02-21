/* eslint-disable */
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {
  Container,
  Left,
  Right,
  Button,
  List,
  ListItem,
  Content, Thumbnail,
} from 'native-base';
import HeaderComponent from '../Header/header';
import styles from './styles';
import {connect} from 'react-redux';
import LOADER from '../Loader/Loader';
import Icons from 'react-native-vector-icons/EvilIcons';
import Iconns from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/AntDesign';
import {GetPastAppionmtnts} from '../../Redux/Action/ClientsAction';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import CellPhoneNumFormat from '../ImportantFunction/cellPhoneNumFormat';
import DecimalFormat from '../ImportantFunction/decimalFormat';
import {helperFunctions} from '../../_helpers';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
import moment from 'moment';
import {backgroundColor} from 'react-native-calendars/src/style';
const {width, height} = Dimensions.get('window')
class pastAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PastAppotLoader: false,
      viewDetailsSection: '',
    };
  }
  static getDerivedStateFromProps(props, state) {
    const PastAppotData = props.PastAppotData;
    const PastAppotLoader = props.PastAppotLoader;
    const ServiceList = props.ServiceList;
    return {
      PastAppotData,
      PastAppotLoader,
      ServiceList,
    };
  }

  viewDetails = key => {
    this.setState({
      viewDetailsSection: key,
    });
  };
  viewDetailsClose = () => {
    this.setState({
      viewDetailsSection: '',
    });
  };
  render() {
    const {
      PastAppotData,
      PastAppotLoader,
      viewDetailsSection,
      ServiceList,
    } = this.state;

    console.log(PastAppotData);


    return PastAppotLoader == false ? (
      <LOADER />
    ) : (
      <Container style={{...styles.pro_background,...helperFunctions.blackWhite()}}>
        <View style={{flex: 1.5, justifyContent: 'center'}}>
          <HeaderComponent
              color={defaultMode === 'dark' ? 'white' : '#424E9C'}
            title="Past Appointment"
            // rightTitle="Save"
            {...this.props}
          />
        </View>
        <View style={{flex: 8}}>
          <ScrollView
            style={{
              flex: 1,
              ...helperFunctions.themeDark(),
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <View style={{height: 20}} />
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
                <Text style={{...helperFunctions.textSize(), color: 'white'}}>
                  Balance: $
                  {this.props.navigation.state.params.ClientInfo.rewardBalance
                      ? this.props.navigation.state.params.ClientInfo.rewardBalance.toFixed(
                          2,
                      )
                      : '0.00'}
                </Text>
              </View>
            </View>
            <View style={{height: 40}} />
            {PastAppotData && PastAppotData.length == 0 &&
              <View style={{flex: 1, justifyContent:'center',alignItems: 'center',height: height/1.5}}>
                <Text style={{...helperFunctions.largeText(), color: '#fff'}}>No past appointments</Text>
              </View>
            }
            {PastAppotData.map((value, index) => (
              <View key={index}>
                <View style={{height: 20}}/>
                {viewDetailsSection != value.id && (
                  <View>
                    <View style={{...styles.secondContainer,...helperFunctions.themeDark()}}>
                      <View style={styles.fiftyPercentLeft}>
                        <Text style={styles.yellowText}>Appt Date</Text>
                        <Text style={styles.whiteText}>
                          {helperFunctions.formatDateTimeWithDay(
                            moment(value.bookedTime),
                            'time',
                          )}
                        </Text>
                        <Text style={styles.whiteText}>
                          {helperFunctions.formatDateTimeWithDay(
                            moment(value.bookedTime),
                            'date',
                          )}
                        </Text>
                      </View>
                      <View style={{...styles.fiftyPercentRight,display: 'flex',justifyContent:'space-between', flexDirection: 'row'}}>
                        {this.props.customerBookingAllowed == true && this.rebookBoolean(value) == true &&
                        <Left>
                          <Button
                              style={{...helperFunctions.deviceWiseWidth(100,120,130,140,150)}}
                              onPress={() =>
                              this.props.navigation.navigate('Appointment', {
                                ApptInfo: value,
                                ClientInfo: this.props.navigation.state.params.ClientInfo,
                                Rebook: true
                              })
                          } block rounded warning small>
                            <Text>Rebook</Text>
                          </Button>
                        </Left>
                        }
                        <Right>
                          <TouchableOpacity
                            onPress={() => this.viewDetails(value.id)}>
                            <Icons
                              name="chevron-down"
                              size={35}
                              color="#ffffff"
                            />
                          </TouchableOpacity>
                        </Right>
                      </View>
                    </View>
                    <View style={{...styles.secondContainer,...helperFunctions.themeDark()}}>
                      <Left
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {value.visitTechnicians.map((t, k) => {
                          return (
                            <Image
                              style={{...helperFunctions.smallIconWidth()}}
                              key={k}
                              source={{
                                uri: this.findTechnician(
                                  t.technician.id,
                                  'image',
                                ),
                              }}
                            />
                          );
                        })}
                      </Left>
                      <Right style={{textAlign: 'right'}}>
                        <Text style={styles.whiteText}>
                          ${(value.totalChargeAmount * 1).toFixed(2)}
                        </Text>
                      </Right>
                    </View>
                    {PastAppotData.length - 1 != index ? (
                      <View style={styles.boderBack}>
                        <View style={styles.borderStyleWhite} />
                      </View>
                    ) : (
                      <Text />
                    )}
                  </View>
                )}
                {viewDetailsSection == value.id && (
                  <Content>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        ...helperFunctions.padding(20, 20, 20, 20),
                        ...helperFunctions.assBg(),
                      }}>
                      <View style={[styles.fiftyPercentLeft]}>
                        <Text style={{...helperFunctions.textBlack()}}>
                          Appointments
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.fiftyPercentRight,
                          {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          },
                        ]}>
                        {this.props.customerBookingAllowed == true && this.rebookBoolean(value) == true &&
                              <Button style={{...helperFunctions.deviceWiseWidth(100,120,130,140,150)}} onPress={() =>
                                  this.props.navigation.navigate('Appointment', {
                                    ApptInfo: value,
                                    Rebook: true
                                  })
                              } block rounded warning small>
                                <Text>Rebook</Text>
                              </Button>
                        }

                        <TouchableOpacity
                          style={styles.rightBox}
                          onPress={() => this.viewDetailsClose()}>
                          <Icons name="chevron-up" size={35} color="#424E9C" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <List style={{...helperFunctions.lightDarkBg()}}>
                      <ListItem
                        style={{
                          ...helperFunctions.listItemBorder(),
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginRight: 20
                        }}>
                        <View>
                          <Text style={{...styles.text3,color: helperFunctions.darkLightColor()}}>Appt Date</Text>
                        </View>
                        <View>
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
                            {helperFunctions.formatDateTimeWithDay(
                              moment(value.expectedStartTime),
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
                          <Text style={{...styles.text3,color: helperFunctions.darkLightColor()}}>Source</Text>
                        </View>
                        <View>
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                                <Text style={{...styles.text3,color: helperFunctions.darkLightColor()}}>
                                  {helperFunctions.formatDateTimeWithDay(
                                    vt.expectedStartTime,
                                    'time',
                                  )}
                                </Text>
                              </View>
                              <View>
                                <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                                  <Text style={{...styles.text3,color: helperFunctions.darkLightColor()}}> with</Text>{' '}
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

                    <List style={{...helperFunctions.assBg()}}>
                      <ListItem
                        style={{
                          ...helperFunctions.listItemBorder(),
                          marginRight: 20
                        }}>
                        <View>
                          <Text style={{...helperFunctions.textBlack()}}>
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
                              textTransform: 'uppercase',color: helperFunctions.darkLightColor()
                            }}>
                            Service Charge Amount
                          </Text>
                        </View>
                        <View>
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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

                    <List style={{...helperFunctions.lightDarkBg()}}>
                      <ListItem
                        style={{
                          ...helperFunctions.listItemBorder(),
                        }}>
                        <View>
                          <Text style={{...helperFunctions.textBlack(),marginRight: 20,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                              textTransform: 'uppercase',
                              color: helperFunctions.darkLightColor()
                            }}>
                            Reward Points Used{' '}
                          </Text>
                        </View>
                        <View>
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
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
                              textTransform: 'uppercase',
                              color: helperFunctions.darkLightColor()
                            }}>
                            Discount Amount
                          </Text>
                        </View>
                        <View>
                          <Text style={{...styles.textBlack,color: helperFunctions.darkLightColor()}}>
                            ${(value.discountDeductionAmount * 1).toFixed(2)}
                          </Text>
                        </View>
                      </ListItem>
                    </List>
                  </Content>

                )}
              </View>
            ))}
            <View style={{height: 130, ...helperFunctions.themeBg()}} />
          </ScrollView>
        </View>
      </Container>
    );
  }

  //find out the the appointment source
  getRequestSource(reqSrc) {
    let src = '';
    src =
      reqSrc == 'Phone Call' ? (
        <Iconns name="phone" size={20} color="#ff7676" />
      ) : reqSrc == 'Walk In' ? (
        <Image
          resizeMode="cover"
          style={{width: 20, height: 20}}
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
  rebookBoolean=(visit)=>{
    const vt = visit.visitTechnicians.find(vt=>vt.technician.id == this.props.TechnicianId);
    if(vt){
      return true
    }else {
      return false
    }
  }
}

const mapStateProps = state => {
  const ServiceList =
    state.StoreDataReducer.StoreLocationInfo[0].offeredServices;
  const TechnicianId = state.LoggedData.TechnicianId;
  const PastAppotData = state.PastAppotReducer.AllPastAppoinmentsData;
  const PastAppotLoader = state.PastAppotReducer.PastAppotLoader;
  const StoreAllData = state.StoreDataReducer.StoreAllData;
  const customerBookingAllowed = state.LoggedData.customerBookingAllowed;
  return {
    PastAppotData,
    ServiceList,
    PastAppotLoader,
    StoreAllData,
    customerBookingAllowed,
    TechnicianId
  };
};

export default connect(mapStateProps)(pastAppointments);

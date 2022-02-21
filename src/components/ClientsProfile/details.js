/* eslint-disable */
import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
    Image
} from 'react-native';
import {Button} from 'native-base'
import {helperFunctions} from '../../_helpers';
import Svg, {Circle, ClipPath, Defs, Pattern} from 'react-native-svg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {GetPastAppionmtnts} from '../../Redux/Action/ClientsAction';
import moment from 'moment';

import styles from './styles';
import {connect} from 'react-redux';
import {Icon} from "react-native-elements";

const {width, height} = Dimensions.get('window');

class Details extends Component {
  constructor(props) {
    super(props);
  }

  closeModal = () => {
    this.props.closeModal();
  };
  getAllFormula = (id, item) => {
    this.props.getAllFormula(item);
  };
  getUpcomingAppt = item => {
    this.props.getUpcomingAppt(item);
  };

  getPastAppt = item => {
    this.props.dispatch(
      GetPastAppionmtnts(this.props.StoreLocationInfo, item.id),
    );
    this.props.getPastAppt(item);
  };

  gotoBook = item => {
    this.props.gotoBook(item);
  };

  render() {
    const {item} = this.props;
    console.log('item', item);
    return (
      // eslint-disable-next-line react/jsx-no-undef
      <View style={{flex: 1,...helperFunctions.lightDarkBg()}}>

          <TouchableOpacity onPress={this.closeModal} style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 20}}>
              <EvilIcons size={30} color={helperFunctions.yellow()} name="close" />
          </TouchableOpacity>



        <ScrollView>
            <View style={{width: 150, height: 150, borderRadius: 75, overflow: 'hidden', alignSelf: 'center'}}>
                <Image source={{uri: item.imageUrl}} style={{width: null, height: null, flex: 1}}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text
                    style={{
                        ...helperFunctions.textBlack(),
                        ...helperFunctions.mediumFont(),
                        color: helperFunctions.darkLightColor(),
                    }}>
                    {item.fullName}{' '}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        ...helperFunctions.textBlack(),
                        ...helperFunctions.yellowColor(),
                    }}>
                    $
                    {item.rewardBalance
                        ? (item.rewardBalance * 1).toFixed(2)
                        : '0.00'}
                </Text>
            </View>

            <View style={{height: 30}}/>
          <View style={{paddingHorizontal: 50}}>
            <View>
              <View
                style={{...helperFunctions.flexRow(), alignItems: 'center'}}>
                <FontAwesome color="#999999" size={25} name="transgender" />
                <Text style={{...helperFunctions.textBlack(), marginLeft: 40}}>
                  {item.gender}
                </Text>
              </View>
              <View style={{...helperFunctions.borderBottom()}} />
              <View
                style={{
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Feather color="#999999" size={25} name="phone" />
                <Text style={{...helperFunctions.textBlack(), marginLeft: 40}}>
                  {this.formatMobileNumber(item.mobileNumber)}
                </Text>
              </View>
              <View style={{...helperFunctions.borderBottom()}} />
              <View
                style={{
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <EvilIcons color="#999999" size={25} name="envelope" />
                <Text style={{...helperFunctions.textBlack(), marginLeft: 40}}>
                  {item.emailAddress}
                </Text>
              </View>
              <View style={{...helperFunctions.borderBottom()}} />
              <View
                style={{
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <FontAwesome color="#999999" size={25} name="birthday-cake" />
                <Text style={{...helperFunctions.textBlack(), marginLeft: 40}}>
                  {moment(item.birthDate).format('D MMM , ddd YYYY')}
                </Text>
              </View>
              <View style={{...helperFunctions.borderBottom()}} />
              <View
                style={{
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Feather color="#999999" size={25} name="calendar" />
                <Text style={{marginLeft: 40}}>
                  <Text style={{...helperFunctions.textBlack()}}>
                    {item.lastVisit
                      ? item.lastVisit.readableBookedTime
                      : 'NONE'}{' '}
                  </Text>
                  <Text
                    style={{
                      ...helperFunctions.smallFont(),
                      ...helperFunctions.assColor(),
                    }}>
                    {' '}
                    (last Visit)
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{...helperFunctions.borderBottom()}} />
            <View
              style={{
                ...helperFunctions.flexRow(),
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Feather color="#999999" size={25} name="calendar" />
              <Text style={{marginLeft: 40}}>
                <Text style={{...helperFunctions.textBlack()}}>
                  {item.nextVisit ? item.nextVisit.readableBookedTime : 'NONE'}{' '}
                </Text>
                <Text
                  style={{
                    ...helperFunctions.smallFont(),
                    ...helperFunctions.assColor(),
                  }}>
                  {' '}
                  (Next Visit)
                </Text>
              </Text>
            </View>
          </View>
          <View style={{height: 30}} />

          <View style={{...helperFunctions.assBg(), paddingVertical: 30}}>
            <View style={{paddingHorizontal: 30}}>
              <TouchableOpacity
                  onPress={() => this.gotoBook(item)}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 40,
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...helperFunctions.mediumFont()}}>Add Appointment</Text>
                <Feather size={30} name="arrow-right" />
              </TouchableOpacity>
            </View>

            <View style={{height: 8}} />
            <View style={{paddingHorizontal: 30}}>
              <TouchableOpacity
                onPress={() => this.getUpcomingAppt(item)}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 40,
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...helperFunctions.mediumFont()}}>
                  Upcoming Appointments
                </Text>
                <Feather size={30} name="arrow-right" />
              </TouchableOpacity>
            </View>
            <View style={{height: 8}} />
            <View style={{paddingHorizontal: 30}}>
              <TouchableOpacity
                onPress={() => this.getPastAppt(item)}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 40,
                  ...helperFunctions.flexRow(),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{...helperFunctions.mediumFont()}}>
                  Past Appointments
                </Text>
                <Feather size={30} name="arrow-right" />
              </TouchableOpacity>
            </View>
              <View style={{height: 8}} />
              <View style={{paddingHorizontal: 30}}>
                  <TouchableOpacity
                      onPress={() => this.getAllFormula(item.id, item)}
                      style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 40,
                          ...helperFunctions.flexRow(),
                          alignItems: 'center',
                          justifyContent: 'space-between',
                      }}>
                      <Text style={{...helperFunctions.mediumFont()}}>Formulas</Text>
                      <Feather size={30} name="arrow-right" />
                  </TouchableOpacity>
              </View>
          </View>

        </ScrollView>
      </View>
    );
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
  // console.log('1546545646544', state);
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
    const customerBookingAllowed = state.LoggedData.customerBookingAllowed;
  return {
    StoreLocationInfo,
      customerBookingAllowed
  };
};
export default connect(mapStateProps)(Details);

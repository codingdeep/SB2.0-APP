/* eslint-disable */
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import HeaderComponent from '../Header/header';
import { Label, Title, Container } from 'native-base';
import styles from './styles';
import { connect } from 'react-redux';
import { GetUpcomingData } from '../../Redux/Action/UpcomingAppoinments';

import { GetFormulaList } from '../../Redux/Action/formulaList';
import { GetPastAppionmtnts } from '../../Redux/Action/ClientsAction';
import CellPhoneNumFormat from "../ImportantFunction/cellPhoneNumFormat"
import DecimalFormat from "../ImportantFunction/decimalFormat"

class clientsDetails extends Component {
  constructor(props) {
    super(props);
    this.navigationWillFocusListener = props.navigation.addListener(
        "willFocus",
        () => {

            this.toggleModal();

        }
    );
  }
  componentDidMount() {
    // const { navigation } = this.props;
    // const clientInfo = navigation.getParam('ClientInfo');
    // const clientId = clientInfo.id
    // console.log("clientInfo", clientInfo.id)
    // this.props.dispatch(
    //   GetUpcomingData(this.props.StoreLocationInfo, this.props.navigation, clientId)
    // );
  }
  static getDerivedStateFromProps(props, state) {
    // const { AllClientsData } = props;

    return {
      // tasksValue: AllClientsData
    };
  }

  GetAllFormula = () => {
    const { navigation } = this.props;
    const clientInfo = navigation.getParam('ClientInfo');
    const clientId = clientInfo.id
    this.props.navigation.navigate('FormulaListScreen', { ClientInfo: clientInfo })
  }
  BookAppointment = () => {
    const { navigation } = this.props;
    const clientInfo = navigation.getParam('ClientInfo');

  }
  GetPastAppionmtnts = () => {
    this.props.dispatch(
      GetPastAppionmtnts(this.props.StoreLocationInfo, this.props.navigation)
    );
  }
  render() {

    const { navigation } = this.props;
    const clientInfo = navigation.getParam('ClientInfo');

    return (
      <Container style={styles.pro_background}>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <HeaderComponent
            title="Clients Details"
            // rightImg="rightImg"
            rightTitle={"Book"}
            onFunctionCall={() => {
              this.props.navigation.navigate('Appointment', { ClientInfo: clientInfo })
            }}
            {...this.props}
          />


        </View>
        <View style={{ flex: 8 }}>
          <View style={styles.firstBoxContainer}>
            <View style={styles.firstBox}>
              <Image style={styles.avatar} source={{ uri: clientInfo.imageUrl }} />
            </View>
            <View style={styles.secondBox}>
              <Text style={styles.name}>{clientInfo.fullName}</Text>
              <Text style={styles.dollar}>{clientInfo.rewardBalance.toFixed(2)}</Text>
            </View>
            <View style={styles.thirdBox}>
              {/* <View style={{}}> */}
              <Image
                style={styles.dot}
                source={require('../../Assets/clients/blueDot.png')}
              />
            </View>
            {/* </View> */}
          </View>
          {/* --------------midbox------------- */}
          <View style={styles.midViewBox}>
            <Text style={styles.text}>{clientInfo.gender}</Text>
            <View style={styles.borderStyle}></View>
          </View>
          <View style={styles.midViewBox}>
            <CellPhoneNumFormat
              mobileNumber={clientInfo.mobileNumber}
              color={'#0e1317'}
              fontSize={14}
              fontWeight={'400'}
              fontFamily={'Poppins-Medium'}
            />
            {/* <Text style={styles.text}>+{clientInfo.mobileNumber}</Text> */}
            <View style={styles.borderStyle}></View>
          </View>
          <View style={styles.midViewBox}>
            <Text style={styles.text}>{clientInfo.birthDate}</Text>
            <View style={styles.borderStyle}></View>
          </View>
          <View style={styles.midViewBox}>
            <Text style={styles.text}>
              {clientInfo.lastVisit
                ? Moment(clientInfo.lastVisit.period.to).toNow(true)
                : ''}
            </Text>
            <View style={styles.borderStyle}></View>
          </View>
          {/* --------------lastbox------------------ */}
          <TouchableOpacity
            style={styles.lastBox}
            onPress={() => this.GetAllFormula(clientInfo.id, clientInfo)}>
            <Text style={styles.textStyle}>Formulars</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../Assets/clients/rightArrow.png')}
            />
          </TouchableOpacity>
          <Label />
          <TouchableOpacity
            style={styles.lastBox}
            onPress={() =>
              this.props.navigation.navigate('UpComingAppoinmentsScreen', { ClientInfo: clientInfo })
            }>
            <Text style={styles.textStyle}>Upcoming Appointments</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../Assets/clients/rightArrow.png')}
            />
          </TouchableOpacity>
          <Label />
          <TouchableOpacity
            style={styles.lastBox}
            onPress={() => {
              this.GetPastAppionmtnts()
              this.props.navigation.navigate('PastAppoinmentsScreen')
            }


            }>
            <Text style={styles.textStyle}>Past Appointments</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../Assets/clients/rightArrow.png')}
            />
          </TouchableOpacity>
          <Label />
        </View>
      </Container>
    );
  }
}
const mapStateProps = state => {
  // console.log('1546545646544', state);
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
  return {
    StoreLocationInfo,
  };
};

export default connect(mapStateProps)(clientsDetails);

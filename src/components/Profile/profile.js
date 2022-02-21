/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import styles from './styles';
import { Container, Content, View, Grid, Row, Col, Footer, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import IconS from 'react-native-vector-icons/AntDesign';
import CustomSwitch from './CustomSwitch/customSwitch';
import CusFooter from '../Footer/footer';
import RsponsiveImage from './ResponsiveImage/responsiveImage';
import NormalContentText from './NormalContentText/normalContentText';
import LOADER from '../Loader/Loader';
import { Log_in_checker } from '../../Redux/Action/LogIn';
import HeaderComponent from '../Header/header';
import { GetProfileInfo } from '../../Redux/Action/ProfileAction';
import RemoveLocalStorage from '../ImportantFunction/removeAllLocalStorage';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
//import crashlytics from '@react-native-firebase/crashlytics';
import { helperFunctions } from "../../_helpers";
import * as Animatable from "react-native-animatable";

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      ProfileLoader: false
    };
  }

  componentDidMount = async () => {
    setTimeout(() => {
      console.log("dfadsfadsfadsfaf", this.props.navigation);
      try {
        // crashlytics().crash();
        // crashlytics().setAttributes({ something: 'something' });
        // crashlytics().log('A woopsie is incoming :(');
        // crashlytics().recordError(new Error('I did a woopsie'));
        // AsyncStorage.clear();
        // RNRestart.Restart();
      } catch (e) {
        // clear error
      }
    }, 5000);
    this.props.dispatch(
      GetProfileInfo(
        this.props.TechnicianId,
        this.props.locationId,

      ),
    );
  }
  static getDerivedStateFromProps(props, state) {
    const { ProfileLoader } = props.ProfileLoader
    return {
      ProfileLoader
    }
  }

  render() {

    const { ProfileData, technicianResponsibilities, ProfileLoader } = this.props

    return ProfileLoader == false ? (
      <LOADER />
    ) : (
        <Container style={styles.pro_background}>

          {/* <HeaderComponent title="Timesheet Details" {...this.props} /> */}
          <View
            style={{
              flex: .6,
              padding: 15,
              paddingRight: 20,
              paddingLeft: 20,
            }}>
            <Grid>
              <Row style={{ alignItems: "center" }}>

                <Left  >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.goBack()
                    }
                  >
                    <Icon name="ios-arrow-round-back" color="#FFF" size={30} />
                  </TouchableOpacity>
                </Left>
                <Body >
                  <Text style={{ ...styles.header_title, ...helperFunctions.mediumFont() }}>Profile</Text>
                </Body>
                <Right />

              </Row>

              <Row style={{ justifyContent: "center" }}>
                <Col style={{ justifyContent: "center", width: "30%" }}>
                  <Animatable.Image
                    animation="fadeInLeft"
                    style={styles.avater}
                    source={{ uri: ProfileData.user.imageUrl }}
                  />
                  {/* <RsponsiveImage setMode="pro" /> */}
                </Col>
                <Animatable.View animation="fadeInRight" style={{ alignItems: "flex-start", justifyContent: "center", width: "70%" }}>
                  <NormalContentText name={ProfileData.user.fullName} token={1} />
                  <NormalContentText name={ProfileData.user.emailAddress} token={1} />
                  <NormalContentText name={ProfileData.user.mobileNumber} token={5} />
                </Animatable.View>

              </Row>
            </Grid>
          </View>



          <Animatable.View animation="fadeInUpBig" style={[styles.custom_content, { backgroundColor: '#f2f1f6', flex: 2 }]}>
            <ScrollView>
              <View style={{ flex: 0.5 }}>
                {/* Team Row */}
                <Row>
                  <Col>
                    <Row>
                      <Text style={styles.header_Text}>Team: <Text style={styles.header_content_text}>
                        {ProfileData.team}
                      </Text></Text>
                    </Row>

                  </Col>
                </Row>
              </View>
              <View style={{ flex: 1.5 }}>
                {/* <Col> */}
                <Row style={{ flex: 1 }}>
                  <Text style={styles.header_Text}>Hours</Text>
                </Row>
                {/* Hours */}
                <View style={{ flex: 4 }}>
                  {ProfileData.hours.map((hours, i) => (

                    <Row key={i}>

                      <Col>
                        <Animatable.Text animation="fadeInLeft" style={{ ...helperFunctions.textSize() }}>{hours.dayOfWeek + ":"}</Animatable.Text>
                      </Col>


                      <Col style={{ width: '60%' }}>
                        <Animatable.Text animation="fadeInRight" style={{ ...helperFunctions.textBlack(), ...helperFunctions.assColor() }}>{!hours.active ? "OFF" : hours.from + "-" + hours.to}</Animatable.Text>

                      </Col>

                    </Row>
                  ))


                  }
                </View>
                {/* End Hours */}
                {/* </Col> */}
              </View>
              <View style={{ flex: 0.1 }}></View>
              <View style={{ height: 20 }}></View>
              <View style={{ flex: 1 }}>

                <View>
                  <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.mediumFont(), ...helperFunctions.themeColor() }}>Specialities</Text>
                </View>
                <View style={{ height: 15 }}></View>
                <View style={{ ...helperFunctions.flexRow(), justifyContent: 'space-between' }}>
                  {ProfileData.specialties.map((specialty, index) => {
                    return <Animatable.View animation="bounceInUp" delay={500} style={{ width: 110, height: 110, backgroundColor: '#fff', borderRadius: 75, ...helperFunctions.flexColumn(), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' }} key={index}>
                      <Text style={{ ...helperFunctions.textBlack(), textAlign: 'center', ...helperFunctions.yellowColor() }}>
                        {specialty}
                      </Text>
                    </Animatable.View>
                  })}
                </View>
                <View style={{ height: 25 }}></View>

                {/* End Buttom Menu */}
                {/* <Row></Row> */}
              </View>
              <View style={{ flex: 1.4 }}>
                {/* Email */}
                <Row></Row>
                <Row>
                  <CustomSwitch titleName={'Emails'} />
                </Row>
                {/* End Email*/}

                {/* SMS */}
                <Row>
                  <CustomSwitch titleName={'SMS'} />
                </Row>

                {/* End SMS*/}
                <Row>

                  {/* {ProfileData.clockReminderEnabled && */}
                  <CustomSwitch titleName={'Clock-In Reminder'} isClockIn={ProfileData.clockReminderEnabled} />
                  {/* } */}
                </Row>

              </View>
            </ScrollView>
          </Animatable.View>



        </Container >
      );
  }

  componentWillUnmount() {
    console.log("ddsf");

    this.setState(
      {
        ProfileLoader: false
      }
    )
  }
}


const mapStateProps = state => {
  // const LoggedData = state.LoggedData;
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;
  const TechnicianId = state.LoggedData.TechnicianId;

  const loader = state.LoggedData.loader;
  const ProfileData = state.ProfileReducer.ProfileData;
  // const technicianResponsibilities = state.ProfileReducer.technicianResponsibilities[0];
  const ProfileLoader = state.ProfileReducer.ProfileLoader;
  return {


    locationId,
    TechnicianId,
    ProfileData,
    ProfileLoader,
    // technicianResponsibilities

  };
}

export default connect(mapStateProps)(Profile);

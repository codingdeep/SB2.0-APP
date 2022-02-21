/* eslint-disable */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Container, Label } from 'native-base';
import Moment from 'moment';
import MonthView from './month';
import Activities from './activities';
import Mytasks from './myTaks';
import styles from './styles';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { GetAllTodayData } from '../../Redux/Action/TodayAllData';
import LOADER from '../Loader/Loader';
import { GetAllClients } from '../../Redux/Action/ClientsAction';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
import Modal from 'react-native-modal'
import Profile from '../Modal/profile';
import { helperFunctions } from '../../_helpers';
import RNRestart from 'react-native-restart';
import { BaseApi } from '../../components/ImportantFunction/baseApi'
import messaging from '@react-native-firebase/messaging';
const apiPath = BaseApi;

const HEADER_MAX_HEIGHT = 70;
const HEADER_MIN_HEIGHT = 30;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

class today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks: '',
      scrollY: new Animated.Value(0),
      profileVisible: false
    };
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      () => {
        this.getAllTodayData();
      },
    );
  }
  componentDidMount() {
    this.getAllTodayData();
  }

  static getDerivedStateFromProps(props, state) {
    const { AllTasksData } = props;
    if (AllTasksData.length > 0) {
    }
    return {
      // tasksValue: true,
    };
  }
  getAllTodayData = async () => {
    const { locationId } = this.props;
    this.props.dispatch(
      GetAllTodayData(locationId, this.props.navigation, () => {
        this.props.chat().setLocation(locationId);
        this.props.chat().setUser(this.props.TechnicianId);
        this.props.chat().setRetrive(true);
        this.props.chat().getThreadList();
      }),
    );
  };
  profileVisible = () => {
    this.setState({
      profileVisible: true
    })
  }
  closeProfile = () => {
    this.setState({
      profileVisible: false
    })
  }


  logOut = () => {
    try {

      messaging().unsubscribeFromTopic('lctn-appts-' + this.props.locationId)
        .then(() => console.log("llasldfll", "success"))
        .catch(error => console.log("llasldfll", "success"))
      AsyncStorage.clear()
      RNRestart.Restart()
      return true;
    } catch (exception) {
      return false;
    }
  }




  render() {
    const { AllTasksData, AllSalesData, AllActivitiesData } = this.props;

    console.log('SALES', this.props.AllSalesData)



    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT,
      ],
      extrapolate: 'clamp',
    });
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    Moment.locale('en');
    var date = new Date();
    return this.props.TodayLoader == false ? (
      <LOADER />
    ) : (
        <Container style={styles.pro_background}>
          <StatusBar hidden />
          {/* <View style={styles.container}> */}
          {/* <View style={{ flex: 1.5, justifyContent: "center" }}> */}

          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              ...helperFunctions.themeBg(),
              height: headerHeight,
              width: '100%',
              zIndex: headerZindex,
            }}
          />
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
            ])}
            style={{ flex: 1 }}>
            <View
              style={{
                ...helperFunctions.flexRow(),
                justifyContent: 'space-between',
                ...helperFunctions.defaultPadding(),
              }}>
              <TouchableOpacity
                onPress={() => this.profileVisible() /* this.props.navigation.navigate('Profile') */}>
                <Animated.View
                  style={{
                    height: imageHeight,
                    width: imageHeight,
                    borderRadius: 80,
                    borderColor: 'white',
                    borderWidth: 3,
                    overflow: 'hidden',
                    marginTop: imageMarginTop,
                  }}>
                  <Image
                    style={{ flex: 1, width: null, height: null }}
                    source={{
                      uri: this.props.imageUrl
                    }}
                  />
                </Animated.View>
              </TouchableOpacity>
              <View
                style={{
                  height: PROFILE_IMAGE_MAX_HEIGHT,
                  marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
                  ...helperFunctions.flexColumn(),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...styles.TextStyle,
                    ...helperFunctions.mediumFont(),
                    color: '#ffffff',
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}>
                  Today
              </Text>
                <Text
                  style={{ ...styles.TextStyle, ...helperFunctions.textSize() }}>
                  {Moment(date).format('dddd, MMMM DD')}
                </Text>
              </View>
            </View>

            <View style={{ height: 10 }} />

            {/* </View> */}
            <View style={{ flex: 8 }}>
              <View style={styles.mainContainer}>
                <View style={{ paddingTop: 10, ...helperFunctions.whiteToDark() }}>
                  <View
                    style={[
                      styles.monthBox,
                      {
                        ...helperFunctions.defaultPadding(),
                      },
                    ]}>
                    <Text
                      style={{ ...styles.month, ...helperFunctions.mediumFont(), ...helperFunctions.themeColor() }}>
                      {Moment(date).format('MMMM')}
                    </Text>
                  </View>
                  {/* ----------Month box------------- */}
                  {AllSalesData && AllSalesData.today && (
                    <View style={{ flex: 2.5 }}>{<MonthView today={AllSalesData.today}/>}</View>
                  )}
                </View>

                {/* ----------My Tasks box------------- */}
                <View style={{ flex: 3, ...helperFunctions.assBg() }}>
                  <Mytasks {...this.props} />
                  {/* {this.state.tasksValue && <Mytasks {...this.props} />} */}
                </View>
                {/* ---------Activities------------- */}
                {AllActivitiesData && AllActivitiesData.length != 0 && (
                  <View style={{ flex: 4, ...helperFunctions.whiteToDark() }}>{<Activities {...this.props} />}</View>
                )}
              </View>
              <View style={{ height: 62 }} />
            </View>
          </ScrollView>
          <View>
            <Modal
              style={{ margin: 0 }}
              backdropColor={'#000000'}
              backdropOpacity={0.5}
              isVisible={this.state.profileVisible}>
              <Profile logOut={this.logOut} closeProfile={this.closeProfile} TechnicianId={this.props.TechnicianId} locationId={this.props.locationId} image={this.props.imageUrl} />

            </Modal>
          </View>
        </Container>
      );
  }
}
const mapStateProps = state => {
  const AllTasksData = state.GetAllTodayReducer.AllTasksData;
  const AllSalesData = state.GetAllTodayReducer.AllSalesData;
  const AllActivitiesData = state.GetAllTodayReducer.AllActivitiesData;
  const TodayLoader = state.GetAllTodayReducer.TodayLoader;
  const businessId = state.LoggedData.businessId;
  const TechnicianId = state.LoggedData.TechnicianId;
  const imageUrl = state.LoggedData.imageUrl;
  const locationId = state.LoggedData.locationId.id;
  return {
    AllTasksData,
    AllSalesData,
    AllActivitiesData,
    TodayLoader,
    businessId,
    locationId,
    imageUrl,
    TechnicianId
  };
};
export default connect(mapStateProps)(today);

import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Label, } from 'native-base';
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




class today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks: '',
    };
    this.navigationWillFocusListener = props.navigation.addListener(
      "willFocus",
      () => {
        this.getAllTodayData()
      }
    );
  }
  componentDidMount() {

    this.getAllTodayData()


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
    const { locationId } = this.props
    this.props.dispatch(
      GetAllTodayData(locationId, this.props.navigation, () => {

        this.props.chat().setLocation(locationId);
        this.props.chat().setUser(this.props.TechnicianId);
        this.props.chat().setRetrive(true);
        this.props.chat().getThreadList();
      }),
    );
  };

  render() {
    const { AllTasksData, AllSalesData, AllActivitiesData } = this.props;



    Moment.locale('en');
    var date = new Date();
    return this.props.TodayLoader == false ? (
      <LOADER />
    ) : (
        <Container style={styles.pro_background}>

          <StatusBar hidden />
          {/* <View style={styles.container}> */}
          {/* <View style={{ flex: 1.5, justifyContent: "center" }}> */}

          <View style={styles.topTextContainer}>
            <View style={styles.topTextLeft}>
              <Text style={styles.TextStyle}>Today</Text>
              <Text style={styles.TextStyle}>
                {Moment(date).format('dddd, MMMM DD')}
              </Text>
            </View>
            <View style={styles.topTextRight}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Profile')

                }
              >
                <View style={styles.avater}>
                  <CusIconDesign
                    IconFrom="AntDesign"
                    name="user"
                    textAlign="right"
                    color='#0E1317'
                    size={20}
                  />
                </View>
                {/* <Image
                  style={styles.avater}
                  source={require('../../Assets/today_png/avater.png')}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
          <View style={{ flex: 8 }}>
            <View style={styles.mainContainer}

            >
              <View style={styles.monthBox}>
                <Text style={styles.month}>{Moment(date).format('MMMM')}</Text>
              </View>
              {/* ----------Month box------------- */}
              {AllSalesData && AllSalesData.thisMonth && (
                <View style={{ flex: 2.5 }}>
                  {

                    <MonthView />}
                </View>
              )}

              {/* ----------My Tasks box------------- */}
              <View style={{ flex: 3 }}>
                <Mytasks {...this.props} />
                {/* {this.state.tasksValue && <Mytasks {...this.props} />} */}
              </View>
              {/* ---------Activities------------- */}
              {AllActivitiesData && AllActivitiesData.length != 0 && (
                <View style={{ flex: 4 }}>
                  {<Activities {...this.props} />}
                </View>
              )}

            </View>
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
  const locationId = state.LoggedData.locationId.id;
  return {
    AllTasksData,
    AllSalesData,
    AllActivitiesData,
    TodayLoader,
    businessId,
    locationId
  };
};
export default connect(mapStateProps)(today);

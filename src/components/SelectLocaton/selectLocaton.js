import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles';
import { Container, View } from 'native-base';
import CusFooter from '../Footer/footer';
import CunTomBlock from './CustomBlock/customBlock';
import HeaDer from '../Header/header';
import LOADER from '../Loader/Loader';
import SplashScreen from '../Splash/splash';
// import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

// import { ,  } from 'react-native-gesture-handler';
import { GetAllTodayData } from '../../Redux/Action/TodayAllData';
import { SaveTokenToServer } from '../../Redux/SagaActions/ProfileSagaAction';
import messaging from '@react-native-firebase/messaging';
import { AlredyLogedInUser } from '../../Redux/Action/LogIn';
import { LogedInStoreData } from '../../Redux/SagaActions/extends_store_actions';
import { StoreData } from '../../Redux/Action/StoreData';
import { LogedStoreData } from '../../Redux/Action/StoreData';
import { Appearance, useColorScheme } from 'react-native-appearance';


class SelectLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LogInFirstTime: false,
      colorscheme: "default"
    };

  }
  async componentDidMount() {

    // this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
    //   this.setState({ colorscheme: colorScheme });
    // });
    try {
      // setTimeout(() => {
      let LogInFirstTime = await AsyncStorage.getItem('LogInFirstTime')
      if (LogInFirstTime !== null) {
        this.setState({
          LogInFirstTime: true
        })
      }


      if (this.props.businessId == null) {
        console.log("ddddddd22", this.props.locationId);
        const value = await AsyncStorage.getItem('User@Data');
        if (value !== null) {
          let data = JSON.parse(value);
          console.log("ddddddd", data);

          await this.props.dispatch(
            AlredyLogedInUser(
              data
            ),
          );
          LogedInStoreData(data.allLogInData.business.id,
            success => {
              console.log("dddddddLogedInStoreData", success);
              this.props.dispatch(LogedStoreData(success));
            },
            error => {

            })
        }
      } else {
        this.props.dispatch(StoreData(this.props.businessId));
      }
      // }, 500);


    } catch (error) {
      // Error saving data
    }

    this.getFcmToken()
  }
  getFcmToken = async () => {

    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await SaveTokenToServer(fcmToken)
      console.log("fcmToken", fcmToken);
      // this.showAlert("Your Firebase Token is:", fcmToken);
    } else {
      // this.showAlert("Failed", "No token received");
    }
  }


  static getDerivedStateFromProps(props, state) {
    return {};
  }

  getAllTodayData = async locationId => {
    messaging().subscribeToTopic('lctn-appts-' + locationId).then(() =>
      console.log("tokentokenTopic", "topic"))
      .catch(error => console.log("tokentokenError", error))
    await this.props.navigation.navigate("Screens")
    // await this.props.dispatch(
    //   GetAllTodayData(locationId, this.props.navigation, () => {

    //     this.props.chat().setLocation(locationId);
    //     this.props.chat().setUser(this.props.TechnicianId);
    //     this.props.chat().setRetrive(true);
    //   }),
    // );
  };

  render() {
    // Appearance.getColorScheme();

    // console.log("subscription", this.state.colorscheme);

    // const colorScheme = Appearance.getColorScheme();
    const { StoreLocationInfo, StoreAllInfo, } = this.props;
    const { LogInFirstTime } = this.state


    if (StoreLocationInfo && StoreLocationInfo.length == 1) {
      console.log("StoreLocationInfo", StoreLocationInfo);
      setTimeout(() => {
        this.getAllTodayData(StoreLocationInfo[0].id)
      }, 5000);
    }

    return this.props.StoreLoader == false && !LogInFirstTime ? (
      <SplashScreen />
    ) : this.props.StoreLoader == false && LogInFirstTime ?
        (<LOADER />) : this.props.StoreLoader == true && StoreAllInfo ?
          (
            <Container style={styles.container}>
              <StatusBar hidden />
              <View style={{ flex: 1 }}>
                {/* <HeaDer {...this.props} /> */}
              </View>
              {/* First Block */}

              <View style={styles.First_BLock}>
                <Text style={styles.First_BLock_Title}>{StoreAllInfo.name}</Text>
              </View>
              <View style={{ flex: 8 }}>
                <ScrollView style={{}}>
                  {/* First Block */}
                  {/*Fake Row  */}

                  {StoreLocationInfo.map((data, index) => (
                    <View key={index}>
                      <View style={{ height: 10 }} />
                      {/* End Fake Row */}
                      {/* Custom First Block */}
                      <TouchableOpacity onPress={() => this.getAllTodayData(data.id)}>
                        <CunTomBlock
                          title={data.name}
                          content={
                            data.address.street +
                            ', ' +
                            data.address.city +
                            ', ' +
                            data.address.state +
                            ', USA'
                          }
                          imageLink={data.pictures[index]}
                        />
                      </TouchableOpacity>
                      {/* End Custom First Block */}
                      {/*Fake Row  */}
                      <View style={{ height: 10 }} />
                      {/* End Fake Row */}
                    </View>
                  ))}
                </ScrollView>
              </View>
              {/* End Fake Row */}
              {/* <View style={{ paddingTop: 2, flex: 0.3, alignItems: 'center' }}>
            <CusFooter />
          </View> */}
            </Container>
          ) : null;
  }
}

const mapStateProps = state => {
  // const businessId = state.LoggedData.businessId;
  //   const locationId = state.LoggedData.locationId;
  const StoreAllInfo = state.StoreDataReducer.StoreAllData;
  const StoreLoader = state.StoreDataReducer.storeLoader;
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations;
  const TechnicianId = state.LoggedData.TechnicianId;
  const businessId = state.LoggedData.businessId;
  const locationId = state.LoggedData.locationId;
  return {
    StoreAllInfo,
    StoreLocationInfo,
    StoreLoader,
    TechnicianId,
    businessId,
    locationId,
  };
};

export default connect(mapStateProps)(SelectLocation);

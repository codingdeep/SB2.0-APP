/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Screens from '../components/Screens';
import SplashScreen from '../components/Splash';
import Login from '../components/Login';
import Profile from '../components/Profile/';
import SearchScreen from '../components/Clinets/index';
import TodayScreen from '../components/Today/index';

import Chat from '../components/Chat';
import ClientMessage from '../components/Chat/ClientMessage/clientMessage';

import ClinetsDetails from '../components/ClientsProfile/index';
import UpcomingAppoinments from '../components/UpcomingAppointment/index';
import SelectStore from '../components/Store';
import AddEditFormula from '../components/AddEditFormula/index';
import PastAppointments from '../components/PastAppointments/index';
import SelectLocation from '../components/SelectLocaton/index';
import { connect } from 'react-redux';
import Reminder from '../components/Reminder/index';

import Activites from '../components/Activites/index';


import ChatView from '../components/ChatView/chatView';
import Appointment from '../components/AddEditService';
import SignIn from '../components/Login/signIn';

let chat = null;
let ApptReload = null
class nav extends Component {
  constructor(props) {
    super(props);
    chat = props.getChat;
    ApptReload = props.getAppt;
      console.log("APTRELOA",ApptReload)
  }

  render() {
    console.log("this.props.status", this.props.status);

    return this.props.status === false ? (
      <AuthStackContainer />
    ) : (
        <AppStackAppContainer />
      );
  }
}
// For all authentication
const AuthStack = createStackNavigator(
  {
    // SELECTSTORE: {
    //   screen: props => <SelectStore {...props} chat={chat} />,
    // },
    LOGIN: {
      screen: SignIn,
    },
  },
  {
    headerMode: 'none',
  },
);

// For Successfully Login user
const AppStack = createStackNavigator(
  {

    // SPLASHSCREEN: {
    //   screen: SplashScreen,
    // },
    SELECTLOCATION: {
      screen: props => <SelectLocation {...props} chat={chat} apptReload={ApptReload} />,
    },
    SELECTSTORE: {
      screen: props => <SelectStore {...props} chat={chat} apptReload={ApptReload} />,
    },

    Screens: {
      screen: props => <Screens {...props} chat={chat} apptReload={ApptReload} />,
    },
    PROFILE: {
      screen: Profile,
    },
    HOME: {
      screen: Reminder, //Screens,
    },
    Search: {
      screen: SearchScreen,
    },

    SPLASHSCREEN: {
      screen: SplashScreen,
    },
    TODAYSCREEN: {
      screen: TodayScreen,
    },
    Chat: {
      screen: props => <Chat {...props} chat={chat} />,
    },
    CLIENTSDETAILS: {
      screen: ClinetsDetails,
    },
    LOGIN: {
      screen: Login, //Login, //ChatView Appointment,
    },
    // SELECTSTORE: {
    //   screen: props => <SelectStore {...props} chat={chat} />,
    // },
    // SELECTLOCATION: {
    //   screen: props => <SelectLocation {...props} chat={chat} />,
    // },
    AddEditFormulaScreen: {
      screen: AddEditFormula,
    },
    // TimeSheetScreen: {
    //   screen: TimeSheet,
    // },
    UpcomingAppoinmentsScreen: {
      screen: UpcomingAppoinments,
    },
    PastAppointmentsScreen: {
      screen: PastAppointments,
    },
    // TimesheetViewNew: {
    //   screen: TimesheetViewNew,
    // },
  },
  {
    headerMode: 'none',
  },
);

// Switch navigator for initial unauthorized user
const AuthStackContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      LOGGED: AppStack,
    },
    {
      headerMode: 'none',
      initialRouteName: 'Auth',
    },
  ),
);

// Switch navigator for initial authorized user
const AppStackAppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      LOGGED: AppStack,
    },
    {
      headerMode: 'none',
      initialRouteName: 'LOGGED',
    },
  ),
);

const mapStateProps = state => {

  return {};
};

export default connect(mapStateProps)(nav);

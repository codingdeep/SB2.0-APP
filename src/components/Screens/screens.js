/* eslint-disable */
import React, { Component } from 'react';
import { createAppContainer, DefaultTheme, DarkTheme } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import TaBBar from '../Tabbar/taBBar';
// import TODAY from '../Today/';
import Clients from '../Clinets/index';
import ClientsDetails from '../ClientsProfile/index';
import FormulaList from '../FormulaList/index';
import AddEditFormula from '../AddEditFormula/index';
import Sales from '../Sales';
import Reminder from '../Reminder/index';
import ADDEditService from '../AddEditService/index';
import UpComingAppoinments from '../UpcomingAppointment/index';
import PastAppoinments from '../PastAppointments/index';
import AddTask from '../AddTask/index';
import TodayScreen from '../Today/index';
import Activites from '../Activites/index';
import StartEndDate from '../../components/Sales/StartEndDate';

import MyBook from '../MyBook';
import Profile from '../../components/Profile/';

import Activities from '../Activites/index';
import MyTasks from '../MyTasks/index';
import EditTask from '../EditTask/index';
import Appointment from '../../components/Appointment';
import AppointmentBook from '../../components/Appointment/AppointmentFromBook';
import EditAppointment from '../../components/Appointment/EditAppointment';
import Rebook from '../../components/Appointment/Rebook';

import Time from './Time/Time';
import AddEditService from '../../components/AddEditService';
import Chat from '../../components/Chat';
import ChatView from '../../components/ChatView/chatView';
import addEditProduct from '../AddEditService/addEditProduct';
import Login from '../../components/Login';
import EditAppt from '../UpcomingAppointment/editAppt';
import TimeClock from "../TimeClock";
import TimeSheet from "../Timesheet";
import TimesheetViewNew from "../TimesheetView";

let chat = null;
let apptReload = null

const clientsStack = createStackNavigator(
  {
    Clients: {
      screen: props => <Clients {...props} apptReload={apptReload} />,
    },
    CLIENTS_DETAILS: {
      screen: props => <ClientsDetails {...props} apptReload={apptReload} />,
    },
    FormulaListScreen: {
      screen: FormulaList,
    },
    AddEditFormulaScreen: {
      screen: AddEditFormula,
    },
    UpComingAppoinmentsScreen: {

      screen: props => <UpComingAppoinments {...props} apptReload={apptReload} />,
    },
    PastAppoinmentsScreen: {
      screen: PastAppoinments,
    },
    Appointment: {
      screen: Appointment,
    },
    EditAppointment: {
      screen: EditAppointment,
    },
    Rebook: {
      screen: Rebook,
    },
    AddEditService: {
      screen: AddEditService,
    },
    AddEditProduct: {
      screen: addEditProduct,
    },
    EditAppt: {
      screen: EditAppt
    },
    MyBook: {
      screen: props => <MyBook {...props} />,
    },
    AppointmentBook: {
      screen: AppointmentBook,
    },
    AddEditServiceBook: {
      screen: AddEditService,
    },
    AddEditProductBook: {
      screen: addEditProduct,
    }
  },
  {
    headerMode: 'none',
    initialRoute: 'Clients',
  },
);

clientsStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        switch (navigation.state.routes[i].routeName) {
            case 'Appointment':
            case 'AppointmentBook':
            case 'EditAppointment':
            case 'AddEditServiceBook':
            case 'MyBook':
                tabBarVisible = false;
                break;
            default:
                tabBarVisible = true;
        }
    }
    return {
        tabBarVisible
    }
};




const todayStack = createStackNavigator(
  {
    TodayScreen: {
      screen: props => <TodayScreen {...props} chat={chat} />,
    },
    AddTask: {
      screen: AddTask,
    },
    EditTask: {
      screen: EditTask,
    },
    ActivitiesScreen: {
      screen: Activities,
    },
    MyTasksScreen: {
      screen: MyTasks,
    },
    Profile: {
      screen: Profile,
    },
    Reminder: {
      screen: Reminder,
    },


  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
    headerMode: 'none',
    initialRoute: 'TodayScreen',
  },
);


const salesStack = createStackNavigator(
  {
    Sales: {
      screen: Sales,
    },
    StartEndDate: {
      screen: StartEndDate,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
    headerMode: 'none',
    initialRoute: 'Sales',
  },
);
const ChatScreens = createStackNavigator(
  {
    Chats: {
      screen: props => <Chat {...props} chat={chat} />,
    },
    ThreadView: {
      screen: props => <ChatView {...props} chat={chat} />,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
    headerMode: 'none',
    initialRoute: 'Chats',
  },
);
const My_book = createStackNavigator(
  {
    MyBook: {
      screen: props => <MyBook {...props} apptReload={apptReload} />,
    },
    AppointmentBook: {
      screen: AppointmentBook,
    },
    AddEditServiceBook: {
      screen: AddEditService,
    },
    AddEditProductBook: {
      screen: addEditProduct,
    },
  },
  {
    headerMode: 'none',
    initialRoute: 'MyBook',
  },
);

My_book.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        switch (navigation.state.routes[i].routeName) {
            case 'AddEditServiceBook':
            case 'AppointmentBook':
            case 'AddPaymentMethod':
                tabBarVisible = false;
                break;
            default:
                tabBarVisible = true;
        }
    }
    return {
        tabBarVisible
    }
};



const Time_Sheet = createStackNavigator(
  {
    Time_Sheet: {
      screen: TimeSheet,
    },
    TimesheetViewNew: {
      screen: TimesheetViewNew,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
    headerMode: 'none',
    initialRoute: 'TodayScreen',
  },
);


const Rootnavigator = createBottomTabNavigator(
  {
    Today: {
      screen: todayStack, //todayStack,
    },
    My_book: {
      screen: My_book,
    },
    Clients: {
      screen: clientsStack,
    },
    Sales: {
      screen: salesStack,
    },
    Chats: {
      screen: ChatScreens,
    },
    // Time: {
    //   screen: Time,
    // }



  },
  {
    tabBarComponent: props => <TaBBar {...props} />,
  },
  {
    swipeEnabled: true,
    // initialRouteName: 'Today',
  },
);
const RootnavigatorCommission = createBottomTabNavigator(
  {
    Today: {
      screen: todayStack
    },
    Time_Clock: {
      screen: TimeClock, //Clients,
    },
    Time_Sheet: {
      screen: Time_Sheet,
    }
  },
  {
    tabBarComponent: props => <TaBBar {...props} />,
  },
  {
    swipeEnabled: true,
    // initialRouteName: 'Today',
  },
);

const App = createAppContainer(Rootnavigator);
const AppWithNotBookAble = createAppContainer(RootnavigatorCommission);
class nav extends Component {
  constructor(props) {
    super(props);
    chat = props.chat;
    apptReload = props.apptReload

  }
  conditionalMenu = () => {
    let bookable = false
    let allLocation = this.props.StoreAllInfo.locations
    let result = allLocation
      .filter(location => location.id == this.props.locationId)
    let isTech = result[0].technicians.filter(tech => {

      if (tech.id == this.props.TechnicianId && tech.bookable == true) {
          console.log('wdwed',tech)
        bookable = true
      }
    })
    return bookable
  }
  render() {

    console.log("this.conditionalMenu()", this.props.role);

    return (this.conditionalMenu() == true) ? <App /> : <AppWithNotBookAble />;
    // return this.props.compensationStrategy == "Commission" ? <AppWithCommission /> : <App />;
  }
}
// export default nav;


const mapStateProps = state => {
  console.log("StoreAllInfo555555", state.StoreDataReducer.StoreAllData);
  console.log("StoreAllInfo555555", state.LoggedData);

  const compensationStrategy = state.LoggedData.AllLogedUserData.technicianResponsibilities[0].compensationStrategy;
  const role = state.LoggedData.AllLogedUserData.role
  const StoreAllInfo = state.StoreDataReducer.StoreAllData;
  const locationId = state.LoggedData.locationId.id
  const TechnicianId = state.LoggedData.TechnicianId;
  return {
    compensationStrategy,
    StoreAllInfo,
    locationId,
    TechnicianId,
    role

  };
};

export default connect(mapStateProps)(nav);

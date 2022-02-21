import TimeClock from '../../../components/TimeClock';
import TimeSheet from '../../Timesheet';
import TimesheetViewNew from '../../TimesheetView/index';
import {createStackNavigator} from 'react-navigation-stack';
import StartEndDateTime from '../../../components/Sales/StartEndDate/StartEndDate';
// Your own stack
const StackHome = createStackNavigator(
  // console.log("TimesheetView"),
  {
    TimeClock: {
      screen: TimeClock, //Clients,
    },
    TimeSheet: {
      screen: TimeSheet,
    },

    TimesheetViewNew: {
      screen: TimesheetViewNew,
    },
    StartEndDateTime: {
      screen: StartEndDateTime,
    },
  },
  {
    headerMode: 'none',
    initialRoute: 'TimeClock',
  },
);

// This code let you hide the bottom app bar when "CustomHide" is rendering
StackHome.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  tabBarVisible = false;
  //}

  return {
    tabBarVisible,
  };
};

export default StackHome;

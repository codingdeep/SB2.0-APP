import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../Theme/hooks'
import {helperFunctions} from "../../_helpers";
let deviceWidth = Dimensions.get('window').width;

const { colors } = useTheme()
const styles = StyleSheet.create({
  pro_background: {

    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 36,
    marginHorizontal: 48,
  },
  topTextContainer: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  topTextLeft: {
    // width: '80%',
    justifyContent: "center",
    // alignItems: "center"
  },
  topTextRight: {
    // width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  avater: {
    height: 20,
    width: 20,
    top: 4,
  },
  TextStyle: {
    fontFamily: 'Poppins-Medium',
    ...helperFunctions.textSize(),
    color: colors.textColor,
    fontWeight: '500',
  },
  month: {
    justifyContent: 'flex-end',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#424e9c',
  },
  viewAll: {
    justifyContent: 'flex-end',
    ...helperFunctions.textSize(),
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#0e1317',

  },
  monthBox: {
    flex: .6,
    flexDirection: 'row',
    // height: "30%"
    // marginTop: 30,
  },
  activityName: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
    // height: "30%"
    // marginTop: 30,
  },
  firstBox: {
    flex: 1,
    flexDirection: 'row',
  },
  firstBoxActivity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",

  },
  firstBoxTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:  8
    // borderTopWidth: 1
  },
  firstItem: {
    width: '25%',
    // height: 50,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  firstItem2: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  borderStyle: {
    height: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
  },
  midBox: {
    // marginTop: 30,
    flex: 2,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  midBoxLeft: {
    width: '55%',
    alignItems: 'flex-start',
  },
  midBoxRight: {
    width: '45%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  midBoxImg: {
    height: 33,
    width: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myTaskPlus: {
    // height: "100%",
    // width: "100%",
    // alignItems: "flex-end",
    // justifyContent: "center",
    // // alignContent: "center",
    // backgroundColor: "#FCBF24"
  },
  myTaskPlusIcon: {
    height: 30,
    width: 30,
    backgroundColor: "#FCBF24",
    borderRadius: 50,
    padding: 2,
    // alignSelf: "center",
    // justifyContent: "center",
    // alignContent: "center"

  },
  plus: {
    height: 16,
    width: 16,
  },
  midBoxLeft1: {
    width: '60%',
    alignItems: 'flex-start',
  },
  midboxIconLeft: {
    width: '7%',
    // marginTop: 2,
  },
  midBoxRight2: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dot: {
    height: 12,
    width: 12,
  },
  write: {
    height: 13,
    width: 13,
    marginRight: 5,
  },
  midBoxLeft2: {
    width: '60%',
    alignItems: 'flex-start',
  },
  midBoxRight3: {
    width: '40%',
    alignItems: 'flex-end',
  },
  longText: {
    marginBottom: 10,
  },
  minute: {
    color: '#fcbf24',
  },
  midboxblank: {
    width: '23%',
  },
});

export default styles;

import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
import {helperFunctions} from "../../_helpers";
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: '#424e9c',
  },
  pro_background_Image: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    flex: 1,
  },
  content_txt: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'normal',
    ...helperFunctions.textSize()
  },
  normal_14_text: {
    fontFamily: 'Poppins-Medium',
    ...helperFunctions.textBlack(),
    paddingLeft: 2,
  },
  normal_18_Text: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  normal_14_text_button: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    // fontSize: deviceWidth > 360 ? 14 : 12,
    fontSize: 12,
    textAlign: 'center',
    padding: 3
  },
  custom_buttom: {
    backgroundColor: '#fcbf24',
    height: '100%',
    width: '100%',
    borderRadius: 25,
    // paddingTop: 8,
    // padding: 5,
    // margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  custom_switch: {
    backgroundColor: '#FFF',
    width: 53,
    borderWidth: 2,
    borderColor: '#424e9c',
    borderRadius: 33,
  },
  avater: {
    height: 70,
    width: 70,
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 3
  },
  circle: {
    width: 33,
    height: 33,
    borderRadius: 100 / 2,
    backgroundColor: '#fcbf24',
    alignItems: 'center',
    paddingTop: 3.5,
  },
  header_title: {
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
    fontWeight: '500',
  },
  header_Text: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttomA: {
    margin: 2,

    // alignItems: 'flex-start',
    // justifyContent: "space-evenly",
    // alignContent: "space-between"

    height: '100%',
  },
  buttomB: {
    // paddingLeft: 5,
    // paddingRight: 5,
    alignItems: 'center',
  },
  buttomC: {
    paddingLeft: 5,
    alignItems: 'flex-end',
  },
  header_content_text: {
    color: '#0e1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingLeft: 2,
  },
  custom_content: {
    backgroundColor: '#FFF',
    borderTopRightRadius: 33,
    borderTopLeftRadius: 33,
    padding: 20,
    paddingTop: 20,
    flex: 3,
  },
});

export default styles;

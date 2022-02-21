import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    color: '#979797',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: '300',
  },
  textBlack: {
    color: '#0e1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  text1: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
  },
  text2: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBox: {
    width: '50%',
  },
  midBox: {
    width: '35%',
    alignItems: 'flex-end',
  },
  deleteContainer: {
    width: '7.5%',
    justifyContent: 'center',
    marginTop: -8,
  },
  rightBox: {
    width: '7.5%',
    justifyContent: 'center',
    marginTop: -8,
  },
  yellowBack: {
    width: 93,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    height: 16,
    width: 16,
  },
  arrow: {
    alignSelf: 'flex-end',
    height: 8,
    width: 12,
  },
  arrow2: {
    alignSelf: 'flex-end',
    height: 24,
    width: 24,
  },
  borderStyle: {
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    marginVertical: 10,
  },
  back: {
    height: 70,
    width: '100%',
    borderRadius: 7,
    flexDirection: 'row',
    marginVertical: 10,
  },
  back2: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  leftImg: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImg2: {
    width: '23%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  rightBox2: {
    width: '77%',
    justifyContent: 'center',
  },
  img: {
    height: 37,
    width: 37,
  },
  img2: {
    height: 59,
    width: 59,
  },
  mainBox: {
    // alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  left3: {
    width: '50%',
  },
  right3: {
    width: '50%',
  },
});

export default styles;

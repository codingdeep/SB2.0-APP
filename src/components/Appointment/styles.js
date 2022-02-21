import {StyleSheet, Dimensions} from 'react-native';
import {white, blue} from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1,
  },
  textStyle: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  firstBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 18,
  },

  ClientInfo: {
    height: 70,
    justifyContent: 'flex-start',
  },
  ClientInfoText: {
    color: '#424E9C',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '400',
  },
  source: {
    color: '#0E1317',
  },
  addService: {
    color: '#0E1317',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 2,
  },
  edit: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    height: 100,
    borderBottomColor: '#F1F0F5',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    borderBottomWidth: 1,
    // paddingLeft: 0,
    // marginLeft: 0
  },
  userImage: {
    borderRadius: 10,
    height: 30,
    width: 30,
  },
  body: {
    alignSelf: 'flex-start',
    // marginRight: 20,
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderColor: 'transparent',
    // backgroundColor:"red"
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    color: '#0E1317',
    fontFamily: 'Poppins-Medium',
  },
  messageSubBody: {
    textAlign: 'left',
    fontSize: 12,
    color: '#424E9C',
    fontFamily: 'Poppins-Medium',
  },
  badge: {
    height: 12,
    width: 12,
    backgroundColor: '#58EB67',
  },

  firstBox: {
    justifyContent: 'flex-start',
  },
  secondBox: {
    width: '60%',
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  thirdBox: {
    width: '20%',
    height: 50,
    alignItems: 'flex-end',
  },
  avatar: {
    height: 59,
    width: 59,
  },
  dot: {
    height: 12,
    width: 12,
  },
  name: {
    color: '#0e1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '400',
  },
  dollar: {
    color: '#979797',
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    fontWeight: '400',
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default styles;

import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1
  },
  firstBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 18,
  },
  firstBox: {
    justifyContent: 'flex-start',
  },
  secondBox: {
    width: '60%',
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 70,
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
    color: '#fcbf24',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '400',
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  midViewBox: {
    marginVertical: 10,
    marginHorizontal: 50,
    flex: 1,
  },
  borderStyle: {
    borderBottomColor: '#f1f0f5',
    borderBottomWidth: 2,
  },
  text: {
    color: '#0e1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '400',
  },
  lastBox: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#f1f0f5',
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5
  },
  textStyle: {
    color: '#0e1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '400',
    // paddingLeft: 15,
    // paddingVertical: 12,
    justifyContent: "flex-start",
  },
  rightArrow: {
    marginRight: 25,
  },
});

export default styles;

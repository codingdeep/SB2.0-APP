import {StyleSheet, Dimensions} from 'react-native';
import {helperFunctions} from "../../_helpers";
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 15,
  },
  img: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
  },
  fiftyPercentLeft: {
    width: '55%',
    justifyContent: 'center',
  },
  fiftyPercentRight: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBox: {
    justifyContent: 'center',
    width: '70%',
  },
  rightBox: {
    justifyContent: 'space-between',
  },
  text: {
    // textAlign: 'center',
    marginLeft: 48,
    color: '#0E1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    // fontWeight: '700',
  },
  text2: {
    textAlign: 'center',
    color: '#424E9C',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: '600',
  },
  yellowBack: {
    width: 93,
    height: 34,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cost: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  arrow: {
    height: 8,
    width: 12,
  },
  text3: {
    color: '#666',
    fontFamily: 'Poppins-Medium'

  },
   textBlack: {
    color: '#0e1317',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '700',
  },
  today_png: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Vrstva: {width: '15%', justifyContent: 'center', alignItems: 'flex-end'},


  borderStyleWhite: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: .5,
  },
  boderBack: {
    backgroundColor: '#424E9C',
    paddingHorizontal: 20,
  },
  apple: {
    height: 16.6,
    width: 13,
    marginRight: 5,
  },
  secondContainer: {
    backgroundColor: '#424E9C',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    ...helperFunctions.padding(12,10,12,20)
  },
  yellowText: {
    color: '#FCBF24',
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    fontWeight: '700',
  },
  whiteText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '700',
    paddingRight: 20,
  },
  upWhite: {
    height: 24,
    width: 24,
  },
  avater: {
    height: 22,
    width: 22,
    marginRight: 5,
  },
});

export default styles;

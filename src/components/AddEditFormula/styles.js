import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
import { Appearance } from 'react-native-appearance';
import {helperFunctions} from '../../_helpers';
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },


  container: {
    flex: 8,
    marginHorizontal: 20,
  },
  textStyle: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  Back: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
  },
  cus_input_view: {
    flex: 1,
    // backgroundColor: '#f1f0f5',
    borderRadius: 8,
    justifyContent: 'center',
  },
  down: {
    alignSelf: 'flex-end',
    height: 24,
    width: 24,
  },

  text: {
    color: '#0E1317',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '700',
  },
  bigText: {
    color: '#424E9C',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  calender: {
    height: 20,
    width: 20,
  },
  empty: {
    width: '100%',
    height: 15,
  },
});

export default styles;

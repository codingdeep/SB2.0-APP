import { StyleSheet, Dimensions } from 'react-native';
import {helperFunctions} from '../../_helpers';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pro_background: {
    flexDirection: 'column',
    flex: 1
  },

  cus_input_view: {
    backgroundColor: '#f1f0f5',
    borderRadius: 3,
    justifyContent: 'center',
    ...helperFunctions.deviceWiseHeight(65,65,70,70)
  },
  cus_input_view_serch: {
    flex: .5,
    backgroundColor: '#f1f0f5',
    borderRadius: 3,
    justifyContent: 'center',
  },
  main_container: { paddingLeft: 20, paddingRight: 20 },
  textStyle: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  Back: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 3
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

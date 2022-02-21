/* eslint-disable */
import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
import {helperFunctions} from '../../_helpers';
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerBody: {
    width: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
    // backgroundColor: "black"
  },
  headerTitle: { color: '#424E9C', fontSize: 16, fontFamily: 'Poppins-Medium' },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textStyle: {
    ...helperFunctions.textBlack(),
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  plus: {
    height: 24,
    width: 24,
  },
});

export default styles;

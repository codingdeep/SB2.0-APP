/* eslint-disable */
import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import { Appearance } from 'react-native-appearance';
import { useTheme } from '../../Theme/hooks'
import { red } from 'react-native-redash';
const { colors } = useTheme()

const defaultMode = Appearance.getColorScheme() || 'light';
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },
  Fir_st_block: {
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'row',
    paddingVertical: 10
  },
  Fir_st_block_text: {
    textAlign: 'center',
    color: colors.textColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  Fir_st_block_col: { alignSelf: 'center', width: '50%' },
  container: {
    flex: 1,
    marginHorizontal: 48,
  },
  img: {
    height: 48,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',
    // backgroundColor: colors.subHeaderButton
    // padding: 49,
  },
  img2: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',
    borderRadius: 10
    // flex: 1,
    // padding: 49,
  },
  leftImg: {
    height: 24,
    width: 24,
  },
  leftBox: {
    marginLeft: 43,
  },
  midBox: {
    justifyContent: 'center',
  },
  rightBox: {
    marginRight: 45,
  },
  topText: {
    textAlign: 'center',
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  Text2: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
  },
  topBigText: {
    textAlign: 'center',
    color: defaultMode === 'dark' ? '#ffffff' : "#0000ff",
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 15,
  },
  midBoxcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 48,
    // backgroundColor: "red"
  },
  leftView: {
    width: '50%',
  },
  rightView: {
    width: '50%',
  },
  smallText: {
    textAlign: 'center',
    color: Appearance.getColorScheme() === 'dark' ? '#F0F8FF' : '#979797',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '300',
  },
  borderStyle: {
    borderBottomColor: Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',
    borderBottomWidth: 2,
    marginVertical: 10,
  },
});

export default styles;

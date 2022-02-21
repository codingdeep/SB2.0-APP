import { StyleSheet, Dimensions } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },
  Fir_st_block: {
    flex: .6,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'row',
  },
  Fir_st_block_text: {
    textAlign: 'center',
    color: colors.textColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  Fir_st_block_col: { alignSelf: 'center', width: '50%' },
  Sec_nd_block: {
    // flex: 1,
    // height: 80,
    backgroundColor: colors.backgroundColor,
    // marginHorizontal: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: "center",
  },
  block_text_header: {
    color: Appearance.getColorScheme() === 'dark' ? '#F0F8FF' : '#979797',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
  },
  block_text_content: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  block_text_content_day: {
    fontSize: 14,
    // color: colors.textColor,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  th_rd_block: {
    // flex:1,
    height: 80,
    // width: "60%",
    backgroundColor: colors.background,
    justifyContent: "space-between",
    // paddingLeft: 40,
    // paddingRight: 40,
    // flexDirection: 'row',
  },
  th_rd_block_service: {
    // height: 80,
    // width: "60%",

    // backgroundColor: 'blue',
    justifyContent: "space-between",
    // paddingLeft: 40,
    // paddingRight: 40,
    // flexDirection: 'row',
  },
  calendarHeader: {
    // paddingLeft: 20, 
    // paddingRight: 20,
    backgroundColor: colors.background,
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
    // height: 500

    // header()
  },
  selectDayButton: {
    backgroundColor: colors.dayButton, width: "45%", justifyContent: "center", alignItems: "center", borderRadius: 10,

    marginVertical: 5
  }
});

export default styles;

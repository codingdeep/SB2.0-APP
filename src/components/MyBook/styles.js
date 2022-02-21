/* eslint-disable */
import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#424E9C", fontSize: 20 },

  calendar: {
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: colors.background,
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
    // height: 500

    // header()
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 10,
    // paddingRight: 10,
    marginTop: 6,
    alignItems: 'center'
  },
  line: {
    flex: 1,
    // backgroundColor: "green"
    justifyContent: "center",
    alignItems: "center"

  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    // padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Poppins-Medium',
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  timeSection: {
    paddingHorizontal: 5,
    minHeight: 78,
    justifyContent: "center",
    alignItems: "center",

  },
    bodyStyle: {
    borderLeftWidth: 5,
    borderLeftColor: '#444'

  },
  timeSectionText: { color: colors.iconColor, fontSize: 16 }

});

export default styles;

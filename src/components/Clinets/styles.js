import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1
  },
  mainContainer: {
    marginHorizontal: 20,
    // height: 50,
    flex: .8,
    // marginBottom: 10,
  },
  backImg: {
    backgroundColor: "#F1F0F5",
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
  },
  firstRow: {
    flex: 1,
    // width: '80%',
    // height: 49,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: "#FCBF24"
    // backgroundColor: "#F1F0F5"
  },
  yellowCard: {
    // width: 52,
    // height: 49,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  secondRow: {
    flex: 1,
    // width: '20%',
    // height: 49,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientsProfileContainer: {
    height: 70,
    marginTop: 15,
    marginHorizontal: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  firstBlock: {
    width: '20%',
    height: 70,
    justifyContent: 'flex-start',
  },
  avater: {
    height: 59,
    width: 59,
    borderRadius: 12,
  },
  secondBlock: {
    width: '50%',
    height: 70,
    marginLeft: 5,
    justifyContent: "flex-start"
    // backgroundColor: "red"
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: '#0e1317',
    fontWeight: '500',
  },
  thirdBlock: {
    flex: 1,
    width: '40%',
    height: 70,
    justifyContent: "space-between",
    alignItems: "flex-end"
    // alignItems:
  },
  phone: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#424e9c',
    fontWeight: '300',
  },
  days: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#979797',
    fontWeight: '300',
    // backgroundColor: "red",
    marginTop: 3,
  },
  daysNextIn: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#979797',
    fontWeight: '300',
    // backgroundColor: "red",
    alignSelf: "flex-end",
    textAlign: "center",
    marginTop: 3,
  },
  dot: {
    height: 12,
    width: 12,
  },
  daysBox: {
    alignItems: 'flex-end',
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    alignContent: "flex-end"

    // marginTop: 35,
  },
  borderStyle: {
    borderBottomColor: '#f1f0f5',
    borderBottomWidth: .5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  onlineBox: {
    alignItems: 'flex-end',
    height: 12,
    width: 12,
  },
});
export default styles;

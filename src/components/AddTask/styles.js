import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  // main_container: {paddingLeft: 35, paddingRight: 35, marginVertical: 20},
  pro_background: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1
  },
  header_font: {
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  header_Col: {
    // width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  header_Col_A: {
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  cus_input_view: {
    flex: 1,
    backgroundColor: '#f1f0f5',
    borderRadius: 8,
    justifyContent: 'center',
  },
  cus_input_textInput: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  cus_large_textInput: {
    // flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: "red",
    borderColor: 'red',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    top: 0,
    // textAlign: "justify"
    // left: 0, right: 0
  },
});

export default styles;

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
  cus_input_view_search: {
    flex: 1,

    // backgroundColor: '#f1f0f5',
    // borderRadius: 8,

    justifyContent: 'center',
    flexDirection: "row", alignItems: "center",
    // justifyContent: "space-evenly"
  },
  cus_input_view_search_text: {
    // flex: 1,
    height: "100%",
    width: "40%",
    backgroundColor: '#f1f0f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: "center",
    // paddingLeft: 10
  },
  search_text: {
    textAlign: "center",
    padding: 2
    // numberOfLines
  },
  searchBox: {

    backgroundColor: '#f1f0f5',
    borderRadius: 8,
    justifyContent: 'center',
    // borderWidth: 10,
    borderColor: "red",
    // alignItems: "center",
    alignSelf: "center"
  },
  cus_input_textInput: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  notes_style: {
    fontSize: 18,
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',

  },
  cus_large_textInput: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default styles;

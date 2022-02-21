import {StyleSheet, Dimensions} from 'react-native';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  custom_content: {
    backgroundColor: '#FFF',
    borderTopRightRadius: 33,
    borderTopLeftRadius: 33,
    padding: 35,
    paddingTop: 20,
    flex: 3,
  },
  custom_header: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#424e9c',
    fontSize: 20,
  },
  custom_header_small: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#424e9c',
    fontSize: 18,
  },
  custom_small_text: {
    color: '#979797',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default styles;

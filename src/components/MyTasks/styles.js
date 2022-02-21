import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  leftBox: {
    width: '80%',
  },
  midBox: {
    width: '20%',
  },
  rightBox: {
    justifyContent: "flex-end",
    width: '15%',
  },
  leftBox2: {
    width: '50%',
  },
  rightBox2: {
    width: '50%',
  },
  longText: {
    marginVertical: 5,
  },
  borderStyle: {
    borderBottomColor: '#f1f0f5',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    height: 16,
    width: 16,
  },
});

export default styles;

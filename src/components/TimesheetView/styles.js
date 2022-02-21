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
  timeEntry: {
    flex: 0.7,
    backgroundColor: colors.subHeaderButton,
    paddingLeft: 35,
    paddingRight: 35,
  },
  PathCreator: {
    backgroundColor: '#F1F0F5',
    height: '100%',
    width: 2,
  },
  NormalText_12: {
    color: '#979797',
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  CustomHeader_Text: {
    fontSize: 20,
    color: '#424e9c',
    fontFamily: 'Poppins-Medium',
  },
  ICON_RIGHT: {
    textAlign: 'right',
    color: '#424e9c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ICON_LEFT: {
    textAlign: 'left',
    color: '#424e9c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  timeText: {
    fontSize: 14, fontFamily: 'Poppins-Light',
    color: colors.textColor
  },

});

export default styles;

import { StyleSheet, Dimensions } from 'react-native';


let deviceWidth = Dimensions.get('window').width;
import { Appearance } from 'react-native-appearance';
import { useTheme } from '../../Theme/hooks'
const defaultMode = Appearance.getColorScheme() || 'light';
const { colors } = useTheme()


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  First_BLock: {
    flex: 0.8,
    marginHorizontal: 40,
    // backgroundColor: 
  },


  First_BLock_Title: {
    color: defaultMode === 'dark' ? 'white' : '#424E9C',
    fontSize: 35,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',

  },
  Custom_Row_Text: {
    color: defaultMode === 'dark' ? 'white' : '#424E9C',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  Custom_Row_Text_content: {

    color: "red",
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    fontWeight: '300',
  },
  Custom_Row_Image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 10,
  },
});

export default styles;

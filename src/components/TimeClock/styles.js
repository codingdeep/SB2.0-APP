import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },
  shadow: {
    backgroundColor: colors.background,
    height: 125,
    width: '100%',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingTop: 24,
    // paddingLeft: '10%',
    // paddingRight: '10%',
    // elevation: 30,
    // // shadowOffset: { width: -5, height: 5 },
    // shadowColor: '#000',
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    paddingTop: 24,
    ...Platform.select({
      android: {
        elevation: 2,
        backgroundColor: 'transparent'
      },
      ios: {
        // shadowColor: '#000',
        shadowColor: "#000000",
        shadowOpacity: .5,
        shadowRadius: 1,
      },
    }),
  },
  cus_foot: {
    alignSelf: 'center',
    marginTop: 35,
  },
  ImageShow: { width: '100%', alignItems: 'center', paddingTop: 7 },
  Txt_View: {
    width: '100%',
    alignItems: 'center',
    height: 30,
  },
  ITEM_Text: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textColor,
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;

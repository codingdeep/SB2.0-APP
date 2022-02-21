import { StyleSheet, Dimensions } from 'react-native';
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../Theme/hooks'
import { helperFunctions } from '../../_helpers';
const { colors } = useTheme()
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({

  shadow: {
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#383838' : '#FFFFFF',

    height: 80,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      android: {
        elevation: 2,
        // shadowColor: "#000000",
        // backgroundColor: 'transparent'
      },
      ios: {
        // shadowColor: '#000',
        shadowColor: "#000000",
        shadowOpacity: .5,
        shadowRadius: 8,
      },
    }),
    // paddingLeft: '10%',
    // paddingRight: '10%',


  },
  cus_foot: {
    alignSelf: 'center',
    marginTop: 35,
  },
  ImageShow: { width: '100%', alignItems: 'center', paddingTop: 7 },
  Txt_View: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 5
  },

  ITEM_Text: {
    fontWeight: '400',
    color: colors.textColor,
    fontFamily: 'Poppins-Regular',
    ...helperFunctions.smallFont()
  },
});

export default styles;

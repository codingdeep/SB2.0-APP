import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  pro_background: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    flex: 1
  },
  messageGap: {
    height: 10,
  },
});
export default styles;

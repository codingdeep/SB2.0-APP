import { StyleSheet, Dimensions } from 'react-native';
import {helperFunctions} from "../../_helpers";
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pro_background: {
    flexDirection: 'column',
    flex: 1,

  },
  main_container: { flex: 8,paddingRight: 20},
});

export default styles;

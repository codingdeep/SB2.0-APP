import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {Col, Row} from 'native-base';
import {tabBarIcons} from '../../constants/Images';
import {tabBarNewIcons} from '../../constants/Images';
import styles from './styles';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
import {useTheme} from '../../Theme/hooks';
import { Appearance, AppearanceProvider } from 'react-native-appearance'
const defaultMode = Appearance.getColorScheme() || 'light';
const {colors} = useTheme();



const TabItem = props => {
  const {routeName} = props;
  const icon = tabBarIcons[routeName];
  // const [activeIndex, setIActiveIndex] = useState(0)

  const something = () => {
    props.onPress()
  }

  const isActive = props.actives === props.ind;
  const color = defaultMode === 'dark' ? 'gold' : '#424E9C'

  return (
    <Col>
      <TouchableOpacity  onPress={something}>
        <View style={styles.ImageShow}>
          {icon}

          {/* <Image source={icon} /> */}
        </View>
        <View style={styles.Txt_View}>
          <Text style={isActive ? [styles.ITEM_Text,{color: color}] : [styles.ITEM_Text]}>
            {props.routeName == 'My_book' ? 'Book ' : props.routeName == 'Time_Clock' ? 'Time Clock' : props.routeName == 'Time_Sheet' ? 'Time Sheet' : props.routeName}
          </Text>
        </View>
      </TouchableOpacity>
    </Col>
  );
};

export default TabItem;

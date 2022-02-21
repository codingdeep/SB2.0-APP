import React, { Component } from 'react';
import { Container, Label, Col, Row, Grid } from 'native-base';

import { Text, View, TouchableOpacity, Image } from 'react-native';
import { tabBarIcons } from '../../../constants/Images';
import styles from '../styles';
import CusIconDesign from '../../../Assets/Icon/IconAntDesign';
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../../Theme/hooks'
const { colors } = useTheme()


const iconA = tabBarIcons['TodayScreen'];
const iconB = tabBarIcons['TimeClock'];
const iconC = tabBarIcons['TimesheetView'];
const iconD = tabBarIcons['TimesheetViewNew'];

const CustomCol = props => {

  console.log('props', props.RouteName);
  return (
    <Col style={{ marginRight: 5, height: 70 }}>
      <TouchableOpacity
        style={{ height: 61 }}
        onPress={() => props.navigation.navigate(props.RouteName)}>
        <Row style={{ height: 30 }}>
          <View style={styles.ImageShow}>
            {props.RouteName == 'TodayScreen' ? (
              <CusIconDesign
                IconFrom="AntDesign"
                name="calendar"
                textAlign="center"
                color={colors.iconColor}
                size={18}
              />
              // <Image source={iconA} />
            ) : props.RouteName == 'TimeClock' ? (
              <CusIconDesign
                IconFrom="AntDesign"
                name="clockcircleo"
                textAlign="center"
                color={colors.iconColor}
                size={18}
              />
              // <Image source={iconB} />
            ) : props.RouteName == 'TimesheetView' ? (
              <CusIconDesign
                IconFrom="EvilIcons"
                name="location"
                textAlign="center"
                color={colors.iconColor}
                size={18}
              />
              // <Image source={iconC} />
            ) : (
                    <CusIconDesign
                      IconFrom="SimpleLineIcons"
                      name="location-pin"
                      textAlign="center"
                      color={colors.iconColor}
                      size={18}
                    />
                    // <Image source={iconD} />
                  )}
          </View>
        </Row>
        <Row>
          <View style={styles.Txt_View}>
            <Text style={styles.ITEM_Text}>{props.name}</Text>
          </View>
        </Row>
      </TouchableOpacity>
    </Col>
  );
};

export default CustomCol;

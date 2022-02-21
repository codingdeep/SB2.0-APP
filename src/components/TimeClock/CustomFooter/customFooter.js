import React, { Component } from 'react';
import { Row, Grid } from 'native-base';
import Footer from '../../Footer/footer';
import { View } from 'react-native';
import CustomCol from '../CustomCol/customCol';
import styles from '../styles';
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../../Theme/hooks'
const { colors } = useTheme()


const CustomFooter = props => {
  return (
    <View style={{ backgroundColor: Appearance.getColorScheme() === 'dark' ? '#383838' : '#FFFFFF' }}>
      <View style={styles.shadow}>
        <Grid>
          <Row>
            <CustomCol
              name="Today"
              navigation={props.props.navigation}
              RouteName="TodayScreen"
            />
            <CustomCol
              name="Time Clock"
              navigation={props.props.navigation}
              RouteName="TimeClock"
            />
            <CustomCol
              name="Timesheet"
              navigation={props.props.navigation}
              RouteName="TimeSheet"
            />
            {/* <CustomCol
            name="View"
            navigation={props.props.navigation}
            RouteName="TimesheetViewNew"
          /> */}
          </Row>
          <Row style={{ alignSelf: 'center', height: '40%' }}>
            <Footer />
          </Row>
        </Grid>
      </View>
    </View>
  );
};

export default CustomFooter;

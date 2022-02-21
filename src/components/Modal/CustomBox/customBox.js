import React, {useState} from 'react';
import {Text} from 'react-native';
// import styles from '../styles';
import {View, Grid, Row} from 'native-base';

import CustomPicker from '../CustomPicker/customPicker';

const CustomBox = props => {
  return (
    <View style={{flex: 2}}>
      <Grid>
        <Row>
          <Text
            style={{
              fontSize: 18,
              color: '#424e9c',
              fontFamily: 'Poppins-Medium',
            }}>
            {props.title}
          </Text>
        </Row>
        <Row>
          <CustomPicker
            data={props.data_is}
            status={props.title == 'Times' ? true : false}
            name="Start Time"
          />
        </Row>
        <Row style={{height: 5, backgroundColor: '#fff'}}></Row>
        <Row>
          <CustomPicker
            data={props.data_1}
            status={props.title == 'Times' ? true : false}
            name="End Time"
          />
        </Row>
        <Row style={{height: 5, backgroundColor: '#fff'}}></Row>
      </Grid>
    </View>
  );
};

export default CustomBox;

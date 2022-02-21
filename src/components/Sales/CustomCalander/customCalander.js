/* eslint-disable */
import React from 'react';
import styles from '../styles';
import { Col, Row, Text, Grid } from 'native-base';
import Moment from "moment"
import { Appearance } from 'react-native-appearance';
import { useTheme } from '../../../Theme/hooks'
import {helperFunctions} from "../../../_helpers";

const custom_Calander = props => {
    console.log(props)
  return (
    <Col
      style={{
        padding: 6,
        width: 70,
        height: 70,
        // borderBottomWidth: 2,
        borderBottomColor:
          props.others == true
            ? '#fff'
            : props.status == 'active'
              ? '#fff'
              : '#f1f0f5',
      }}>
      {props.calBool == true ? (
        <Grid
          style={{
            backgroundColor: props.status == 'active' ? '#fcbf24' : Appearance.getColorScheme() === 'dark' ? '#696969' : '#f1f0f5',

            borderRadius: 8,
            alignItems: 'center',
            padding: 5,
          }}>
          <Row>
            <Text style={[styles.block_text_content_day,
            {
              color: props.status == 'active' ?
                (Appearance.getColorScheme() === 'dark' ? '#bc1d4a' : 'black') : (Appearance.getColorScheme() === 'dark' ? 'white' : 'blue'),



              // props.status == 'active' ? Appearance.getColorScheme() === 'dark' ? 'red' : 'black' : "white"
            }
            ]}>

              {Moment(props.dayName).format("ddd")}
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: 13,
                color: helperFunctions.darkLightColor(),
                fontWeight: '400',
                fontFamily: 'Poppins-Medium',
              }}>
                {Moment(props.dayName).format('MMM')} {Moment(props.dayName).format('DD')}
            </Text>
          </Row>
        </Grid>
      ) : null}
    </Col>
  );
};

export default custom_Calander;

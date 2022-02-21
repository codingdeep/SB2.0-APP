/* eslint-disable */
import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import {helperFunctions} from "../../../_helpers";

const StopWatch = props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <Text
          style={{
            textAlign: 'center',
            color: helperFunctions.yellow(),
            fontFamily: 'Poppins-Medium',
          }}>
          {/* Today, May 14 */}
          {'Today, ' +
            moment(new Date()).format('MMM') +
            ' ' +
            moment(new Date()).format('DD')}
        </Text>
      </View>
      <View style={{ flex: 2}}>

        <Stopwatch lap
          startTime={props.startTime}
          start={props.start}
          // reset={this.state.stopwatchReset}
          options={options}
          getTime={props.getTime}
        />

      </View>
    </View>
  );
};

export default StopWatch;


const options = {
  container: {
    ...helperFunctions.assBg(),
    // padding: 5,
    // borderRadius: 5,
    // width: 220,
  },
  text: {
    textAlign: 'center',
    color: helperFunctions.darkLightColor(),
    fontFamily: 'Poppins-Medium',
    fontSize: 40,
  }
};

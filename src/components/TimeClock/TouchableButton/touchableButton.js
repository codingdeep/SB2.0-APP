/* eslint-disable */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {helperFunctions} from "../../../_helpers";

const TouchableButton = props => {
  console.log("TouchableButton", props)

  // disabled={true}
  const clock_action = useSelector(state => state.Clock.clock_action);
  return (
    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        disabled={!props.BreakON}
        onClick={() =>
            clock_action !== 2
            ? props.Timeron == false
            ? props.clockStop()
            : props.clockStart()
            : alert('Today Your Clocked Already Saved!')
        }
        onLongPress={() =>
          clock_action !== 2
            ? props.Timeron == false
              ? props.clockStop()
              : props.clockStart()
            : alert('Today Your Clocked Already Saved!')
        }
        style={{
          height: 227,
          width: 227,
          borderRadius: 227,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            props.Timeron == false ? '#F4F4F4' : 'rgba(66,78,156,0.12)',
        }}>
        <View
          style={props.Timeron == false ? {
            height: 149,
            width: 149,
            backgroundColor: '#A1A1A1',
            borderRadius: 149,
            justifyContent: 'center',
            alignItems: 'center',
          } :  {
              height: 149,
              width: 149,
              ...helperFunctions.themeBg(),
              borderRadius: 149,
              justifyContent: 'center',
              alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              opacity: 1,
              color: '#FFFFFF',
              textAlign: 'center',
            }}>
            CLOCK IN
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TouchableButton;

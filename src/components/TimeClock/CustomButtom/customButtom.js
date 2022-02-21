/* eslint-disable */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Label } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {helperFunctions} from "../../../_helpers";

const CustomButtom = props => {

  console.log("TouchableButton2", props)
  const dispatch = useDispatch();
  const clock_action = useSelector(state => state.Clock.clock_action);
  const breakButtom = useSelector(state => state.Clock.breakButtom);

  return (
    <View style={{ flex: 3, marginVertical: 10 }}>
        {props.Timeron == false && (
            <TouchableOpacity
                disabled={breakButtom}
                onPress={
                    () => props.BreakON ? props.onBreakStart() : props.onBreakStop()

                }
                style={{
                    width: 167,
                    height: 38,
                    justifyContent: 'center',
                    borderRadius: 20,
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderColor: helperFunctions.yellow(),
                    borderWidth: 2,
                }}>
                <Text style={{ color: helperFunctions.darkLightColor(), fontSize: 14 }}>
                    {props.BreakON ? 'Start Break' : 'End Break'}
                </Text>
            </TouchableOpacity>
        )}
        <Label />
      <TouchableOpacity
        disabled={!props.BreakON}
        onLongPress={() =>
          clock_action !== 2
            ? props.Timeron == false
              ? props.onButtonStop()
              : props.clockStart()
            : alert('Today Your Clocked Already Saved!')
        }
        style={{
          ...helperFunctions.themeBg(),
          width: 167,
          height: 38,
          justifyContent: 'center',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
          }}>
          {props.Timeron == false ? 'Clock Out' : 'Clock In'}
        </Text>
      </TouchableOpacity>



    </View>
  );
};

export default CustomButtom;

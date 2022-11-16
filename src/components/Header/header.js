/* eslint-disable */
import React, { Component } from 'react';
import { Body, Title, Button, Left, Right } from 'native-base';
import { StatusBar, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
// ...
const customHeader = props => {
  console.log(props);
  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20, height: 30 }}>
      <StatusBar hidden />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ width: '20%' }}>
          {props.Left != 'false' && (
            <Button transparent onPress={() => props.navigation.goBack()}>
              <View
                style={{
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {props.color ? (
                  <CusIconDesign
                    IconFrom="AntDesign"
                    name="arrowleft"
                    textAlign="right"
                    color={props.color}
                    size={25}
                  />
                ) : (
                  <CusIconDesign
                    IconFrom="AntDesign"
                    name="arrowleft"
                    textAlign="right"
                    color={props.color}
                    size={25}
                  />
                )}
              </View>
              {/* <Image source={require('../../Assets/ic-arrows-left.png')} /> */}
            </Button>
          )}
        </View>

        <View style={styles.headerBody}>
          {props.title && (
            <Title
              style={
                props.color
                  ? [styles.headerTitle, { color: props.color }]
                  : styles.headerTitle
              }>
              {props.title}
            </Title>
          )}
        </View>

        <View style={{ width: '20%' }}>
          <TouchableOpacity
            style={styles.right}
            onPress={() => props.onFunctionCall()}>
            {props.rightTitle && props.rightTitle != null && (
              <Title style={props.color ? [styles.textStyle, { color: props.color }] : styles.textStyle}>{props.rightTitle}</Title>
            )}
            {props.rightImg && (
              <CusIconDesign
                IconFrom="AntDesign"
                name="plus"
                textAlign="right"
                color={props.color}
                size={25}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default customHeader;

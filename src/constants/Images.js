import React from 'react';

import {Appearance} from 'react-native-appearance';
import {Image} from 'react-native';
import {helperFunctions} from '../_helpers';
const defaultMode = Appearance.getColorScheme() || 'light';
// export const tabBarIcons = {
//   Time: require('../Assets/tabBarimg/clock.png'),
//   Today: require('../Assets/tabBarimg/Vrstva_98.png'),
//   My_book: require('../Assets/tabBarimg/Vrstva_90.png'),
//   Clients: require('../Assets/tabBarimg/Vrstva_105.png'),
//   Sales: require('../Assets/tabBarimg/Layer.png'),
//   Chats: require('../Assets/tabBarimg/Vrstva_148.png'),
//   TodayScreen: require('../Assets/tabBarimg/Vrstva_98.png'),
//   TimeClock: require('../Assets/tabBarimg/clock.png'),
//   TimesheetView: require('../Assets/tabBarimg/ic-actions-emultiple-edit.png'),
//   TimesheetViewNew: require('../Assets/tabBarimg/map.jpg'),
// };

export const tabBarIcons = {
  Today:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/today-light.png')}
      />
    ) : (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/today-dark.png')}
      />
    ),
  My_book:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/book-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/book-dark.png')}
      />
    ),
  Chats:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-dark.png')}
      />
    ),
  Time:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/clock-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/clock-dark.png')}
      />
    ),
  Clients:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/client-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/client-dark.png')}
      />
    ),
  Sales:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/cart-light.png')}
      />
    ) : (
      <Image
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/cart-dark.png')}
      />
    ),
  TodayScreen:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-dark.png')}
      />
    ),
  Time_Clock:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/clock-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/clock-dark.png')}
      />
    ),
  Time_Sheet:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-dark.png')}
      />
    ),
  TimesheetViewNew:
    defaultMode === 'dark' ? (
      <Image
        resizeMode="contain"
        style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-light.png')}
      />
    ) : (
      <Image
          resizeMode="contain"
          style={{...helperFunctions.deviceWiseWidthHeight(30,30,35,40)}}
        source={require('../Assets/tabBarimg/chat-dark.png')}
      />
    ),
};

//
// export const tabBarNewIcons = {
//   Time: {
//     name: "clockcircleo",
//     iconFrom: "AntDesign"
//   },
//   Today: {
//     name: "calendar",
//     iconFrom: "AntDesign"
//   },
//   My_book: {
//     name: "bookmark",
//     iconFrom: "Feather"
//   },
//   Clients: {
//     name: "user",
//     iconFrom: "AntDesign"
//   },
//   Sales: {
//     name: "bank",
//     iconFrom: "AntDesign"
//   },
//   Chats: {
//     name: "message-square",
//     iconFrom: "Feather"
//   },
//   TodayScreen: {
//     name: "calendar",
//     iconFrom: "AntDesign"
//   },
//   TimeClock: {
//     name: "clock",
//     iconFrom: "EvilIcons"
//   },
//   TimesheetView: {
//     name: "clock",
//     iconFrom: "EvilIcons"
//   },
//   TimesheetViewNew: {
//     name: "clock",
//     iconFrom: "EvilIcons"
//   },
// };

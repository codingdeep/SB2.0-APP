import React, { useState } from 'react';
import { View } from 'react-native';
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
const cusFooter = () => {
  return (
    <View
      style={{

        backgroundColor: colors.bottomBorderColor,
        width: "50%",
        height: 5,
        borderRadius: 5,
      }}
    />
  );
};

export default cusFooter;

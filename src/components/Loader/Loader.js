import React from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { useTheme } from '../../Theme/hooks'
import { Appearance } from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
const { colors } = useTheme()


const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <StatusBar hidden />
      <ActivityIndicator size="large" color={defaultMode === 'dark' ? '#ffffff' : "#0000ff"} />
    </View>
  );
};

export default Loader;

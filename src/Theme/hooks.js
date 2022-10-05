import {useColorScheme, Appearance} from 'react-native-appearance';
import {themedColors} from '.';

export const useTheme = () => {
  // const theme = useColorScheme()
  const theme = Appearance.getColorScheme();
  let colors = theme ? themedColors[theme] : themedColors.default;
  colors = colors ? colors : {};
  return {
    colors,
    theme,
  };
};

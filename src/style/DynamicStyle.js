import { DynamicStyleSheet, DynamicValue, useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode'
import { useColorScheme } from 'react-native-appearance'




import AsyncStorage from '@react-native-community/async-storage';

const DynamicStyle = async props => {
    const isDarkMode = useDarkMode()
    console.log("isDarkMode", isDarkMode);

    const dynamicStyles = new DynamicStyleSheet({
        container: {
            backgroundColor: new DynamicValue('white', 'black'),
            flex: 1,
        },
        text: {
            color: new DynamicValue('black', 'white'),
            textAlign: 'center',
        },
    })
    return dynamicStyles;
};

export default DynamicStyle;

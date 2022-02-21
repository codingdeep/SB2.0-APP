import AsyncStorage from '@react-native-community/async-storage';

const RemoveLocalStorage = async props => {
    const value = await AsyncStorage.getAllKeys();
    console.log("valuevalue", value);

    return {}
};

export default RemoveLocalStorage;

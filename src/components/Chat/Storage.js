import {AsyncStorage} from 'react-native';

export const getMessageTimestamp = async (threadId) => {
  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(
        `@message:thread:timestamp:${threadId}`,
      );
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
    return null;
  };
  return await _retrieveData();
};

export const setMessageTimestamp = (threadId, time) => {
  let _storeData = async () => {
    try {
      await AsyncStorage.setItem(`@message:thread:timestamp:${threadId}`, time);
    } catch (error) {
      // console.log('timeMsg3', error);
    }
  };
  _storeData();
};

import AsyncStorage from '@react-native-community/async-storage';

const authHeader = async props => {
  const value = await AsyncStorage.getItem('UserSessionData');

  // return authorization header with token
  let sessionData = await value;
  sessionData = JSON.parse(sessionData);
  // console.log("sessionDatasessionData", sessionData);

  if (sessionData && sessionData.sessionId) {
    return {
      'X-Auth-Token': sessionData.sessionId,
      'Content-Type': 'application/json',
      'X-Xsrf-Token': sessionData._csrf,
      'X-Requested-With': 'XMLHttpRequest',
    };
  } else {
    return {};
  }
};

export default authHeader;

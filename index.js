import React, {Component, useEffect} from 'react';
import {AppRegistry, Alert, Vibration} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
// import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotificationSchedule({
    title: 'kkkk',
    message: 'hhh', // (required)
    date: new Date(Date.now() + 1 * 1000), // in 60 secs
  });
});

function HeadlessCheck({isHeadless}) {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //console.log(remoteMessage);

      PushNotification.localNotificationSchedule({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body, // (required)
        date: new Date(Date.now() + 1 * 1000), // in 60 secs
      });

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  if (isHeadless) {
    messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    // messageListener()
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

// function App() {
//     // Your application

// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     // console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => HeadlessCheck);

// AppRegistry.registerHeadlessTask("Notification", () => notification);

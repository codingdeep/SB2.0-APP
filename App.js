/* eslint-disable */

import React, {Component, useEffect} from 'react';
import {Alert, PermissionsAndroid, Vibration} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';
import AsyncStorage from '@react-native-community/async-storage';
import Route from './src/Route';
import Loader from './src/components/Loader/Loader';
import ChatComponent from './src/components/Chat/ChatComponent';
import {Root} from "native-base";
import messaging from '@react-native-firebase/messaging';
import {SaveTokenToServer} from './src/Redux/SagaActions/ProfileSagaAction';
import PushNotification from 'react-native-push-notification';
import iid from '@react-native-firebase/iid';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import RNRestart from 'react-native-restart';
import NewAppReload from "./src/components/MyBook/NewAppReload";
import {
    AppearanceProvider,
    Appearance,
    useColorScheme,
} from 'react-native-appearance';

let chat = () => {
};
let apptReload = () => {

}

/*
*
* alias: sb-staff-uploads
* key_store: sb-staff-uploads
* keystorepass:silverbird
*
* */

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            loading: true,
        };
    }

    _LogStatusCheker = async () => {
        try {


            const LogInFirstTime = await AsyncStorage.getItem('LogInFirstTime');
            await AsyncStorage.removeItem('LogInFirstTime');

            const value = await AsyncStorage.getItem('User@Data');

            console.log('VALUE', value);
            if (value !== null) {

                let data = JSON.parse(value);
                console.log("kkkkhhhhh", data);

                data.logStatus == true
                    ? this.setState({
                        status: true,
                        loading: false,
                    })
                    : this.setState({
                        status: false,
                        loading: false,
                    });
            } else {
                this.setState({
                    status: false,
                    loading: false,
                });
            }
        } catch (error) {
            // Error saving data
        }
    };

    componentDidMount = async () => {
        // this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
        //   this.setState({ colorscheme: colorScheme });
        // });


        // eslint-disable-next-line no-unreachable
        this._LogStatusCheker();
        SplashScreen.hide();

        this.requestCameraPermission()
    };

    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "SB Staff App Camera Permission",
                        message:
                            "SB Staff App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.requestPermissions();
                    console.log("You can use the camera");
                } else {
                    this.requestPermissions();
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        }

    };


    requestPermissions = async () => {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
            // this.getCurrentLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Device current location permission',
                        message: 'Allow app to get your current location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
            } catch (err) {
                console.warn(err);
            }
        }
    };

    componentWillUnmount() {
    }

    messageListener = async () => {
        this.notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                const {title, body} = notification;
                this.showAlert(title, body);
            });

        this.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened(notificationOpen => {
                const {title, body} = notificationOpen.notification;
                this.showAlert(title, body);
            });

        const notificationOpen = await firebase
            .notifications()
            .getInitialNotification();
        if (notificationOpen) {
            const {title, body} = notificationOpen.notification;
            this.showAlert(title, body);
        }

        this.messageListener = firebase.messaging().onMessage(message => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(message));
            console.log(JSON.stringify(message));
        });
    };

    showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
        );
    };

    getChat = () => {
        return chat();
    };

    setChat = _chat => {
        chat = _chat;
    };
    getApptEventListener = () => {
        return apptReload()
    }
    setApptEventListener = (_apptReload) => {

        apptReload = _apptReload
    }

    showAlert(title, body) {
        // Alert.alert(
        //   title,
        //   body,
        //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        //   { cancelable: false },
        // );
    }


    render() {
        let colorScheme = Appearance.getColorScheme();
        console.log(apptReload())

        return this.state.loading == true ? (
            <Loader/>
        ) : (
            // <AppearanceProvider>
            <Provider store={store}>
                <ChatComponent setChat={this.setChat}>
                    <NewAppReload reloadAppData={this.setApptEventListener}>
                        <Route status={this.state.status} getChat={this.getChat}
                               getAppt={this.getApptEventListener}/>
                    </NewAppReload>
                </ChatComponent>
            </Provider>
            // </AppearanceProvider>
        );
    }
}
const messaging1 = messaging();

messaging1
    .hasPermission()
    .then(enabled => {


        // messaging()
        //   .subscribeToTopic('weather')
        //   .then(() => console.log('Subscribed to topic!'));


        console.log('tokentoken00', enabled);
        if (enabled) {
            // const fcmToken = ReturnFcmToken();
            console.log('tokentoken', "hhhhhh");


            messaging1
                .getToken()
                .then(token => {
                    console.log('tokentoken', token);
                })
                .catch(error => {
                    console.log('tokentokeneeee', error);
                    /* handle error */
                });
        } else {
            // const fcmToken = ReturnFcmToken();
            console.log('tokentokenElse', "dddd");
            messaging1
                .requestPermission()
                .then(() => {
                    /* got permission */
                })
                .catch(error => {
                    /* handle error */
                });
        }
    })
    .catch(error => {
        /* handle error */
    });


PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('notification1', notification);
        console.log('NOTIFICATION:', notification);
        if (notification.title == "Appointment CheckIn") {
            console.log("remoteMessage", notification);
            Vibration.vibrate()
        }
        //console.log(apptReload().getRetrive())
        if (notification.data != null && notification.data.bookedTime != null && apptReload() != null && apptReload().getRetrive() != null) {
            console.log('wedsfsdf', apptReload().getRetrive())
            apptReload().getRetrive()(
                notification.data
            );
        }


        if (notification.type && notification.type == 'chat') {
            console.log('MESSAGEEEEEE', chat().getOnNewMessageThreadListner);

            if (chat().getOnNewMessageThreadListner() != null) {
                chat().getOnNewMessageThreadListner()(
                    notification.threadId,
                    JSON.parse(notification.message_body),
                );
            }
            if (chat().getOnNewMessageThreadListListner() != null) {
                chat().getOnNewMessageThreadListListner()(
                    notification.threadId,
                    JSON.parse(notification.message_body),
                );
            }
        }

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    //senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

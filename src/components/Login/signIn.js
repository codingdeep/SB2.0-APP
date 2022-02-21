/* eslint-disable */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Content, Form, Item, Input, Icon, Button } from 'native-base';
import { helperFunctions } from "../../_helpers";
import bg from '../../Assets/sm.jpeg'
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { Log_in_checker } from "../../Redux/Action/LogIn";
import CusIconDesign from "../../Assets/Icon/IconAntDesign";
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from "react-redux";
import { backgroundColor } from 'react-native-calendars/src/style';
import TouchableButton from '../TimeClock/TouchableButton/touchableButton';
const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate, concat
} = Animated;


function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
        rubel: ''

    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.buttonOpacity = new Value(1);
        this.state = {
            salon_id: '',
            // salon_id: '3',
            user_name: '',
            // user_name: 'mahedi0018@gmail.com',
            password: '',
            // password: 'cloud9',
            loader: false,
            secureTextEntry: true
        };

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>

                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),

                        )
                    ])

            }

        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 2.5, 0],
            extrapolate: Extrapolate.CLAMP
        })
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, - 1],
            extrapolate: Extrapolate.CLAMP
        })
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 100],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });

    }

    _Login() {
        // await AsyncStorage.setItem(
        //   'LogInFirstTime',
        //   JSON.stringify("LogInFirstTime"))

        this.setState({
            loader: true,
        });


        if (
            this.state.salon_id == '' ||
            this.state.user_name == '' ||
            this.state.password == ''
        ) {
            this.setState({
                loader: false,
            });
            Alert.alert('Please fill input box and try again!');
        } else {
            this.props.dispatch(
                Log_in_checker(
                    this.state.salon_id + '_' + this.state.user_name,
                    this.state.password,
                    false,
                    this.props.navigation,
                ),
            );
        }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log("errorMsg", props.errorMsg)
        // props.errorMsg !== '' ? Alert.alert(props.errorMsg) : null;

        return {
            loader: props.loader,
        };
    }



    render() {


        return (
            <Container>

                <View style={styles.container}>

                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <Image style={{ flex: 1, width: null, height: null }} source={require('../../Assets/sm3.jpg')} />
                    </Animated.View>

                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} >
                        <View style={{ height: height / 2.5, width: width }}

                        >
                            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }], backgroundColor: 'rgba(255,255,255,.5)', borderColor: 'white', borderWidth: 1 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>SIGN IN</Text>
                                </Animated.View>
                            </TapGestureHandler>
                            {/*<TapGestureHandler onHandlerStateChange={this.onStateChange}>*/}
                            {/*<Animated.View style={[styles.button,{marginVertical: 10,...helperFunctions.themeBg(),opacity: this.buttonOpacity,transform:[{translateY: this.buttonY}]}]}>*/}
                            {/*    <Text style={{fontSize: 20,fontWeight: 'bold',color: '#FFFFFF'}}>FORGET PASSWORD</Text>*/}
                            {/*</Animated.View>*/}
                            {/*</TapGestureHandler>*/}

                            <Animated.View style={{ height: height / 2.5, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center', zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform: [{ translateY: this.textInputY }], ...helperFunctions.lightDarkBg() }}>
                                <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                    <Animated.View style={{ ...styles.closeButton, ...helperFunctions.whiteToDark() }}>
                                        <Animated.Text style={{ fontSize: 16, color: 'red', transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>X</Animated.Text>
                                    </Animated.View>
                                </TapGestureHandler>
                                <Item regular style={{ ...styles.textInput, ...helperFunctions.lightDarkBg(), borderBottomColor: helperFunctions.lightAss() }}>
                                    <Input
                                        style={{ color: helperFunctions.darkLightColor() }}
                                        placeholder="Salon ID"
                                        placeholderTextColor="#B9B9B9"
                                        value={this.state.salon_id}

                                        onChangeText={e => this.setState({ salon_id: e })}
                                    />
                                    <Feather name="check-circle" color="#999999" size={20} />

                                    {/* <Thumbnail square small source={} /> */}
                                </Item>
                                <Item regular style={{ ...styles.textInput, ...helperFunctions.lightDarkBg(), borderBottomColor: helperFunctions.lightAss() }}>

                                    <Input
                                        style={{ color: helperFunctions.darkLightColor() }}
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholder="Username"
                                        placeholderTextColor="#B9B9B9"
                                        value={this.state.user_name}
                                        onChangeText={e => this.setState({ user_name: e })}
                                    />

                                    <CusIconDesign
                                        // style={{ width: "20%" }}
                                        IconFrom="AntDesign"
                                        name="user"
                                        textAlign="right"
                                        color='#999999'
                                        size={20}
                                    />
                                </Item>
                                <Item regular style={{ ...styles.textInput, ...helperFunctions.lightDarkBg(), borderBottomColor: helperFunctions.lightAss() }}>
                                    <Input
                                        style={{ color: helperFunctions.darkLightColor() }}
                                        placeholder="Password"
                                        secureTextEntry={this.state.secureTextEntry}
                                        placeholderTextColor="#B9B9B9"
                                        value={this.state.password}
                                        onChangeText={e => this.setState({ password: e })}
                                    />
                                    <TouchableWithoutFeedback onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                                        <Feather name={this.state.secureTextEntry === true ? "eye-off" : "eye"} color={this.state.secureTextEntry === true ? "grey" : helperFunctions.yellow()} size={20} />
                                    </TouchableWithoutFeedback>
                                </Item>
                                <View style={{ height: 10 }}></View>
                                <Animated.View style={{ ...styles.button, ...helperFunctions.lightDarkBg() }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this._Login()}
                                        style={{
                                            height: 55,
                                            ...helperFunctions.lightDarkBg(),
                                            justifyContent: 'center',
                                            width: '100%',
                                        }}>
                                        {this.state.loader == true ? (
                                            <ActivityIndicator size="small" color="#999" />
                                        ) : (
                                                <Text
                                                    style={{
                                                        color: helperFunctions.darkLightColor(),
                                                        fontSize: 20,
                                                        fontWeight: '700',
                                                        width: '100%',
                                                        textAlign: 'center',
                                                    }}>
                                                    SIGN IN
                                        </Text>
                                            )}
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                            </Animated.View>

                        </View>
                    </KeyboardAvoidingView>

                </View>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-end'
    },
    button: {
        ...helperFunctions.deviceWiseHeight(50, 50, 60, 60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        ...helperFunctions.deviceWiseWidth(300, 300, 250, 250),
        alignSelf: 'center',



    },
    closeButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    textInput: {
        height: 55,
        borderBottomWidth: 0.5,
        marginHorizontal: 30,
        paddingLeft: 5,
        paddingRight: 5,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#fff',
        marginLeft: 30,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    }
})
const mapStateProps = state => {
    const loader = state.LoggedData.loader;
    const errorMsg = state.LoggedData.errorMsg;
    return {
        errorMsg,
        loader,
    };
};
export default connect(mapStateProps)(SignIn)


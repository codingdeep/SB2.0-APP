/* eslint-disable */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Image, View, Dimensions } from 'react-native';
import {
    Container,
    Thumbnail,
    Header,
    Content,
    Form,
    Item,
    Input,
} from 'native-base';

import { StatusBar } from 'react-native';
// ...
const { width, height } = Dimensions.get('window')
const SplashScreen = () => {
    return (
        <Container>
            <StatusBar hidden />
            <View style={{ width: width, height: height }}>
            </View>

            {/*<ImageBackground*/}
            {/*    resizeMode={'stretch'}*/}
            {/*    style={{ flex: 1 }}*/}
            {/*    source={require('../../Assets/Splash.png')}*/}
            {/*/>*/}
        </Container>
    )

}
export default SplashScreen;

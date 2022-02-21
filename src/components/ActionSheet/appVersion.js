/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native';

import { helperFunctions } from '../../_helpers';


const { width, height } = Dimensions.get('window');
const AppVersion = ({ translateY, zIndex, hideInfo }) => {


    const hideAppVersion = () => {
        hideInfo()
    }


    return (
        <Fragment>

            <TouchableWithoutFeedback onPress={hideAppVersion}><Animated.View style={{
                backgroundColor: 'rgba(0,0,0,.0)',
                ...StyleSheet.absoluteFill,
                zIndex: zIndex
            }}></Animated.View>
            </TouchableWithoutFeedback>


            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: translateY }] }]}>
                <View style={{ height: 20 }} />
                <View style={{ borderWidth: 1, borderColor: 'white', padding: 15, borderRadius: 100 }}>
                    <Image resizeMode="contain" style={{ width: 70, height: 70 }} source={require('../../Assets/sb.png')} />
                </View>
                <View style={{ height: 10 }} />
                <View>
                    <Text style={{ color: '#fff', fontSize: 25 }}>Silverbird Staff</Text>
                    <Text style={{ color: '#fff', ...helperFunctions.textSize() }}>Version: v1.1.6</Text>
                </View>

            </Animated.View>

        </Fragment>
    );
};
const Styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: width - 3,
        height: 300,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        marginHorizontal: 1.5,
        backgroundColor: '#999',
        zIndex: 1
    },
});

export default AppVersion;





/* eslint-disable */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native'
import Animated from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo'
import {helperFunctions} from "../../_helpers";

const Action = ({icon}) => {
    return(
        <Animated.View>
            <Entypo color={icon=='edit' ? '#1c76a4' : icon == 'arrow-down' ? '#2babe3' : icon == 'arrow-up' ? '#53e69d' : '#ff7676'} size={20} name={icon}/>
        </Animated.View>
    )
}

export default Action

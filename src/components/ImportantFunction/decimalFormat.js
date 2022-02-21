import React, { useState } from "react";
import { Button, View, Text } from "react-native";

const DecimalFormat = (props) => {
    console.log("showPicker", props);
    const str = props.price;

    const price = str.split('$');
    // console.log("wordswordswords", words);
    return (
        <View>
            <Text style={{
                color: props.color,
                fontFamily: props.fontFamily,
                fontSize: props.fontSize,
                fontWeight: props.fontWeight,
            }}>
                {price[0] + ' $' + parseFloat(price[1]).toFixed(1)}
            </Text>
        </View>
    );
};

export default DecimalFormat;




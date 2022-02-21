import React, { useState } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";

const refreshFooter = (props) => {


    if (!props.loading) return null;

    return (
        <View
            style={{
                paddingVertical: 20,
                // borderTopWidth: 1,
                // borderColor: "#CED0CE"
            }}
        >
            <ActivityIndicator animating size="large" />
        </View>
    );
};

export default refreshFooter;




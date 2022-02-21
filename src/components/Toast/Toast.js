import Toast from 'react-native-root-toast';
import React, { Component } from 'react-native';


export const toast = (message, position) => {
    console.log("toast", message);

    // return (
    //     <Toast
    //         visible={true}
    //         position={50}
    //         shadow={false}
    //         animation={false}
    //         hideOnPress={true}
    //     >{message}</Toast>
    // );

    Toast.show(message, {
        duration: Toast.durations.LONG,
        backgroundColor: position == "TOP" ? "red" : "black",
        position: position == "TOP" ? Toast.positions.TOP : Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        opacity: .8,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
    });
}
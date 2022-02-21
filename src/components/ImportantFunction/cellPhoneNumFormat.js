import React, { useState } from "react";
import { TextMask } from 'react-native-masked-text'
import { Button, View } from "react-native";


const CellPhoneNumFormat = (props) => {

    // const [isDatePickerVisible, setDatePickerVisibility] = useState(props.showPicker);

    return (

        <View>
            <TextMask
                value={props.mobileNumber}
                type={'cel-phone'}
                options={{
                    maskType: 'INTERNATIONAL',
                    withDDD: true,
                    dddMask: '(99)'
                }}
                style={{
                    color: props.color,
                    // fontFamily: 'Poppins-Light',
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight,
                    // fontWeight: '400',

                    fontFamily: props.fontFamily,
                }}
            />
        </View>

    );
};

export default CellPhoneNumFormat;




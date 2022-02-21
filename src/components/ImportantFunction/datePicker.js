import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {helperFunctions} from '../../_helpers';

const CustomDateTimePicker = (props) => {



    const [isDatePickerVisible, setDatePickerVisibility] = useState(props.showPicker);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        props.onCancleDatePicker()
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        props.setTime(null, date)
        hideDatePicker();
    };

    return (

        <View>
            {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
            <DateTimePickerModal
                style={{...helperFunctions.lightDarkBg()}}
                isVisible={isDatePickerVisible}
                is24Hour={false}
                mode={props.mode}
                display="default"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default CustomDateTimePicker;

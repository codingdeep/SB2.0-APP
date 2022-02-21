import React from 'react';
import styles from '../styles';
import { Col, Row, Text, Left, Right } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Moment from "moment"
import { GetSalesData } from '../../../Redux/Action/SalesAction';

const _onSelectedApiCall = (startDay, endDay,props) => {

   props.dispatch(
        GetSalesData(this.props.StoreLocationInfo, this.props.navigation, startDay, endDay),
    )
    this.anotherFunc();
}


const timeButton = props => {
    return (
        <TouchableOpacity
        // onPress={_onSelectedApiCall(props.startDay, props.endDay,props)}
            style={{ backgroundColor: "#F1F0F5", width: "45%", justifyContent: "center", alignItems: "center", borderRadius: 10, marginVertical: 5 }}
        >
            <Text>{props.name}</Text>
        </TouchableOpacity>
    );
};

export default timeButton;

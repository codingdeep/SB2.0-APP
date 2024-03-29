import React, { Component } from 'react';
import {
    Container,
    Left,
    Body,
    Card,
    CardItem,
    Content,
    Row,
    Label,
} from 'native-base';

import {

    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from "./styles";
import Moment from "moment"
import ImagePicker from 'react-native-image-picker';
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()



const Schedule = props => {


    const { value } = props
    return (
        <View style={{}}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text style={{ fontSize: 14, color: colors.textColor }}>

                        {Moment(value.start).format("hh:mm A")}
                    </Text>
                </View>
            </View>

            <Card >
                <CardItem style={{ backgroundColor: "#FCBF24", height: 78 }}>
                    <Left>

                        <Body>
                            <Text style={{ fontSize: 14, color: "#0E1317" }}>
                                {Moment(value.start).format("hh:mm A")} -   {Moment(value.end).format("hh:mm A")}
                            </Text>


                            <Row style={{ justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                                    {value.title}
                                </Text>
                                {value.status != "Checked Out" && (
                                    <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                                        {value.status}
                                    </Text>
                                )}

                            </Row>

                        </Body>
                    </Left>
                </CardItem>


            </Card>
        </View>

    );
}

export default Schedule;

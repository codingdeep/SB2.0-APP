import React from 'react';
import styles from '../styles';
import { Col, Row, Text, Left, Right, View } from 'native-base';
import Moment from "moment"
import { useTheme } from '../../../Theme/hooks'
const { colors } = useTheme()

const custom_Col_Header = props => {
    console.log("entries999999", props)
    return props.servicePrice || props.period ? (
        <View>
            <Row
                style={{
                    bottomBorderColor: !props.name ? (props.status == 'active' ? colors.borderBottomColor : '#fff') : '#fff',
                    borderBottomWidth: props.name ? 0 : 2,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50
                }}>
                {props.period && (
                    <Col style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={styles.block_text_header}>
                            {Moment(props.period).format("hh:mm A")}
                        </Text>
                    </Col>
                )
                }
                {props.name && (
                    <Col style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={styles.block_text_header}>
                            {props.name}
                        </Text>
                    </Col>
                )
                }


                {props.serviceName && (
                    <Col style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={styles.block_text_content}>
                            {props.serviceName}
                        </Text>
                    </Col>
                )
                }

                {props && props.servicePrice && (
                    <Col style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={styles.block_text_content}>
                            {props.servicePrice.toFixed(2)}
                        </Text>
                    </Col>
                )
                }



            </Row>
        </View>
    ) : null;
};

export default custom_Col_Header;

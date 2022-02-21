import React, { useState } from 'react';
import { View, Col, Row, Label } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, TouchableOpacity, Platform } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
var moment = require('moment');

class CusTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      time: moment().format('hh:mm a'),
    };
  }


  render() {
    const onChange = (event, selectedDate) => {
      console.log("selectedDate", selectedDate)
      const currentDate = selectedDate || date;

      setDate(currentDate);
      setShow(Platform.OS === 'ios' ? true : false);
    };
    return (
      <Row style={{ marginBottom: 20 }}>
        <Col style={{ alignSelf: 'center' }}>
          <Text
            style={{
              color: '#0e1317',
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
              paddingLeft: 2,
            }}>
            {this.props.titleName}
          </Text>
        </Col>
        <Col style={{ alignItems: 'flex-end', alignSelf: 'center' }}>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#f1f0f5',
                padding: 5,
                borderRadius: 8,
                flexDirection: 'row',
              }}
              onPress={() =>
                this.setState({
                  show: true,
                })
              }>
              <Text
                style={{
                  color: '#0e1317',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  paddingLeft: 2,
                }}>
                {this.state.time.toString()}
              </Text>
              <Icons
                name="down"
                style={{
                  color: '#424e9c',
                  marginLeft: 10,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}
              />
            </TouchableOpacity>
          </View>
        </Col>
        {this.state.show && (

          <DateTimePicker
            value={this.props.Time}
            mode={this.props.mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          // onChange={(event, time) =>
          //   this.setState({
          //     time: moment(event.nativeEvent.timestamp).format('hh:mm a'),
          //   })
          // }
          />
        )}
      </Row>
    );
  }
}

export default CusTimePicker;

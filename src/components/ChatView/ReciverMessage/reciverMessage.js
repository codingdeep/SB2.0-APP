import React, { useState } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { Grid, Row, Col, Left, Right, Label } from 'native-base';

const ReciverMessage = props => {
  console.log("ReciverMessage", props);

  return (
    <View style={{ flex: 0.7 }}>
      <Grid>
        <Col>
          <Row style={{ alignSelf: 'flex-start' }}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: '#424E9C',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: props.message.createUser.imageUrl }}
                style={{ width: 35, height: 35 }} />
            </View>
          </Row>
          <Row></Row>
        </Col>
        <Col style={{ width: '88%' }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#F1F0F5',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>
              {props.message.body}
            </Text>
          </View>
        </Col>
      </Grid>
    </View>

  );
};

export default ReciverMessage;

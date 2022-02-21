import React, { useState } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { Grid, Row, Col, Left, Right, Label } from 'native-base';

const SenderMessage = props => {
  console.log("ReciverMessageSender", props.message.createUser.imageUrl);

  return (


    <View style={{ flex: 1 }}>
      <Grid>
        <Row>
          <Col style={{ width: '88%' }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#424E9C',
                padding: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  textAlign: 'left',
                  color: '#FFF',
                }}>
                {props.message.body}
              </Text>
            </View>
          </Col>

          <Col>
            <Row style={{ alignSelf: 'flex-end' }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: '#424E9C',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: props.message.createUser.imageUrl }}
                  style={{ width: 100, height: 35 }}
                />
              </View>
            </Row>
            <Row></Row>
          </Col>
        </Row>
      </Grid>
    </View>

  );
};

export default SenderMessage;

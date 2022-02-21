import React from 'react';
import { Image, TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { Col, Row, Container, Grid } from 'native-base';
import styles from '../styles';

const CustomHeaderRow = props => {
  console.log('props', props);
  return (
    <View
      style={{
        // flex: 0.3,
        height: 50,
        paddingLeft: 35,
        paddingRight: 35,
      }}>
      <Grid>
        <Row>
          <Col style={{ width: '40%' }}>
            <Text style={styles.timeText}>
              {props.time}
            </Text>
          </Col>
          {props.showIcon == true ? (
            <Col
              style={{
                width: 20,
                alignItems: 'center',
              }}>
              <Row
                style={{
                  height: 17,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 17 / 2,
                    width: 17,
                    height: 17,
                    backgroundColor: '#424E9C',
                  }}
                // onPress={() => alert('Yaay!')}
                />
              </Row>
              <Row>
                <View
                  style={{
                    backgroundColor: '#F1F0F5',
                    height: '100%',
                    width: 2,
                  }}
                />
              </Row>
            </Col>
          ) : (
              ///When not active Icon not showing
              <Col
                style={{
                  width: 20,
                  alignItems: 'center',
                }}>
                <Row>
                  <View
                    style={{
                      backgroundColor: '#F1F0F5',
                      height: '100%',
                      width: 2,
                    }}
                  />
                </Row>
                <Row>
                  <TouchableOpacity
                    style={{
                      borderRadius: 14 / 2,
                      width: 14,
                      height: 14,
                      backgroundColor: '#f1f0f5',
                    }}
                  // onPress={() => alert('Yaay!')}
                  />
                </Row>
                <Row>
                  <View
                    style={{
                      backgroundColor: '#F1F0F5',
                      height: '100%',
                      width: 2,
                    }}
                  />
                </Row>
              </Col>
            )}
          <Col style={{ paddingLeft: 10 }}>
            <Text style={styles.timeText}>
              {props.value}
            </Text>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

export default CustomHeaderRow;

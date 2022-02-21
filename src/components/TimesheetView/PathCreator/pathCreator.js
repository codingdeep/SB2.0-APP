import React from 'react';
import { Image, TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { Col, Row, Container, Grid } from 'native-base';
import styles from '../styles';

const PathCreator = props => {
  return (
    <View style={{ flex: props.value, paddingLeft: 35, paddingRight: 35 }}>
      <Grid>
        <Row>
          <Col style={{ width: '40%' }}></Col>
          <Col
            style={{
              width: 20,
              alignItems: 'center',
            }}>
            <View style={styles.PathCreator} />
          </Col>
          <Col style={{ paddingLeft: 10 }}>
            <Row>
              {props.subMenu == true ? (
                <Text style={styles.NormalText_12}>
                  {/* 1440 Santa Cruz Ave,Menlo Park */}
                </Text>
              ) : null}
            </Row>
            <Row></Row>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

export default PathCreator;

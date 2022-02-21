import React from 'react';
import { connect } from 'react-redux';
import { Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { Container, View, Grid, Row, Col, Picker } from 'native-base';
import RsponsiveImage from '../../Profile/ResponsiveImage/responsiveImage';
import Moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign';
import * as Animatable from "react-native-animatable";
import {helperFunctions} from "../../../_helpers";

const Customblock = props => {


  const data = props;
  let viewData = (value) => {
    return (
      <Animatable.View animation={props.index%2 == 0 ? "fadeInLeft" : "fadeInRight"} style={{ flex: 1 }}>
        <Grid>
          <Row>
            <Col
              style={{
                width: '20%',
              }}>
              <RsponsiveImage
                setMode="pro"
                link={
                  value.createUser.imageUrl ? value.createUser.imageUrl : null
                }
              />
            </Col>
            <Col style={{ width: 10 }}></Col>
            <Col>
              <View style={{ flex: 1 }}>
                <View style={{ paddingTop: 5 }}>
                  <Row>
                    <Col>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                            ...helperFunctions.textSize(),
                            ...helperFunctions.textBlack(),
                            ...helperFunctions.darkLightColor()
                        }}>
                        {value.createUser.names.first +
                          ' ' +
                          value.createUser.names.last}
                      </Text>
                    </Col>
                    <Col>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                            ...helperFunctions.yellowColor(),
                            ...helperFunctions.smallFont(),
                          textAlign: 'right',
                        }}>
                        {value.readableCreateTime}

                      </Text>
                    </Col>
                  </Row>
                </View>
                <Col>
                  <Row>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                          ...helperFunctions.assColor(),
                          ...helperFunctions.textSize()
                      }}>
                      {value.message}
                    </Text>
                  </Row>
                  <Row>
                    <Text
                      style={{
                          ...helperFunctions.smallFont(),
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'left',
                         color: '#999'
                      }}>
                      {Moment(value.createdTime).format('MMM DD')} at {''}
                      {Moment(value.createdTime).format('hh:mm a')}
                    </Text>
                  </Row>
                </Col>
              </View>
            </Col>
          </Row>
          <View
            style={{
              borderBottomColor: '#f1f0f5',
              borderBottomWidth: 2,
              marginHorizontal: 5,
              marginVertical: 10,
            }}></View>
        </Grid>
      </Animatable.View>
    );
  };
  return viewData(data);
};

export default Customblock;

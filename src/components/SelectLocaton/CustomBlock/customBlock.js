import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Image, Dimensions } from 'react-native';
import styles from '../styles';
import { View, Grid, Row } from 'native-base';
import {helperFunctions} from "../../../_helpers";
const screenHeight = Math.round(Dimensions.get('window').height);
const customBlock = props => {
  console.log("propspropsprops", props);

  const IMGLINK =
    props.imageLink == 'img_1.png'
      ? require('../../../Assets/Select_Location/img_1.png')
      : require('../../../Assets/Select_Location/img_2.png');

  return (
    <View style={{ flex: 3, marginHorizontal: 40 }}>
      <View
        style={{
          flex: 0.9,
        }}>
        <Grid>
          <Row>
            <Text style={{...styles.Custom_Row_Text,color: helperFunctions.yellow()}}>{props.title}</Text>
          </Row>
          <Row>
            <Text style={{...styles.Custom_Row_Text_content, color: helperFunctions.yellow()}}>{props.content}</Text>
          </Row>
        </Grid>
      </View>
      <View style={{ height: 10 }} />
      <View style={{ height: screenHeight / 3, width: "100%" }}>
        <Image source={{ uri: props.imageLink }} style={styles.Custom_Row_Image} />
      </View>
    </View>
  );
};

export default customBlock;

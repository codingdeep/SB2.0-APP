import React from 'react';
import { Text, View } from 'react-native';
import { Row, List, Col } from 'native-base';
import styles from '../styles';
const formatMobileNumber = (number) => {
  let firstThree = number.toString().substring(0, 3);
  let middleThree = number.toString().substring(3, 6);
  let remainderNumber = number.toString().substring(6, number.toString().length);
  return firstThree + '-' + middleThree + '-' + remainderNumber
}
const normalContentText = props => {
  return (

    <Text
      style={props.token == 1 || props.token == 5 ? styles.content_txt : props.token == 4 ? [styles.content_txt,{color:'red'}] : styles.normal_14_text}>
      {props.token == 5 ? formatMobileNumber(props.name) : props.name}
    </Text>

  );
};

export default normalContentText;

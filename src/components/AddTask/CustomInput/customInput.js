import React from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Item, Grid, Row } from 'native-base';
import styles from '../styles';

const customInput = props => {
  return (
    <View style={styles.cus_input_view}>
      {props.name == 'Due Date' ? (
        <TouchableOpacity onPress={() => props.showDatepicker()}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13.5 }}>
            {props.name}
          </Text>
        </TouchableOpacity>
      ) : (
          <TextInput
            style={styles.cus_input_textInput}
            fontSize={13.5}
            fontFamily={'Poppins-Medium'}
            placeholder={props.mode == 'edit' ? props.val : props.name}
            placeholderTextColor="#0e1317"
            onChangeText={text => props.onValueChange(text)}
            value={props.val}
          />
        )}
    </View>
  );
};

export default customInput;

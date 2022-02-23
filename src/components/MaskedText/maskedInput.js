/* eslint-disable */
import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import {TextInputMask} from "react-native-masked-text";


const MaskedInput = (props) => {
    let {value,changeHandler,placeholder,mask,error} = props
  return (
      <TextInputMask
          style={{
              borderWidth:1,
              borderColor:error == true ? 'red' :'#ccc',
              paddingVertical: 18,
              marginTop:10,
              paddingHorizontal: 25
          }}
          placeholder={placeholder}
          placeholderTextColor="#666"
          type={'custom'}
          options={{
              mask: mask
          }}
          autoFocus={true}
          value={value}
          onChangeText={(text)=>changeHandler(text)}/>
  );
}

export default MaskedInput;

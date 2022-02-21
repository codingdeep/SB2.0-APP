// import Today from './today';?


import React, { Component } from 'react';
import { View } from 'react-native';
import StartEndDate from './StartEndDate';
// import {AppStyle} from './styles';
import {
  Container,
} from 'native-base';

export default class index extends Component {
  render() {
    console.log("ddddfdsfdfadsfasdf");

    return (
      <Container>
        <StartEndDate {...this.props} />
      </Container>
    );
  }
}


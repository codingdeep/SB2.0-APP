// import Today from './today';?

import React, {Component} from 'react';
import {View} from 'react-native';
import Today from './today';
import {AppStyle} from './styles';
import {Container} from 'native-base';

export default class index extends Component {
  render() {
    return (
      <Container>
        <Today {...this.props} />
      </Container>
    );
  }
}

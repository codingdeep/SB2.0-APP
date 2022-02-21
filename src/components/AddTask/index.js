import AddTask from './addTask';

import React, {Component} from 'react';
import {View} from 'react-native';
import {AppStyle} from './styles';
import {
  Container,
} from 'native-base';

export default class index extends Component {
  render() {
    return (
      <Container>
        <AddTask {...this.props} />
      </Container>
    );
  }
}


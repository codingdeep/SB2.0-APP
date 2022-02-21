import React, {Component} from 'react';
import {View} from 'react-native';
import Login from './Login';
import {AppStyle} from './styles';
import {
  Container,
} from 'native-base';

export default class LogInIndex extends Component {
  render() {
    return (
      <Container>
        <Login {...this.props} />
      </Container>
    );
  }
}

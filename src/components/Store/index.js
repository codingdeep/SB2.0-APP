/* eslint-disable */
import React, {Component} from 'react';
import {View} from 'react-native';
import SelectStore from './SelectStore/SelectStore';
import {AppStyle} from './styles';
import {
  Container,
  Thumbnail,
  Header,
  Content,
  Form,
  Item,
  Input,
} from 'native-base';

export default class index extends Component {
  render() {
    return (
      <Container>
        <SelectStore {...this.props} />
      </Container>
    );
  }
}

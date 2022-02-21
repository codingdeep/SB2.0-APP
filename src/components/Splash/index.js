import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {ImageBackground} from 'react-native';
import {
  Container,
  Thumbnail,
  Header,
  Content,
  Form,
  Item,
  Input,
} from 'native-base';

import {StatusBar} from 'react-native';
// ...
export default class index extends Component {
  componentDidMount() {}

  render() {
    const uri = '';

    return (
      <Container>
        <StatusBar hidden />

        <ImageBackground
          resizeMode={'stretch'}
          style={{flex: 1}}
          source={require('../../Assets/Splash.png')}
        />
      </Container>
    );
  }
}

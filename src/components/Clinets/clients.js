import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Search from './search';
import HeaderComponent from '../Header/header';
import ClientsProfile from './clientsProfile';
export default class clients extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Search /> */}
        <ClientsProfile {...this.props} />
      </View>
    );
  }
}

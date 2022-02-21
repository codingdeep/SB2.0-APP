/*eslint-disable*/
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {helperFunctions} from '../../_helpers';
import {Button, Form, Text, Textarea} from 'native-base';
import Icons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';
class MiniModal extends Component {
  constructor(props) {
    super(props);

  }


    closeMiniModal = () => {
    this.props.closeMiniModal();
  };

  render() {
      const {value} = this.props;
    return (
      <View style={{backgroundColor: '#FFFFFF'}}>

          <View
            style={{
              backgroundColor: value.backgroundColor,
              ...helperFunctions.padding(30, 30, 30, 30),
              position: 'relative',
              zIndex: -1,
            }}>
            <View
              style={{
                ...helperFunctions.flexRow(),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{...helperFunctions.textBlack(),...helperFunctions.mediumFont()}}>{Object.keys(value).length > 0 && value.title.toUpperCase()}</Text>

              <TouchableOpacity onPress={this.closeMiniModal}>
                <Icons color="red" name="close" size={25} />
              </TouchableOpacity>
            </View>
            <View style={{height: 30}} />

            <View>
                <View><Text style={{...helperFunctions.smallFont(),...helperFunctions.assColor()}}>{Object.keys(value).length > 0 && helperFunctions.formatDateTimeWithDay(moment(value.start),'latest')}</Text></View>
                <Text style={{...helperFunctions.textSize()}}>{Object.keys(value).length > 0 && moment(value.start).format('HH:mm a')} - {Object.keys(value).length > 0 && moment(value.end).format('HH:mm a')}</Text>
            </View>

          </View>
      </View>
    );
  }
}

export default MiniModal;

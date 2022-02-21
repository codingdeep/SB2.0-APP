import React from 'react';
import {connect} from 'react-redux';
import {Text, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles';
import {View, Grid, Row} from 'native-base';
import CustomSwitch from '../../Profile/CustomSwitch/customSwitch';
import CusTimePicker from '../CusTimePicker/CusTimePicker';

const CustomBlock = props => {
  return (
    <View
      style={{
        height: 110,
        borderBottomColor: '#f1f0f5',
        borderBottomWidth: 2,
        paddingTop: 10,
      }}>
      <Grid>
        <Row>
          <CustomSwitch
            titleName={props.SwitchtitleName}
            switchPropsVal={props.val}
          />
        </Row>
        <Row>
          <CusTimePicker
            titleName="Remind me at"
            Time={new Date()}
            mode={'time'}
            show={false}
          />
        </Row>
      </Grid>
    </View>
  );
};

export default CustomBlock;

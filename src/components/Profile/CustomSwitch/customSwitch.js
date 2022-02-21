/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";;
import { Switch } from 'react-native';
import { View, Row, Col, Label } from 'native-base';
import styles from '../styles';
import { PostCheckInNotification } from '../../../Redux/Action/ProfileAction';
import {helperFunctions} from "../../../_helpers";





const customSwitch = props => {

  ;
  console.log("propsprops", props)
  const emailNotification = useSelector(
    state => state.ProfileReducer.ProfileData.user.emailNotificationEnabled,
  );
  const smsNotification = useSelector(
    state => state.ProfileReducer.ProfileData.user.smsNotificationEnabled,
  );
  const clockInNotification = useSelector(
    state => state.ProfileReducer.ProfileData.clockReminderEnabled,
  );

  const initvalue =
    props.titleName == 'Emails' ? emailNotification :
      props.titleName == 'SMS' ? smsNotification : clockInNotification;

  const [value, setValue] = useState(
    props.isClockIn
    // props.switchPropsVal !== undefined ? props.switchPropsVal : initvalue,
  );
  console.log("jjjjj", props.isClockIn, "jjj", value);
  const count = useSelector(state =>
    state
  );
  const dispatch = useDispatch();

  const clockInApi = (switchValue) => {
    console.log("count", "ff", count);
    setValue(switchValue)
    dispatch(
      PostCheckInNotification(
        count.LoggedData.TechnicianId,
        switchValue,

      ),
    );

  }
  console.log("value", value);



  return (
    <Row style={{ marginBottom: 10 }}>
      <Col style={{ alignSelf: 'center', width: '75%' }}>
        <Label style={{...styles.normal_14_text,...helperFunctions.darkLightColor()}}>{props.titleName}</Label>
      </Col>
      <Col style={{ alignItems: 'flex-end', alignSelf: 'center' }}>
        <View style={styles.custom_switch}>
          <Switch
            trackColor={{ true: '#FFF', false: '#FFF' }}
            value={value}
            thumbColor={'#fcbf24'}
            onValueChange={switchValue => clockInApi(switchValue)}
            // onValueChange={switchValue => handleNameChange(props, switchValue)}
            disabled={props.titleName == 'Emails' || props.titleName == 'SMS' ? true : false}
          />
        </View>
      </Col>
    </Row>
  );
};

const mapStateProps = state => {
  // const LoggedData = state.LoggedData;
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;
  const TechnicianId = state.LoggedData.TechnicianId;

  const loader = state.LoggedData.loader;
  const ProfileData = state.ProfileReducer.ProfileData;
  // const technicianResponsibilities = state.ProfileReducer.technicianResponsibilities[0];
  const ProfileLoader = state.ProfileReducer.ProfileLoader;
  return {


    locationId,
    TechnicianId,
    ProfileData,
    ProfileLoader,
    // technicianResponsibilities

  };
};

export default customSwitch;





import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions, View, TextInput } from 'react-native';
import { Item, Grid, Row, Picker } from 'native-base';
import styles from '../styles';

const CustomDropDown = props => {
  const taskPriorities = useSelector(
    state => state.StoreDataReducer.StoreAllData.lookupGroup.taskPriorities,
  );

  const taskStatuses = useSelector(
    state => state.StoreDataReducer.StoreAllData.lookupGroup.taskStatuses,
  );

  const taskItemTypes = useSelector(
    state => state.StoreDataReducer.StoreAllData.lookupGroup.taskItemTypes,
  );

  const technicians = useSelector(
    state => state.StoreDataReducer.StoreAllData.locations[0].technicians,
  );

  // const ass_tech_name = () => {
  //   if (props.name == 'Assignet To') {
  //     console.log("555555", props.name);
  //     return technicians.map(e => {
  //       if (e.id == props.val) {


  //         return e.user.names.nick;
  //       }
  //       // else if (props.val == 206) {
  //       //   ass_tech_name = 'Kait';
  //       // }
  //     });
  //   }
  // }
  const ass_tech_name = technicians.filter(e => props.name == 'Assignet To' && e.id == props.val ? e.user.names.nick : null)







  let Final_Active_User = [];
  let DataLoadItem = [];

  technicians.map(e => {


    e.accountStatus == 'Active'
      ? Final_Active_User.push(e.user)
      // ? Final_Active_User.push(e.user.names.nick)
      : null;
  }
  );


  DataLoadItem =
    props.name == 'Priority'
      ? taskPriorities
      : props.name == 'Status'
        ? taskStatuses
        : props.name == 'Related To'
          ? taskItemTypes
          : props.name == 'Assignet To'
            ? Final_Active_User
            : null;

  DataLoadItem.includes(props.name) == false
    ? DataLoadItem.push(props.name)
    : null;

  const [pickerData, setPickerData] = useState(props.name);

  return (
    <View style={styles.cus_input_view}>
      <Picker
        mode="dropdown"
        style={{ width: undefined }}
        placeholder={props.forTecnician == "true" ? 'Assignet To' : "Select"}
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#0e1317"
        selectedValue={
          props.mode == 'edit'
            ? props.name == 'Assignet To'
              ? ass_tech_name
              : props.val
            : pickerData
        }
        onValueChange={e => {
          props.onValueChange(e);
          setPickerData(e);
        }}>

        {DataLoadItem.map((e, index) => {
          if (props.forTecnician == "true") {

            return (
              <Picker.Item key={index} label={e.fullName} value={e.id} />
            )
          } else {
            return (
              <Picker.Item key={e} label={e} value={e} />
            )
          }

        })}

      </Picker>
    </View>
  );
};

export default CustomDropDown;

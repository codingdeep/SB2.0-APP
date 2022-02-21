/* eslint-disable */
import React, { Component } from 'react';
import {

  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Left, Right, Item, Form, Body, Icon, Content, Picker, Title, Container } from 'native-base';
import HeaderComponent from '../Header/header';
import Moment from "moment"
import styles from './styles';
import { connect } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AddNewFormulaList } from '../../Redux/Action/formulaList';
import { UpdateFormula } from '../../Redux/SagaActions/formula_saga_action';
import CustomDateTimePicker from "../ImportantFunction/datePicker"
import { useTheme } from '../../Theme/hooks'
import { Appearance, useColorScheme } from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
import { red } from 'ansi-colors';
import {helperFunctions} from "../../_helpers";
class addEditFormula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      type: this.props.navigation.getParam('ListInfo') ? this.props.navigation.getParam('ListInfo').type : undefined,
      date: this.props.navigation.getParam('ListInfo') ? this.props.navigation.getParam('ListInfo').lastUseTime : new Date(),
      mode: 'date',
      show: false,
      notes: this.props.navigation.getParam('ListInfo') ? this.props.navigation.getParam('ListInfo').notes : "",
      initialLastDate: this.props.navigation.getParam('ListInfo') ? true : false
    };
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      initialLastDate: true
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
  }

  static getDerivedStateFromProps(props, state) {
    const ClientInfo = props.ClientInfo
    const TechnicianId = props.TechnicianId
    const ClientId = props.ClientInfo.id
    const UserFormulaTypes = props.UserFormulaTypes

    return {
      ClientInfo,
      UserFormulaTypes,
      ClientId,
      TechnicianId
    };
  }
  onValueChange2 = value => {

    console.log("VVVVVVV", value)
    this.setState({
      type: value
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  AddNewFormula = () => {
    if (this.props.navigation.getParam('ListInfo')) {
      UpdateFormula(
        this.props.navigation.getParam('ListInfo').id,
        this.state,
        response => {
          console.log("responseresponse", response)
          this.props.navigation.navigate('FormulaListScreen')



        },
        error => {
          toast(error.errors ? error.errors : error.message, "BOTTOM");
          console.log("responseresponse", error)
        }
      )

    } else {
      this.state.date == '' ||
        this.state.type == '' ||
        this.state.notes == ''
        ? Alert.alert('Please fill all field.')
        : this.props.dispatch(AddNewFormulaList(this.props.navigation, this.state));
    }

  }

  render() {
    const ListInfo = this.props.navigation.getParam('ListInfo');
    // const clientInfo = navigation.getParam('ClientInfo');
    //  "lastUseTime" : "2020-01-15T13:12:18"
    console.log("ListInfo", ListInfo);


    const { UserFormulaTypes, show, date, mode, initialLastDate, value } = this.state
    console.log("value", value);
    return (
      <Container style={styles.pro_background}>
        <View style={{justifyContent: "center", ...helperFunctions.headerHeight() }}>
          <HeaderComponent
            title={this.props.navigation.getParam('ListInfo') ? "Edit Formula" : "Add Formula"}
            rightTitle={this.props.navigation.getParam('ListInfo') ? "Update" : "Save"}
            color={defaultMode === 'dark' ? 'white' : '#424E9C'}
            onFunctionCall={() => {
              this.AddNewFormula()
            }}
            {...this.props}

          />
        </View>

        <View style={{height: 40}}/>

        <View style={styles.container}>
          <View

            style={{...styles.Back, ...helperFunctions.blackWhite(),...helperFunctions.assBg()}}>
            <Left style={{ marginLeft: 15}}>
              <Text style={{...helperFunctions.textSize()}}>
                {initialLastDate == false ? "Last Used Date" : Moment(date).format("YYYY-MM-DD")}


              </Text>
            </Left>
            <Body>
              {show &&
                <CustomDateTimePicker
                  value={date}
                  mode={"datetime"}
                  showPicker={show}
                  setTime={
                    (e, date) => {
                      this.setDate(null, date)
                    }
                  }
                  onCancleDatePicker={
                    () => this.setState({
                      show: false
                    })
                  }
                />
              }
            </Body>
            <Right style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={this.datepicker}>
                <Image
                  style={styles.calender}
                  source={require('../../Assets/formulaList/actions.png')}
                />
              </TouchableOpacity>
            </Right>
          </View>
          <View style={styles.empty}></View>
          <View

            style={{...styles.Back,...helperFunctions.blackWhite(),...helperFunctions.assBg()}}>
            {/* <Left style={{ marginLeft: 15 }}> */}
            {/* <Text style={styles.text}>Formula Type</Text> */}
            {/* <Form> */}
            {/* <Body style={{ paddingHorizontal: 35 }}>
              <Item picker> */}
            <View style={styles.cus_input_view}>

              <Picker

                mode="dropdown"

                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined,...helperFunctions.textBlack() }}
                // style={{ flex: 1, color: '#445870' }}
                itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingHorizontal: 15 }}
                placeholder="Formula Types"

                // placeholderStyle={{ color: "#bfc6ea", justifyContent: "space-between" }}
                placeholderIconColor="#999"
                selectedValue={this.state.type}
                onValueChange={(val) => this.onValueChange2(val)}
              >
                <Picker.Item label="Formula Type" value="" />
                {Object.values(UserFormulaTypes).map((type) => {
                  return (
                    <Picker.Item label={type} value={type} key={type} />
                  )
                })}
              </Picker>
            </View>

          </View>

          <View
            style={{
              minHeight: 100,
              maxHeight: 200,
              ...helperFunctions.blackWhite(),
              ...helperFunctions.assBg(),
              marginTop: 15
            }}>
            <TextInput
              style={{...helperFunctions.smallFont(),color: helperFunctions.darkLightColor()}}
              placeholder="Enter notes.."
              placeholderTextColor="#999"
              fontFamily={'Poppins-Medium'}
              fontSize={13.5}
              multiline={true}
              maxLength={1200}
              padding={15}
              onChangeText={text => this.setState({ notes: text })}
              value={this.state.notes}
            />
          </View>
        </View>
      </Container>
    );
  }
}


const mapStateProps = state => {
  // console.log('1546545646544', state);
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
  const UserFormulaTypes = state.StoreDataReducer.StoreAllData.lookupGroup.userFormulaTypes;
  const FormulaListData = state.FormulaReducer.FormulaListData;
  const TechnicianId = state.LoggedData.TechnicianId;
  const TechniciansInfo = state.StoreDataReducer.StoreAllData.locations[0].technicians;
  const ClientInfo = state.FormulaReducer.ClientInfo;



  return {
    StoreLocationInfo,
    FormulaListData,
    TechniciansInfo,
    TechnicianId,
    ClientInfo,
    UserFormulaTypes
  };
};

export default connect(mapStateProps)(addEditFormula);

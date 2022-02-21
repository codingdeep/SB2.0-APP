import React from 'react';
import { connect } from 'react-redux';
import {
  Text, KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button,
  Image
} from 'react-native';
import styles from './styles';
import { Container, View, Left, Right, Body } from 'native-base';
import CustomInput from './CustomInput/customInput';
import { AddNewTask } from '../../Redux/Action/TodayAllData';
import HeaderComponent from '../Header/header';
import CustomDropDown from './CustomDropDown/customDropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomDateTimePicker from '../ImportantFunction/datePicker'
import SearchPicker from '../ImportantFunction//SearchPicker'
import { GetSearchService } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import { GetSearchProduct } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import { SearchClient } from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';

class addTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      related_to: '',
      assignet_to: '',
      priority: '',
      status: '',
      notes: '',
      due_date_date: 'Due Date',
      timeShow: false,
      chosenDate: new Date(),
      chosenTime: '10:00 am',
      date: new Date(),
      time: new Date(),
      mode: 'date',
      show: false,
      locationId: "",
      initialLastDate: false,
      relatedItem: null,
      itemList: null
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      due_date_date: date,
      initialLastDate: true
    });
    // this.showTimepicker();
  };
  static getDerivedStateFromProps(props, state) {
    const { locationId } = props;
    return {
      locationId
    }
  }

  setTime = (event, time) => {
    time = time || this.state.time;

    let dateNow = moment(this.state.date).format('YYYY-MM-DD');
    let timeNow = moment(time).format('hh:mm:ss');

    let final_date_time = dateNow + 'T' + timeNow;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      time,
      due_date_date: final_date_time.toString(),
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  showDatepicker = () => {
    this.show('date');
    //this.showTimepicker();
  };

  showTimepicker = () => {
    this.show('time');
  };

  Set_State(itemName, itemValue) {
    console.log("itemValue", itemValue);
    this.setState({ [itemName]: itemValue });
  }
  Set_Related_State(itemName, itemValue) {
    console.log("itemValue", itemValue);

    this.setState({
      [itemName]: itemValue,
      related_to_name: itemValue,
      relatedItem: null,
      itemList: null
    });
    setTimeout(() => {
      if (itemValue == "Service") {
        this.searchService("")
      } else if (itemValue == "Product") {
        this.searchProduct("")
      } else if (itemValue == "Customer") {
        this.searchClient("")
      }
    }, 500);


  }

  searchService = search => {
    console.log("TEXT");
    GetSearchService(
      this.props.locationIdStore,
      search
      ,
      (response) => {
        console.log("response.Body", response)

        if (response && response.length > 0) {
          console.log("response.Body666", response)
          // this.state.ServiceList = response
          this.setState({
            itemList: response.map(s => {
              s = {
                ...s,
                ...s.service
              }
              return s
            })
          })
        } else {

          this.setState({

          })
        }

      },
      (error) => {
        console.log("error1", error)
      }
    );

  }
  searchProduct = search => {
    console.log("TEXT");
    GetSearchProduct(
      this.props.locationIdStore,
      search
      ,
      (response) => {
        console.log("response.Product", response)

        if (response && response.length > 0) {
          this.state.itemList = response
          this.setState({
            itemList: response
          })
          console.log("mmmmkkkk", this.state.itemList);
        } else {
          this.setState({

          })
        }

      },
      (error) => {
        console.log("error1", error)
      }
    );

  }
  searchClient = search => {

    SearchClient(
      this.props.businessId,
      search,
      (response) => {
        console.log("response.Client", response)

        if (response && response.length > 0) {
          this.state.itemList = response
          this.setState({
            itemList: response.map(s => {
              s = {
                id: s.id,
                name: s.fullName
              }
              return s
            })
            // itemList: response
          })
          console.log("mmmmkkkk", this.state.itemList);

        } else {
          this.setState({

          })
        }

      },
      (error) => {
        console.log("error1", error)
      }
    );
  };
  addNewTasks = () => {
    this.state.title == '' ||
      this.state.assignet_to == '' ||
      this.state.related_to == '' ||
      this.state.priority == '' ||
      this.state.status == '' ||
      this.state.assignet_to == 'Assignet To' ||
      this.state.related_to == 'Related To' ||
      this.state.priority == 'Priority' ||
      this.state.status == 'Status' ||
      this.state.notes == '' ||
      this.state.due_date_date == 'Due Date'
      ? alert('Please fill all task data.')
      : this.props.dispatch(AddNewTask(this.props.navigation, this.state));
  };
  render() {
    const { show, date, mode, time, initialLastDate, itemList } = this.state;
    console.log("itemListitemListitemList", itemList);

    return (
      <KeyboardAvoidingView style={styles.pro_background}>
        <StatusBar hidden />

        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <HeaderComponent title="Add Task" {...this.props} />
        </View>
        <View
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 8, marginHorizontal: 40 }}>
          <CustomInput
            name="Title"
            onValueChange={e => this.Set_State('title', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Related To"
            onValueChange={e => this.Set_Related_State('related_to', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          {this.state.itemList && (

            <View style={styles.cus_input_view}>
              <SearchPicker

                onItemSelect={(item) => {
                  console.log("itemitem", item);

                  itemList.push(item)
                  this.setState({
                    relatedItem: item.id
                  })
                }}
                fromTask={"false"}
                placeholder={"Select " + this.state.related_to_name}
                items={itemList}

                onTextChange={text => {
                  this.state.related_to_name == "Service" ?
                    this.searchService(text) : this.state.related_to_name == "Product" ? this.searchProduct(text) : this.searchClient(text)

                }}
              />

            </View>

          )}
          {this.state.itemList && (
            <View style={{ flex: 0.3 }}></View>
          )}

          <CustomDropDown
            name="Assignet To"
            forTecnician={"true"}
            onValueChange={e => {
              console.log("gggggg", e);

              this.Set_State('assignet_to', e)
            }}
          />
          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Priority"
            onValueChange={e => this.Set_State('priority', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          {/* <CustomInput
            name={this.state.due_date_date}
            showDatepicker={() => this.showDatepicker()}
          /> */}
          <View style={[styles.cus_input_view, { flexDirection: "row" }]}>
            <Left style={{ marginLeft: 15 }}>
              <Text style={styles.text}>
                {initialLastDate == false
                  ? 'Start Time'
                  : moment(this.state.due_date_date).format('MM-DD-YYYY hh:mm A')}
              </Text>
            </Left>

            {/* <View style={styles.cus_input_view}> */}
            {/* <Button onPress={this.showDatepicker} title="Show date picker!" />
            <Button onPress={this.showTimepicker} title="Show time picker!" /> */}
            <Body>
              {show && (
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

              )}
            </Body>
            <Right style={{ marginRight: 10 }}>
              <TouchableOpacity onPress={this.showTimepicker}>
                <View style={{ height: 25, justifyContent: "center", alignItems: "center" }}>
                  <CusIconDesign
                    IconFrom="AntDesign"
                    name="calendar"
                    textAlign="center"
                    color='#424E9C'
                    size={25}
                  />
                </View>


                {/* <Image
                  style={styles.calender}
                  source={require('../../Assets/formulaList/actions.png')}
                /> */}
              </TouchableOpacity>
            </Right>
          </View>

          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Status"
            onValueChange={e => this.Set_State('status', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#424e9c',
                fontFamily: 'Poppins-Medium',
                textAlign: 'left',
              }}>
              Notes
            </Text>
          </View>
          {/* <View style={{flex: 0.3}}></View> */}
          <View style={{
            flex: 2, backgroundColor: '#f1f0f5', borderRadius: 10,

          }}>
            <TextInput
              // editable
              style={styles.cus_large_textInput}
              placeholder="1200 Chars Max"
              placeholderTextColor="#0e1317"
              fontFamily={'Poppins-Medium'}
              fontSize={13.5}
              multiline={true}
              maxLength={100}
              onChangeText={text => this.Set_State('notes', text)}
              value={this.state.notes}
            />

          </View>
          <View style={{ flex: 0.3 }}></View>
          <View style={styles.cus_input_view}>
            <TouchableOpacity onPress={() => this.addNewTasks()}>
              <Text style={{ textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateProps = state => {
  const businessId = state.LoggedData.businessId;
  const locationId = state.LoggedData.locationId;
  const locationIdStore = state.StoreDataReducer.StoreAllData.locations[0].id
  return {
    businessId,
    locationId,
    locationIdStore
  };
};
export default connect(mapStateProps)(addTask);

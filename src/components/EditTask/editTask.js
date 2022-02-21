import React from 'react';
import { connect } from 'react-redux';
import {
  Text, KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button, Image
} from 'react-native';
import styles from './styles';
import { Container, View, Left, Right, Body, Label, Picker, Icon } from 'native-base';
import CustomInput from '../AddTask/CustomInput/customInput';
import { EditTask } from '../../Redux/Action/TodayAllData';
import HeaderComponent from '../Header/header';
import CustomDropDown from '../AddTask//CustomDropDown/customDropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomDateTimePicker from "../ImportantFunction/datePicker"
import SearchPicker from "../ImportantFunction//SearchPicker"
import { GetSearchService } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import { GetSearchProduct } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import { SearchClient } from '../../Redux/SagaActions/AppoinmentsSagaAction.js';


class editTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.navigation.state.params.value.subject,
      related_to: props.navigation.state.params.value.relatedItemType ? props.navigation.state.params.value.relatedItemType : null,
      assignet_to: props.navigation.state.params.value.technician.id,
      assignet_to_format: {
        ...props.navigation.state.params.value.technician,
        fullName: props.navigation.state.params.value.technician.user.fullName
      },
      priority: props.navigation.state.params.value.priority,
      status: props.navigation.state.params.value.status,
      notes: props.navigation.state.params.value.comments,
      due_date_date: props.navigation.state.params.value.dueTime,
      timeShow: false,
      chosenDate: new Date(),
      chosenTime: '10:00 am',
      date: new Date(),
      time: new Date(),
      mode: 'date',
      show: false,
      initialLastDate: false,
      id: props.navigation.state.params.value.id,

      itemList: null,
      relatedItem: this.props.navigation.state.params.value.relatedItem ? this.props.navigation.state.params.value.relatedItem.id : null,
      relatedItemFomated: this.props.navigation.state.params.value.relatedItem ? {
        ...this.props.navigation.state.params.value.relatedItem,
        name: this.props.navigation.state.params.value.relatedItem.fullName
      } : null,
      related_to_name: this.props.navigation.state.params.value.relatedItem ? this.props.navigation.state.params.value.relatedItemType : "",

    };
    this.setDate = this.setDate.bind(this);
  }
  componentDidMount = () => {
    console.log("DFasdfasdf", this.props.navigation.state.params.value.relatedItemType);

    setTimeout(() => {
      this.Set_First_Related_State("related_to", this.props.navigation.state.params.value.relatedItemType)
    }, 1000);

  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      initialLastDate: true
    });
    this.showTimepicker();
  };

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

    this.setState({ [itemName]: itemValue });
  }
  Set_Assign_To_State(itemName, itemValue) {
    let formatedAssign = this.props.technicians.filter(e => e.id == itemValue ? e.user.fullName : null)
    this.setState({
      [itemName]: itemValue,
      assignet_to_format: formatedAssign[0]
    });
  }
  Set_First_Related_State(itemName, itemValue) {

    this.setState({
      [itemName]: itemValue,
      related_to_name: itemValue,
      itemList: null,
      // relatedItemFomated: null
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

  Set_Related_State(itemName, itemValue) {

    this.setState({
      [itemName]: itemValue,
      related_to_name: itemValue,
      relatedItem: null,
      itemList: null,
      relatedItemFomated: null
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

  editTasks = () => {
    this.props.dispatch(
      EditTask(this.props.navigation, this.state, this.state.id, this.props.locationIdStore),
    );
  };
  render() {


    const { show, date, mode, time, initialLastDate, itemList, relatedItem, relatedItemFomated, assignet_to, assignet_to_format } = this.state;
    console.log("DDDDDDDDDD", this.props.navigation.state.params.value);
    return (
      <View style={styles.pro_background}>
        <StatusBar hidden />

        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <HeaderComponent
            title="Edit Task"
            {...this.props} />
        </View>
        <View style={{ flex: 8, marginHorizontal: 40 }}>
          <CustomInput
            name="Title"
            mode="edit"
            val={this.state.title}
            onValueChange={e => this.Set_State('title', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Related To"
            mode="edit"
            val={this.state.related_to}
            onValueChange={e => this.Set_Related_State('related_to', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          {/* {this.state.related_to_name && ( */}
          {this.state.itemList && (
            <View style={[styles.cus_input_view_search, {}]}>
              {relatedItemFomated && (
                <View style={styles.cus_input_view_search_text}>
                  <Text style={styles.search_text}
                    numberOfLines={2}
                  >
                    {
                      relatedItemFomated.name
                    }
                  </Text>
                </View>
              )}
              {relatedItemFomated && (
                <View style={{ width: "5%", }} />
              )}
              <View style={[styles.searchBox, { width: relatedItemFomated ? "55%" : "100%" }]}>

                <SearchPicker
                  onItemSelect={(item) => {
                    console.log("itemitem", item);

                    itemList.push(item)
                    this.state.relatedItem = item.id
                    this.setState({
                      relatedItem: item.id,
                      relatedItemFomated: null
                      // relatedItemFomated: item
                    })
                  }}
                  fromTask={"false"}
                  placeholder={"Select " + this.state.related_to_name}
                  items={itemList}

                  onTextChange={text => {
                    this.state.related_to_name == "Service" ?
                      this.searchService(text) : this.state.related_to_name == "Product" ? this.searchProduct(text) : this.searchClient(text)

                  }
                  }
                />
              </View>

            </View>
          )}
          {/* )} */}
          <View style={{ flex: 0.3 }}></View>
          {/* <CustomDropDown
            name="Assignet To"
            mode="edit"
            forTecnician={"true"}
            val={this.state.assignet_to}
            onValueChange={e => this.Set_State('assignet_to', e)}
          /> */}
          <View style={styles.cus_input_view}>
            <Picker
              mode="dropdown"
              // iosIcon={<Icon name="arrow-down" />}
              style={{ width: '100%' }}
              placeholder="Assignet To"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.assignet_to_format.id}
              onValueChange={e => this.Set_Assign_To_State('assignet_to', e)}>
              {/* <Picker.Item label="Select Stylist" value="" /> */}

              {this.props.technicians.map((technician, i) => {

                return technician ? (
                  <Picker.Item
                    key={i}
                    style={{
                      color: '#0e1317',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 14,
                    }}
                    label={technician.user.fullName}
                    value={technician.id}
                  />
                ) : null;
              })}
            </Picker>
          </View>





          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Priority"
            mode="edit"
            val={this.state.priority}
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
                {!this.state.date
                  ? 'Start Time'
                  : moment(this.state.date).format('MM-DD-YYYY hh:mm A')}
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
                <Image
                  style={styles.calender}
                  source={require('../../Assets/formulaList/actions.png')}
                />
              </TouchableOpacity>
            </Right>
          </View>



          <View style={{ flex: 0.3 }}></View>
          <CustomDropDown
            name="Status"
            mode="edit"
            val={this.state.status}
            onValueChange={e => this.Set_State('status', e)}
          />
          <View style={{ flex: 0.3 }}></View>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={styles.notes_style}>
              Notes
            </Text>
          </View>
          {/* <View style={{flex: 0.3}}></View> */}
          <View style={{ flex: 2, backgroundColor: '#f1f0f5', borderRadius: 10, }}>
            <TextInput
              style={styles.cus_large_textInput}
              // placeholder={"1200 Chars Max"}
              placeholderTextColor="#0e1317"
              fontFamily={'Poppins-Medium'}
              fontSize={13.5}

              // numberOfLines={10}
              multiline={true}
              onChangeText={text => this.Set_State('notes', text)}
              value={this.state.notes}
            />
          </View>
          <View style={{ flex: 0.3 }}></View>
          <View style={styles.cus_input_view}>
            <TouchableOpacity onPress={() => this.editTasks()}>
              <Text style={{ textAlign: 'center' }}>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
    );
  }
}
const mapStateProps = state => {
  const businessId = state.LoggedData.businessId;
  const locationId = state.LoggedData.locationId;
  const locationIdStore = state.StoreDataReducer.StoreAllData.locations[0].id
  const technicians = state.StoreDataReducer.StoreAllData.locations[0].technicians
  return {
    businessId,
    locationId,
    locationIdStore,
    technicians
  };
};
export default connect(mapStateProps)(editTask);

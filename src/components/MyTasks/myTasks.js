import React, { Component } from 'react';
import {
  Text, FlatList,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Left, Right, Container } from 'native-base';
import { connect } from 'react-redux';
import HeaderComponent from '../Header/header';
import styles from './styles';
import Moment from 'moment';
import RefreshFooter from "../ImportantFunction/refreshFooter"
import { GetTaskNextPage } from '../../Redux/SagaActions/extends_TodayAllDataAction';
import { DeleteTask } from '../../Redux/SagaActions/extends_TodayAllDataAction';
import LOADER from '../Loader/Loader';
import { toast } from '../../components/Toast/Toast'
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
import {helperFunctions} from "../../_helpers";
import * as Animatable from "react-native-animatable";
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import {backgroundColor} from 'react-native-calendars/src/style';
const defaultMode = Appearance.getColorScheme() || 'light';
class myTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {

      data: this.props.navigation.state.params.AllTasksData,
      footerLoading: false,
      offSet: 0,
      load: false
    };
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      () => {
        this.GetTasksData();
      },
    );
    setTimeout(() => {
      this.state.load = true
    }, 500);
  }


  deleteTask = id => {
    console.log("dddddd", id);

    Alert.alert(
      `Delete Task`,
      `Are you Sure?`,
      [
        {
          text: `Yes`,
          onPress: () => {
            DeleteTask(
              id,
              success => {
                // console.log("responseresponse", response)
                this.GetTasksData()

              },
              error => {
                toast(error.errors ? error.errors : error.message, "BOTTOM");
                console.log("responseresponse", error)
              }
            )
          },
        },
        {
          text: `No`,
          onPress: () => { },
        },
      ],
      { cancelable: true },
    );
  };
  GetTasksData = () => {
    console.log("2", "GetTasksData")
    GetTaskNextPage(
      this.props.locationId.id,
      0
      ,
      (response) => {
        if (response && response.length > 0) {
          console.log("GetTasksData", response)
          this.setState({
            data: response,
            offSet: 0,
            load: true
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
  handleRefresh = () => {

    if (!this.state.load) {
      return;
    }
    this.state.load = false
    let offSet = this.state.offSet + 1
    console.log("response.Body", offSet)
    this.setState({ footerLoading: true })
    GetTaskNextPage(
      this.props.locationId.id,
      offSet
      ,
      (response) => {
        if (response && response.length > 0) {
          console.log("response.Body", response)
          this.setState({
            data: [...this.state.data, ...response],
            offSet: offSet,
            footerLoading: false,
            load: true
          })
        } else {
          this.setState({
            footerLoading: false
          })
        }


      },
      (error) => {
        console.log("error1", error)
      }
    );
  }

  render() {
    const { data } = this.state;
    console.log("datadatadata", data);

    let viewData = (value,index) => {
      return (
        <Animatable.View animation={index%2 == 0 ? "fadeInLeft" : "fadeInRight"}  style={[styles.container,{...helperFunctions.whiteToDark()}]} >
          <View style={{...helperFunctions.defaultPadding()}}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.leftBox}>
              <Text style={{...helperFunctions.mediumFont(),color: helperFunctions.darkLightColor()}}>{value.subject}</Text>
              <Text style={{...styles.longText,color: helperFunctions.darkLightColor()}}>{value.comments && `(${value.comments})`}</Text>
            </View>
            <View style={[styles.midBox,{...helperFunctions.flexRow()}]}>
              {!value.systemGenerated && (
                <TouchableOpacity
                    style={{marginRight: 20}}
                  onPress={() => {
                    this.deleteTask(value.id);
                  }}>
                  <CusIconDesign
                    IconFrom="Feather"
                    name="trash-2"
                    textAlign="right"
                    color="red"
                    size={25}
                  />
                  {/* <Image
                    style={styles.deleteBtn}
                    source={require('../../Assets/ic-actions-trash.png')}
                  /> */}
                </TouchableOpacity>
              )}
              {!value.systemGenerated && (
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('EditTask', { value: value })
                  }>
                <CusIconDesign
                    IconFrom="Feather"
                    name="edit-2"
                    textAlign="right"
                    color='#424E9C'
                    size={25}
                />

                {/* <Image
                    style={{ height: 12, width: 12, alignSelf: 'flex-end' }}
                    source={require('../../Assets/today_png/Path_158.png')}
                  /> */}
              </TouchableOpacity>
              )}

            </View>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Left style={styles.leftBox2}>
              <Text style={{...styles.longText,...helperFunctions.textSize(),...helperFunctions.assColor()}}>
                Priority:{' '}
                <Text style={{...helperFunctions.textBlack()}}>{value.priority}</Text>
              </Text>
            </Left>
            <Right style={styles.rightBox2}>
              <Text style={{...styles.longText,...helperFunctions.textSize(),...helperFunctions.assColor()}}>
                Status: <Text style={{ ...helperFunctions.textBlack() }}>{value.status}</Text>
              </Text>
            </Right>
          </View>


          <View style={styles.borderStyle}></View>
        </View>
        </Animatable.View>
      );
    };
    return !data ? (
      <LOADER />
    ) : (
        <Container style={{...styles.pro_background,...helperFunctions.whiteToDark()}}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <HeaderComponent color={defaultMode === 'dark' ? 'white' : '#424E9C'} title="My Tasks" {...this.props} />
          </View>
          {/* <ScrollView>{viewData}</ScrollView>
        */}
          <View style={{ flex: 8}}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => item + index}
              // renderItem={({ item }) => <Item title={item} />}
              renderItem={({ item,index }) => {
                return (
                  viewData(item,index)
                )
              }}
              onEndReached={this.handleRefresh}
              onEndReachedThreshold={0}

              ListFooterComponent={
                <RefreshFooter
                  loading={this.state.footerLoading}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>

        </Container>
      );
  }
}


const mapStateProps = state => {
  const locationId = state.LoggedData.locationId;

  return {
    locationId
  };
};


export default connect(mapStateProps)(myTasks);

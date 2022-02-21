/* eslint-disable */

import React, { Component } from 'react';
import { white, red } from 'ansi-colors';
import _ from 'lodash';
import {
  Container,
  Left,
  Body,
  Title,
  Right,
  Thumbnail,
  ListItem,
  Badge,
  List,
  Picker,
  Item,
  Icon,
  Button,
  Content,
  Row,
  Col,
  Grid,
} from 'native-base';

import { Platform, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';

import HeaderComponent from '../Header/header';
import { connect } from 'react-redux';
import styles from './styles';
import { AllChatApi } from './../../Redux/Action/ChatAction';
import {
  ChatAllAction,
  _AddThread,
} from './../../Redux/SagaActions/ChatSagasAction';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Modal from 'react-native-modal';
import checkNewMessage from './checkNewMessage';
import { colors } from '../../Theme';
import SearchPicker from "../ImportantFunction//SearchPicker"
import { SearchClient } from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import { Appearance, useColorScheme } from 'react-native-appearance';
import {helperFunctions} from "../../_helpers";

const defaultMode = Appearance.getColorScheme() || 'light';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      clientName: '',
      clientId: '',
      enableChat: false,
      threadList: [],
    };
    this.navigationWillFocusListener = props.navigation.addListener(
      "willFocus",
      () => {
        this.props.chat().setAllThreads(this.getAllThreads);
        this.props.chat().setOnNewMessageThreadListListner(this.onNewMessageThreadListListner);
        this.props.chat().getThreadList();
      }
    );
    // this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    this.props.chat().setAllThreads(this.getAllThreads);
    this.props.chat().setOnNewMessageThreadListListner(this.onNewMessageThreadListListner);
    this.props.chat().getThreadList();
    this.searchClient("")
  }

  componentWillUnmount() {
    this.props.chat().setAllThreads(null);
    this.props.chat().setOnNewMessageThreadListner(null);
  }

  searchClient = search => {

    SearchClient(
      this.props.businessId,
      search,
      (response) => {
        console.log("response.Client", response)

        if (response && response.length > 0) {
          this.state.AllClientsData = response
          this.setState({
            AllClientsData: response.map(s => {
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

  onNewMessageThreadListListner = () => {
    let self = this;
    return function (thread, message) {
      let found = false;
      for (let i = 0; i < self.state.threadList.length; i++) {
        if (thread == self.state.threadList[i].id) {
          found = true;
          self.state.threadList[i].lastMessage = message;
        }
      }
      console.log(found);

      if (!found) {
        self.props.chat().getThreadList();
      } else {
        self.getAllThreads(self.state.threadList);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    // const AllClientsData = props.AllClientsData;

    return {
      // AllClientsData,
    };
  }
  ChatAllActionCall = async () => {
    await ChatAllAction(this.props.StoreLocationInfo);
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  onClientSelect = async (val) => {
    console.log("lllllll", val);

    const { AllClientsData } = this.state;

    let self = this;
    await AllClientsData.forEach(async function (item, key) {
      if (item.id == val) {
        let found = false;
        await self.state.threadList.forEach(async (thread) => {
          if (thread.participants[0].user.id == item.id) {
            found = true;
            self.props.navigation.navigate('ThreadView', { thread });
          }
        });
        if (!found) {

          let data = await _AddThread(
            self.props.StoreLocationInfo,
            null,
            item.id,
            success => {
              console.log("hhhhhhhhh", success);

              self.props.chat().setAllThreads(self.getAllThreads);
              self.props.chat().setOnNewMessageThreadListListner(self.onNewMessageThreadListListner);
              self.props.chat().getThreadList();
            }
          );
          console.log(data);
        }
      }
    });
    this.toggleModal();
  };

  getAllThreads = async (data) => {
    for (let i = 0; i < data.length; i++) {
      let thread = data[i];
      if (
        await checkNewMessage(
          thread.id,
          thread.lastMessage ? thread.lastMessage.createdTime : null,
        )
      ) {
        data[i]['new'] = true;
      } else {
        data[i]['new'] = false;
      }
    }
    console.log('timeMsg', data);

    this.setState({ enableChat: true, threadList: data });
  };

  openThread = (thread) => {
    this.props.navigation.navigate('ThreadView', { thread });
  };

  render() {

    const { AllClientsData, threadList } = this.state;
    console.log('kkkkk', AllClientsData);
    return (
      <Container style={styles.pro_background}>
        <View style={{justifyContent: "center", ...helperFunctions.headerHeight() }}>
          {<HeaderComponent Left={"false"} title={'Messages'}
            color={defaultMode === 'dark' ? '#ffffff' : "#0000ff"}
          />}
        </View>
        <View style={{ flex: 8, marginHorizontal: 40, position: "relative" }}>
          <View style={{ flex: 1, top: 0, left: 0, right: 0, bottom: 0 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {this.state.threadList.map((thread) => (
                <List key={thread.id}>
                  <ListItem avatar style={styles.listItem}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => {
                        this.openThread(thread);
                      }}>
                      <Left>
                        <Thumbnail
                          style={styles.userImage}
                          square
                          source={{ uri: thread.participants[0].user.imageUrl }}
                        />
                      </Left>
                      <Body style={styles.body}>
                        <Title style={[styles.title, { color: thread.lastMessageReadBySessionUser == false ? helperFunctions.yellow() : Appearance.getColorScheme() === 'dark' ? '#F0F8FF' : '#979797', }]}>
                          {thread.participants[0].user.fullName}
                        </Title>
                        <Title numberOfLines={2} style={styles.messageSubBody}>
                          {thread.lastMessage && thread.lastMessage.body}
                          {!thread.lastMessage && `Start by typing message`}
                        </Title>
                        <Title style={styles.minutesAgo}>
                          {/* {thread.lastMessage.readableCreatedTime} */}
                        </Title>
                      </Body>
                      <Right style={{ borderBottomWidth: 0 }}>
                        <Badge style={styles.badge}></Badge>
                        {/* {thread.new && <Title style={styles.title}>New</Title>} */}
                      </Right>
                    </TouchableOpacity>
                  </ListItem>
                </List>
              ))}

            </ScrollView>
          </View>
          <View style={{ position: "absolute", bottom: 0, right: 0 }}>
            <ListItem avatar>
              <Left />
              <Body style={{ borderWidth: 0, borderColor: 'transparent' }} />
              <Right style={{ marginRight: 0, paddingRight: 0 }}>

                <TouchableOpacity
                  style={styles.plusBackground}
                  onPress={() => {
                    this.toggleModal();
                  }}>
                  <Thumbnail
                    style={styles.plusImage}
                    circular
                    source={require('../../Assets/chats/plus.png')}
                  />
                </TouchableOpacity>

              </Right>
            </ListItem>
          </View>
          {/* <View style={{ flex: 2 }}></View> */}

          <View style={{ marginTop: 1, }}>
            <Modal isVisible={this.state.isModalVisible}>
              <View style={{ height: "50%", backgroundColor: 'white', borderRadius: 10 }}>
                {/* <View style={{ justifyContent: "center", alignItems: "center", }}> */}

                <View style={styles.cus_input_view}>

                  <SearchPicker

                    onItemSelect={(item) => {
                      console.log("itemitem", item);

                      this.onClientSelect(item.id)
                      // this.setState({
                      //   relatedItem: item.id
                      // })
                    }}
                    // fromTask={"false"}
                    placeholder="Select Customer"
                    items={AllClientsData}

                    onTextChange={text => {
                      this.searchClient(text)

                    }}
                  />
                </View>
                {/*
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: '100%' }}
                        placeholder="Service"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.serviceId}
                        onValueChange={(val) => this.onClientSelect(val)}>

                        <Picker.Item label="Add New Client" value="" />

                        {AllClientsData.map((client, i) => (
                          <Picker.Item
                            key={i}
                            style={{
                              color: '#0e1317',
                              fontFamily: 'Poppins-Medium',
                              fontSize: 14,
                            }}
                            label={client.fullName}
                            value={client.id}
                          />
                        ))}
                      </Picker>
                    </Item>
                          */}
                <View style={styles.cus_input_view}>


                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FCBF24',
                      height: 30,
                      borderRadius: 10
                    }}
                    onPress={this.toggleModal}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </Modal>
          </View>
        </View>
        <View style={{ flex: 1.7 }} />
      </Container>
    );
  }
}

const mapStateProps = (state) => {
  // console.log('1546545646544', state);
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
  const AllClientsData = state.ClientsReducer.AllClientsData;
  const TechnicianId = state.LoggedData.TechnicianId;
  const businessId = state.LoggedData.businessId;

  return {
    businessId,
    StoreLocationInfo,
    AllClientsData,
    TechnicianId,
  };
};

export default connect(mapStateProps)(Chat);

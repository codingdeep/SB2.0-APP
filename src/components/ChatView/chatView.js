import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  findNodeHandle,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { Container, Row, Col, Left, Grid, Input, Textarea } from 'native-base';
import ReciverMessage from './ReciverMessage/reciverMessage';
import SenderMessage from './SenderMessage/senderMessage';
import SenderImage from './SenderImage/senderImage';
import HeaderComponent from '../Header/header';
import {
  _getAllMessage,
  _AddMessage,
  _AddImage,
} from './../../Redux/SagaActions/ChatSagasAction';
// import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import Icons from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-picker';
import ReceiverImage from './ReceiverImage/ReceiverImage';
import { setMessageTimestamp } from './../Chat/Storage';
import { Appearance, useColorScheme } from 'react-native-appearance';
import { helperFunctions } from "../../_helpers";

const defaultMode = Appearance.getColorScheme() || 'light';

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      page: 0,
      count: 20,
      init: true,
      body: '',
      contentOffsetY: 0,
      loadMore: true,
    };
    this.arr = [];
  }

  componentDidMount() {
    console.log("threadId", this.props.navigation.state.params.thread.id);

    this.props.chat().setThreadId(this.props.navigation.state.params.thread.id);
    this.props.chat().setOnNewMessageThreadListner(this.onNewMessageThreadListner);
    this.getThreadMessages(false);
  }

  componentWillUnmount() {
    this.props.chat().setThreadMessage(null);
    this.props.chat().setOnNewMessageThreadListner(null);
  }

  onNewMessageThreadListner = () => {
    let self = this
    return function (thread, message) {
      if (self.props.navigation.state.params.thread.id == thread) {
        let prevSize = Object.keys(self.state.messages).length;
        let messages = self.state.messages;
        messages[message.id] = message;
        self.showMessages(prevSize, true, false);
      }
    }
  }

  getThreadMessages = async (scrollTo) => {
    let messages = await _getAllMessage(
      this.props.navigation.state.params.thread.id,
      this.state.page,
      this.state.count,
    );
    this.setMessages(messages, false, scrollTo);
  };

  rearrangeMessage = (messages) => {
    const prevSize = Object.keys(this.state.messages).length;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < messages.length; i++) {
        this.state.messages[messages[i].id] = messages[i];
      }
      return resolve({});
    });
  };

  getNewMessage = (messages) => {
    this.setMessages(messages, true, false);
  };

  setMessages = (messages, scrollCheck, scrollTo) => {
    let prevSize = Object.keys(this.state.messages).length;
    this.rearrangeMessage(messages).then((result) => {
      this.showMessages(prevSize, scrollCheck, scrollTo);
    });
  };

  showMessages = (prevSize, scrollCheck, scrollTo) => {
    this.setState({ messages: this.state.messages });
    if (scrollTo) {
      if (this) {
        this.scrollView.scrollTo({
          y: this.arr[Object.keys(this.state.messages).length - prevSize],
          animated: false,
        });
      }
    } else {
      setMessageTimestamp(
        this.props.navigation.state.params.thread.id,
        new Date(
          this.state.messages[
            Object.keys(this.state.messages)[
            Object.keys(this.state.messages).length - 1
            ]
          ].createdTime,
        )
          .getTime()
          .toString(),
      );
    }
    setTimeout(() => {
      if (this.state.init) {
        if (this && this.scrollView) this.scrollView.scrollToEnd({ animated: true });
      }
      this.setState({ init: false });
      if (scrollCheck) {
        if (prevSize < Object.keys(this.state.messages).length) {
          if (this && this.scrollView) this.scrollView.scrollToEnd({ animated: true });
        }
      }

      this.state.loadMore = true;
      setTimeout(() => {
        this.props.chat().setThreadMessage(this.getNewMessage);
      }, 2000);
    }, 1000);
  }

  sendMessage = async () => {
    let body = this.state.body;
    this.setState({ body: '' });
    let response = await _AddMessage(
      this.props.navigation.state.params.thread.id,
      body,
    );
    response.json().then(message => {
      let prevSize = Object.keys(this.state.messages).length;
      let messages = this.state.messages;
      messages[message.id] = message;
      this.showMessages(prevSize, true, false);
    })
  };

  _onScroll = (e) => {
    let windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (offset == 0) {
      // if (!this.state.end) {
      this.state.loadMore = false;
      this.state.page += 1;
      this.getThreadMessages(true);
      // }
    }
  };

  callImagePicker = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      width: 1920,
      height: 1080,
      fileSize: 1600000,
      maxHeight: 1080,
      maxWidth: 1920,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const optionsCamera = {
      title: 'Select Avatar',
      storageOptions: { skipBackup: true, path: 'images', cameraRoll: true, waitUntilSaved: true },
    };

    Alert.alert(
      `Select Source`,
      `Where do you want add image from?`,
      [
        {
          text: `Camera`,
          onPress: () => {

            try {
              ImagePicker.launchCamera(options, (response) => {
                console.log("response555", "llll");
                this.imageProcessor(response);
              });
            } catch (error) {
              console.log("response555", "llll");

            }

          },
        },
        {
          text: `Storage`,
          onPress: () => {
            ImagePicker.launchImageLibrary(options, (response) => {
              this.imageProcessor(response);
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  imageProcessor = async (response) => {

    console.log("response66666", response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = response.uri;
      let res = await _AddImage(
        this.props.navigation.state.params.thread.id,
        source,
      );
    }
  };

  render() {
    console.log("ReciverMessageAll", this.state.messages);

    console.log("ReciverMessageFile", JSON.stringify(this.state.messages[1531]));

    return (
      <SafeAreaView style={styles.pro_background}>

        <View style={{ justifyContent: "center", ...helperFunctions.headerHeight() }}>
          <HeaderComponent
            color={defaultMode === 'dark' ? '#ffffff' : "#0000ff"}
            title={
              this.props.navigation.state.params.thread.participants[0].user
                .fullName
            }
            {...this.props}
          />
        </View>
        <View style={{ height: 20 }} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={{ flex: 8, marginHorizontal: 20 }}>
          <View style={{ flex: 7 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={(view) => {
                this.scrollView = view;
              }}
              onScroll={this._onScroll}>
              {Object.keys(this.state.messages).map((key, index) => (
                <View
                  key={index}
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    this.arr[index] = layout.y;
                  }}>
                  {this.state.messages[key].createUser.id ==
                    this.props.navigation.state.params.thread.createUser.id && (
                      <>
                        {this.state.messages[key].fileUrls.length < 1 && (
                          <>
                            <ReciverMessage message={this.state.messages[key]} />
                            <View style={styles.messageGap}></View>
                          </>
                        )}
                        {this.state.messages[key].fileUrls.length > 0 && (
                          <>
                            <ReceiverImage message={this.state.messages[key]} />
                            <View style={styles.messageGap}></View>
                          </>
                        )}
                      </>
                    )}
                  {this.state.messages[key].createUser.id !=
                    this.props.navigation.state.params.thread.createUser.id && (
                      <>
                        {this.state.messages[key].fileUrls.length < 1 && (
                          <>
                            <SenderMessage
                              message={this.state.messages[key]}
                              key={key}
                            />
                            <View style={styles.messageGap}></View>
                          </>
                        )}
                        {this.state.messages[key].fileUrls.length > 0 && (
                          <>
                            <SenderImage message={this.state.messages[key]}
                              key={key}
                            />
                            <View style={styles.messageGap}></View>
                          </>
                        )}
                      </>
                    )}
                </View>
              ))}
              {/* <View style={{flex: 0.2}}></View>
        <View
          style={{
            flex: 0.6,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#979797',
              fontFamily: 'Poppins-Medium',
            }}>
            YESTERDAY, 7:43 PM
          </Text>
        </View> */}
              {/* Sender Text */}
              {/* <SenderMessage />
            <View style={styles.messageGap}></View> */}
              {/*
        <View style={{flex: 0.2}}></View>
         Sender Image

        <SenderImage /> */}

              {/* <View style={{flex: 0.2}}></View> */}
            </ScrollView>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#F1F0F5',
              paddingLeft: 20,
              borderRadius: 10,
            }}>
            <Grid>
              <Row>
                <Col style={{ width: '80%' }}>
                  {/* <Input rowSpan={5} placeholder="Say something..." /> */}
                  <TextInput
                    multiline
                    numberOfLines={5}
                    placeholder="Type here.."
                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                    editable
                    maxLength={1300}
                    value={this.state.body}
                    onChangeText={(e) => this.setState({ body: e })}
                  />
                  {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                </Col>
                <Col
                  style={{
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => this.callImagePicker()}>
                    <Icons name="picture" size={20} color="black" />
                  </TouchableOpacity>
                </Col>

                <Col
                  style={{
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => this.sendMessage()}>
                    <Image
                      source={require('../../Assets/chats/ic-arrows-right.png')}
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ChatView;

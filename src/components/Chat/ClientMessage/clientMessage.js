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
  Card,
  CardItem,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Label,
  Grid,
  Row,
  Col,
  Button,
  Text,
  ListItem,
  Badge,
  List,
  IconS
} from 'native-base';

import {
  Platform,
  View
} from 'react-native';
// import { Calendar } from 'react-native-calendars';

import CustomHeader from "../../Header/header";
import styles from "../styles";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


// ...


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    // this.onDayPress = this.onDayPress.bind(this);
  }



  render() {
    return (
      <Container >

        {<CustomHeader title={"Messages"} />}
        <View style={{ flex: 1, marginHorizontal: 40 }}>
          <View style={{ flex: 10, }}>
            <ScrollView>
              <List>
                <ListItem avatar style={styles.listItem} >
                  <Left>
                    <Thumbnail
                      style={styles.userImage}
                      square source={require('../../../Assets/chats/adatar.jpg')}
                    />
                  </Left>
                  <Body style={styles.body}>
                    <Title style={styles.title}>Kumar Pratik</Title>
                    <Title numberOfLines={2} style={styles.messageSubBody}>Doing what you like will always keep you happy. Doing what you like will always keep you happy </Title>
                    <Title style={styles.minutesAgo}>23 m</Title>
                  </Body>
                  <Right>
                    <Badge style={styles.badge}>

                    </Badge>
                  </Right>
                </ListItem>
              </List>
              <List>
                <ListItem avatar style={styles.listItem} >
                  <Left>
                    <Thumbnail
                      style={styles.userImage}
                      square source={require('../../../Assets/chats/adatar.jpg')}
                    />
                  </Left>
                  <Body style={styles.body}>
                    <Title style={styles.title}>Kumar Pratik</Title>
                    <Title numberOfLines={2} style={styles.messageSubBody}>Doing what you like will always keep you happy. Doing what you like will always keep you happy </Title>
                    <Title style={styles.minutesAgo}>23 m</Title>
                  </Body>
                  <Right>
                    <Badge style={styles.badge}>

                    </Badge>
                  </Right>
                </ListItem>
              </List>
              {/* <Label style={styles.label} /> */}

            </ScrollView>
          </View>
          <View style={{ flex: 1, }}>
            <ListItem avatar >
              <Left />
              <Body style={{ borderWidth: 0, borderColor: 'transparent' }} />
              <Right style={{ marginRight: 0, paddingRight: 0 }}>
                <TouchableOpacity style={styles.plusBackground}>
                  <Thumbnail
                    style={styles.plusImage}
                    circular source={require('../../../Assets/chats/plus.png')}
                  />
                </TouchableOpacity>

              </Right>

            </ListItem>
          </View>
          <View style={{ flex: 2, }}>


          </View>

        </View>
      </Container>
    );
  }
}

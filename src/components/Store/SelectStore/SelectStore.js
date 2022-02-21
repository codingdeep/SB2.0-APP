/* eslint-disable */
import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import {
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { StoreData } from '../../../Redux/Action/StoreData';
import styles from '../styles';
import LOADER from '../../Loader/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import authHeader from '../../ImportantFunction/authHeader';
import { AlredyLogedInUser } from '../../../Redux/Action/LogIn';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { url } from 'inspector';
import { BaseApi } from '../../ImportantFunction/baseApi'

const salonInfo = [
  {
    id: 1,
    name: 'Eterna Day Spa',
    logoUrl:
      'https://s3.amazonaws.com/zoracorp/bianca/472822496/images/meta/logo/et_n.jpg',
  },
  {
    id: 2,
    name: 'Cloud 9 Salon',
    logoUrl:
      'https://s3.amazonaws.com/zoracorp/bianca/123456789/images/meta/logo/cloud.jpg',
  },
  {
    id: 3,
    name: 'Salon H2O',
    logoUrl:
      'https://s3.amazonaws.com/zoracorp/bianca/234567890/images/meta/logo/salon-h2o.jpg',
  },
  {
    id: 4,
    name: 'Eterna Lash & Brow Bar',
    logoUrl:
      'https://s3.amazonaws.com/zoracorp/bianca/345678901/images/meta/logo/elbb.jpg',
  },
];
const apiPath = BaseApi;
class SelectStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false
    };
  }
  componentDidMount = async () => {
    try {
      // setTimeout(() => {
      console.log("ddddddd", this.props.locationId);
      if (this.props.businessId == null) {
        console.log("ddddddd22", this.props.locationId);
        const value = await AsyncStorage.getItem('User@Data');
        if (value !== null) {


          let data = JSON.parse(value);
          console.log("ddddddd", data);

          this.props.dispatch(
            AlredyLogedInUser(
              data
            ),
          );

        }
      }
      // }, 500);


    } catch (error) {
      // Error saving data
    }


  }


  salonApiCall = businessId => {
    this.props.navigation.navigate('SELECTLOCATION');
    this.props.dispatch(StoreData(businessId, this.props.navigation));
    // console.log("lllllll", this.props.navigation);

    // this.props.navigation.navigate("Auth")
  };
  imageLoaded = () => {
    this.setState({ imageLoaded: true })
  }
  render() {
    const { businessId } = this.props;
    console.log('businessId', businessId);
    return this.props.businessId == null ? (
      <LOADER />
    ) : (
        <Container style={{ paddingHorizontal: 45 }}>
          <StatusBar hidden />

          <View style={styles.loginView}>
            <Text style={styles.LoginText}>Select </Text>
            <Text style={styles.LoginText}>Your Store</Text>
          </View>
          <View style={styles.salonList}>

            {businessId != null &&
              // businessId.map
              salonInfo.map(
                (value, index) =>
                  businessId == value.id && (
                    <Container key={index}>
                      <Content>
                        <TouchableOpacity
                          style={styles.imageButton}
                          onPress={() => {
                            this.salonApiCall(value.id);
                          }}>
                          <Image
                            resizeMode="cover"
                            source={{ uri: salonInfo[index].logoUrl }}
                            style={styles.inputIcon}
                            onLoadEnd={this.imageLoaded}
                          />
                        </TouchableOpacity>
                      </Content>
                    </Container>
                  ),
              )}

          </View>

          <View style={styles.line}>
            <View
              style={{
                backgroundColor: '#F1F0F5',
                width: 166,
                height: 5,
                borderRadius: 5,
              }}
            />
          </View>
        </Container>
      );
  }
}

const mapStateProps = state => {
  const businessId = state.LoggedData.businessId;
  const locationId = state.LoggedData.locationId;
  return {
    businessId,
    locationId,
  };
};

export default connect(mapStateProps)(SelectStore);

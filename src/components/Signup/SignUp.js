//disable-eslint
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Container, Item, Input, Icon, Title } from 'native-base';
import { helperFunctions } from '../../_helpers';
import { Log_in_checker } from '../../Redux/Action/LogIn';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';

const { width, height } = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { creatTech } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import HeaderComponent from '../Header/header'
import { color } from 'react-native-reanimated';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      emailAddress: '',
      password: '',
      loader: false,
      secureTextEntry: true
    }
  }

  _Login() {
    Keyboard.dismiss();
    this.setState({
      loader: true,
    });

    if (
      this.state.salon_id === '' ||
      this.state.user_name === '' ||
      this.state.password === ''
    ) {
      this.setState({
        loader: false,
      });
      Alert.alert('Please fill input box and try again!');
    } else {
      this.props.dispatch(
        Log_in_checker(
          this.state.salon_id + '_' + this.state.user_name,
          this.state.password,
          false,
          this.props.navigation,
        ),
      );
    }
  }

  _UserRegistration = () => {
    Keyboard.dismiss();
    this.setState({
      loader: true,
    });
    let user = {
      location: {
        id: 101,
      },
      user: {
        business: {
          id: 2,
        },
        emailAddress: this.state.emailAddress,
        mobileNumber: "30123113" + (Math.floor(Math.random() * (90 - 10 + 1)) + 10),
        birthDate: '1988-01-01',
        names: {
          first: this.state.first,
          last: this.state.last,
          nick: this.state.last,
        },
        gender: 'Male',
        role: 'TECHNICIAN',
        referredByUser: {
          referralToken: 'CL9S',
        },
        password: this.state.password,
        emailNotificationEnabled: true,
        smsNotificationEnabled: true,
        selfBookingEnabled: true,
      },
      clockReminderEnabled: true,
      customerBookingAllowed: true,
      instagramUrl: 'https://www.instagram.com/301studiobl/',
      accountStatus: 'Active',
      representationColor: '#791b1b',
      team: 'Hair',
      expertise: 'Stylist',
      biography: 'Not ready yet',
      specialties: [
        'Hair Extensions',
      ],
      productCommissionPercentage: 0,
      compensationStrategy: 'Commission',
      strategyWage: 0,
      cashPaymentPercentage: 0,
      displayOrder: 100,
    };

    if (
      this.state.first == "" ||
      this.state.last == "" ||
      this.state.password == "" ||
      this.state.emailAddress == ""
    ) {
      this.setState({
        loader: false,
      });
      Alert.alert("Please fill input box and try again!");
    } else {

      console.log(Math.floor(Math.random() * (90 - 10 + 1)) + 10)
      console.log(user);
      creatTech(user).then(response => {
        this._Login()
        console.log('==================================', response);
      }).catch(e => {
        console.log(e);
      })
    }

  };
  _Login() {
    // await AsyncStorage.setItem(
    //   'LogInFirstTime',
    //   JSON.stringify("LogInFirstTime"))

    this.setState({
      loader: true,
    });


    this.props.dispatch(
      Log_in_checker(
        2 + '_' + this.state.emailAddress,
        this.state.password,
        false,
        this.props.navigation,
      ),
    );

  }
  render() {
    return (
      <Container>
        <View style={styles.container}>

          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
            <View>
              <View style={{ marginTop: 40 }}>
                <HeaderComponent {...this.props} />
                <Title style={{ color: '#424E9C' }}>REGISTRATION</Title>
              </View>
              <View style={{ height: height - 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <Item regular style={{
                  ...styles.textInput, ...helperFunctions.lightDarkBg(),
                  borderBottomColor: helperFunctions.lightAss(),
                }}>
                  <Input
                    style={{ color: helperFunctions.darkLightColor() }}
                    placeholder="First name"
                    placeholderTextColor="#B9B9B9"
                    value={this.state.first}
                    onChangeText={e => this.setState({ first: e })}
                  />
                  <Feather name="user" color="#999999" size={20} />
                </Item>
                <Item regular style={{
                  ...styles.textInput, ...helperFunctions.lightDarkBg(),
                  borderBottomColor: helperFunctions.lightAss(),
                }}>
                  <Input
                    style={{ color: helperFunctions.darkLightColor() }}
                    placeholder="Last name"
                    placeholderTextColor="#B9B9B9"
                    value={this.state.last}
                    onChangeText={e => this.setState({ last: e })}
                  />
                  <Feather name="user" color="#999999" size={20} />
                </Item>
                <Item regular style={{
                  ...styles.textInput, ...helperFunctions.lightDarkBg(),
                  borderBottomColor: helperFunctions.lightAss(),
                }}>
                  <Input
                    style={{ color: helperFunctions.darkLightColor() }}
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Email"
                    placeholderTextColor="#B9B9B9"
                    value={this.state.emailAddress}
                    onChangeText={e => this.setState({ emailAddress: e })}
                  />

                  <CusIconDesign
                    // style={{ width: "20%" }}
                    IconFrom="AntDesign"
                    name="mail"
                    textAlign="right"
                    color="#999999"
                    size={20}
                  />
                </Item>
                <Item regular style={{
                  ...styles.textInput, ...helperFunctions.lightDarkBg(),
                  borderBottomColor: helperFunctions.lightAss(),
                }}>
                  <Input
                    style={{ color: helperFunctions.darkLightColor() }}
                    placeholder="Password"
                    secureTextEntry={this.state.secureTextEntry}
                    placeholderTextColor="#B9B9B9"
                    value={this.state.password}
                    onChangeText={e => this.setState({ password: e })}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
                    <Feather
                      name={this.state.secureTextEntry === true ? "eye-off" : "eye"}
                      color={this.state.secureTextEntry === true ? "grey" : helperFunctions.yellow()}
                      size={20} />
                  </TouchableOpacity>
                </Item>
                <View style={{ height: 10 }}></View>


                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ textAlign: 'center' }}>Already have an account? LOGIN</Text></TouchableOpacity>
                </View>


                <View style={{ ...styles.button, ...helperFunctions.lightDarkBg() }}>
                  <TouchableWithoutFeedback
                    onPress={() => this._UserRegistration()}
                    style={{
                      height: 55,
                      ...helperFunctions.lightDarkBg(),
                      justifyContent: "center",
                      width: "100%",
                    }}>
                    {this.state.loader == true ? (
                      <ActivityIndicator size="small" color="#999" />
                    ) : (
                      <Text
                        style={{
                          color: helperFunctions.darkLightColor(),
                          fontSize: 20,
                          fontWeight: "700",
                          width: "100%",
                          textAlign: "center",
                        }}>SIGN UP</Text>
                    )}
                  </TouchableWithoutFeedback>
                </View>
              </View>

            </View>
          </KeyboardAvoidingView>

        </View>

      </Container>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  button: {
    ...helperFunctions.deviceWiseHeight(50, 50, 60, 60),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    ...helperFunctions.deviceWiseWidth(300, 300, 250, 250),
    alignSelf: "center",
    marginVertical: 5,
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  textInput: {
    height: 55,
    borderBottomWidth: 0.5,
    marginHorizontal: 30,
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#fff",
    marginLeft: 30,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
const mapStateProps = state => {
  const loader = state.LoggedData.loader;
  const errorMsg = state.LoggedData.errorMsg;
  return {
    errorMsg,
    loader,
  };
};
export default connect(mapStateProps)(SignUp);

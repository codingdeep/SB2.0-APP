import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Icon, Button} from 'native-base';
import {connect} from 'react-redux';
import {
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Log_in_checker} from '../../Redux/Action/LogIn';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salon_id: '',
      // salon_id: '3',
      user_name: '',
      // user_name: 'mahedi0018@gmail.com',
      password: '',
      // password: 'cloud9',
      loader: false,
    };
  }
  componentDidMount() {}
  _Login() {
    // await AsyncStorage.setItem(
    //   'LogInFirstTime',
    //   JSON.stringify("LogInFirstTime"))

    this.setState({
      loader: true,
    });

    if (
      this.state.salon_id == '' ||
      this.state.user_name == '' ||
      this.state.password == ''
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

  static getDerivedStateFromProps(props, state) {
    // console.log("errorMsg", props.errorMsg)
    // props.errorMsg !== '' ? Alert.alert(props.errorMsg) : null;

    return {
      loader: props.loader,
    };
  }

  render() {
    // this.props.navigation.state.routeName

    return (
      <KeyboardAvoidingView style={{flex: 1, paddingHorizontal: 45}}>
        <StatusBar hidden />

        <View style={styles.loginView}>
          <Text style={styles.LoginText}>Log in</Text>
        </View>
        <View style={styles.loginFormView}>
          <Form>
            <Item regular style={styles.itemSalonId}>
              <Input
                placeholder="Salon ID"
                placeholderTextColor="#B9B9B9"
                value={this.state.salon_id}
                onChangeText={(e) => this.setState({salon_id: e})}
              />
              <Image
                resizeMode="stretch"
                source={require('../../Assets/ic-security-secured-profile.jpg')}
                style={styles.inputIcon}
              />

              {/* <Thumbnail square small source={} /> */}
            </Item>

            <View style={{height: 25}} />
            <Item regular style={styles.itemSalonId}>
              <Input
                // style={{ width: "80%" }}
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Username"
                placeholderTextColor="#B9B9B9"
                value={this.state.user_name}
                onChangeText={(e) => this.setState({user_name: e})}
              />
              {/* <View style={{ width: 25, height: 25 }}> */}
              <CusIconDesign
                // style={{ width: "20%" }}
                IconFrom="AntDesign"
                name="user"
                textAlign="right"
                color="#0E1317"
                size={18}
              />
              {/* <Image
                resizeMode="stretch"
                source={require('../../Assets/ic-actions-user.png')}
                style={styles.inputIcon}
              /> */}
              {/* </View> */}
            </Item>
            <View style={{height: 25}} />
            <Item regular style={styles.itemSalonId}>
              <Input
                style={{width: '80%'}}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#B9B9B9"
                value={this.state.password}
                onChangeText={(e) => this.setState({password: e})}
              />
              <CusIconDesign
                IconFrom="SimpleLineIcons"
                name="lock"
                textAlign="right"
                color="#0E1317"
                size={18}
              />
              {/* <Image
                resizeMode="stretch"
                source={require('../../Assets/ic-security-locked.png')}
                style={styles.inputIcon}
              /> */}
            </Item>
          </Form>
        </View>

        <View style={styles.loginFormButton}>
          <View style={styles.loginFormButton}>
            <Button
              rounded
              onPress={() => this._Login()}
              style={{
                height: 49,
                backgroundColor: '#FCBF24',
                justifyContent: 'center',
                width: '100%',
              }}>
              {this.state.loader == true ? (
                <ActivityIndicator size="small" color="#424E9C" />
              ) : (
                <Text
                  style={{
                    color: '#424E9C',
                    fontSize: 18,
                    fontWeight: '700',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  Log In
                </Text>
              )}
            </Button>
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
        </View>
      </KeyboardAvoidingView>
    );
  }
}



const mapStateProps = (state) => {
  const loader = state.LoggedData.loader;
  const errorMsg = state.LoggedData.errorMsg;
  return {
    errorMsg,
    loader,
  };
};

export default connect(mapStateProps)(LogIn);

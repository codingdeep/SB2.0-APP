import React from 'react';
import { connect } from 'react-redux';
import { Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Container, View, Grid, Row, Col } from 'native-base';
import CustomSwitch from '../Profile/CustomSwitch/customSwitch';
import CustomBlock from './CuastomBlock/CustomBlock';
import CustomCal from '../Sales/CustomCalander/customCalander';

import HeaderComponent from '../Header/header';

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     loader: props.loader,
  //   };
  // }

  render() {
    return this.state.loader == true ? (
      <LOADER />
    ) : (
        <Container style={{ paddingLeft: 35, paddingRight: 35 }}>
          <StatusBar hidden />
          <View style={{ height: 80 }}>
            <Grid>
              <Row>
                <Col style={{ alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.goBack()
                    }
                  >
                    <Image source={require('../../Assets/ic-arrows-left.png')} />
                  </TouchableOpacity>
                </Col>
                <Col style={{ alignSelf: 'center', width: '50%' }}>
                  <Text style={styles.custom_header}>Notifications</Text>
                </Col>
                <Col></Col>
              </Row>
            </Grid>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: 1088,
              width: '100%',
            }}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={styles.custom_header_small}>Team</Text>
            </View>
            {/* Block A */}
            <CustomBlock SwitchtitleName="Check In Reminder" val={false} />
            {/* End Of Block A */}
            {/* Block B */}
            <CustomBlock SwitchtitleName="Clock Out Reminder" val={true} />
            {/* End Of Block B */}
            {/* Block C */}
            <View
              style={{
                height: 110,
                paddingTop: 15,
              }}>
              <Grid>
                <Row>
                  <CustomSwitch
                    titleName={'When I Enter a Job Site'}
                    switchPropsVal={true}
                  />
                </Row>
                <Row>
                  <CustomSwitch
                    titleName={'When I Leave a Job Site'}
                    switchPropsVal={true}
                  />
                </Row>
              </Grid>
            </View>
            {/* End Block C */}
            {/* Block D */}
            <View style={{ height: 10, backgroundColor: '#FFF' }}></View>
            {/* End Block D */}
            {/* Block E */}
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={styles.custom_header_small}>Days</Text>
            </View>
            {/* End Block E */}
            {/* Block G */}
            <View style={{ height: 120 }}>
              <Grid>
                <Row>
                  <CustomCal status={'active'} calBool={true} />

                  <CustomCal status={'inactive'} calBool={true} others={true} />

                  <CustomCal status={'inactive'} calBool={true} others={true} />
                  <CustomCal status={'inactive'} calBool={true} others={true} />
                  <CustomCal status={'inactive'} calBool={true} others={true} />
                </Row>
                <Row>
                  <CustomCal status={'inactive'} calBool={true} others={true} />
                  <CustomCal status={'inactive'} calBool={true} others={true} />
                </Row>
              </Grid>
            </View>
            <View style={{ height: 50 }}>
              <Text style={styles.custom_small_text}>
                You'll receive the clock in and clock out reminders on the
                selected days only.
            </Text>
            </View>
            {/* End BLock G */}
            {/* Block H */}
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={styles.custom_header_small}>Team</Text>
            </View>
            {/* End Block H */}
            {/* Block I */}
            <View
              style={{
                height: 110,
                paddingTop: 15,
              }}>
              <Grid>
                <Row>
                  <CustomSwitch
                    titleName={'Check In for 12h'}
                    switchPropsVal={true}
                  />
                </Row>
                <Row>
                  <CustomSwitch
                    titleName={'Check In for 24h'}
                    switchPropsVal={true}
                  />
                </Row>
              </Grid>
            </View>
            {/* End Block I */}

            {/* Block K */}
            <View style={{ height: 50 }}>
              <Text style={styles.custom_small_text}>
                You'll receive a notification if you've been on the clock for 12+
                hours and/or 24+ hours straight.
            </Text>
            </View>
            {/* End BLock K */}

            <View style={{ height: 10 }}></View>
          </ScrollView>
        </Container>
      );
  }
}

const mapStateProps = state => {
  return {};
};

export default connect(mapStateProps)(Reminder);

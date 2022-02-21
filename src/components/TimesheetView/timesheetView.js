/* eslint-disable */
import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Col, Row, Container, Grid } from 'native-base';
import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CustomHeaderRow from './CustomHeaderRow/customHeaderRow';
import PathCreator from './PathCreator/pathCreator';
// import HeaderComponent from './CustomHeader/customHeader';
import HeaderComponent from '../Header/header';
import CustomAcFooter from '../TimeClock/CustomFooter/customFooter';
import {
  GetTodayDetailsTime
} from '../../Redux/Action/CLockActions';

import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import LOADER from '../Loader/Loader';
import Moment from "moment"
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()

import { Appearance, useColorScheme } from 'react-native-appearance';

const defaultMode = Appearance.getColorScheme() || 'light';

// StoreDataReducer

class TimesheetView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLatitude: null,
      currentlongitude: null
    }

    this.navigationWillFocusListener = props.navigation.addListener(
      "willFocus",
      () => {
        this.todayDetailsTime()

      }
    );
    this.mapRef = null;
  }

  todayDetailsTime = () => {
    const { locationId } = this.props

    this.props.dispatch(
      GetTodayDetailsTime(locationId),
    )

  }

  // static getDerivedStateFromProps(props, state) {
  //   // console.log("errorMsg", props.errorMsg)


  //     console.log('okkoko');
  //   }

  componentDidMount() {

    let mmm = Geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentlongitude: position.coords.longitude
        })
        console.log("mmm", position)
        return position
      }
    )


  }

  render() {
    const timeSheetData = this.props.navigation.getParam('timeSheetData')

    console.log("timeSheetData", timeSheetData)
    // console.log("timeSheetData", this.props.locations[0])
    const { currentLatitude, currentlongitude } = this.state


    return !currentLatitude ? (
      <LOADER />
    ) : (
        <Container style={styles.pro_background}>
          <View style={{ flex: 1.5, justifyContent: "center" }}>
            <HeaderComponent title="Timesheet Details" {...this.props}
              color={defaultMode === 'dark' ? '#ffffff' : "#0000ff"}
            />
            {/* <CUStomHeader {...this.props} /> */}
            {/* @2nd time block */}
          </View>
          <View style={{ flex: 8 }}>
            <View
              style={styles.timeEntry}>
              <Grid>
                <Row>
                  <Col style={{ width: '70%', alignSelf: 'center' }}>
                    <Text style={styles.timeText}>
                      Time Entry - {Moment(timeSheetData.period.from).format("hh:mm A")}
                    </Text>
                  </Col>

                </Row>
              </Grid>
            </View>
            {/* @3rd map Block */}
            <View style={{ flex: 2.5 }}>

              <MapView
                ref={(ref) => { this.mapRef = ref }}
                style={{ flex: 1 }}
                onMapReady={() => this.mapRef.fitToCoordinates(

                  [
                    {
                      latitude: timeSheetData.startAddress.latitude,
                      longitude: timeSheetData.startAddress.longitude,
                    },
                    {
                      latitude: timeSheetData.endAddress.latitude,
                      longitude: timeSheetData.endAddress.longitude,
                    },

                  ], { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: timeSheetData.startAddress.latitude,
                    longitude: timeSheetData.startAddress.longitude,
                    // latitude: this.props.locations[0].address.latitude,
                    // longitude: this.props.locations[0].address.longitude,
                  }}
                  title={'title'}
                  description={'Start Time'}
                />
                <MapView.Marker
                  coordinate={{

                    latitude: timeSheetData.endAddress.latitude,
                    longitude: timeSheetData.endAddress.longitude,

                    // latitude: this.props.locations[0].address.latitude,
                    // longitude: this.props.locations[0].address.longitude,
                  }}
                  title={'title1'}
                  description={'End Time'}
                />
              </MapView>
            </View>
            {/* Fake Blank */}
            <View style={{ flex: 0.2, backgroundColor: colors.backgroundColor }}></View>
            {/* CustomHeaderRow */}
            <View style={{ flex: 3.2 }}>
              <ScrollView>
                <CustomHeaderRow
                  time={Moment(timeSheetData.period.from).format("hh:mm A")}
                  // time={timeSheetData.period.from}
                  value="Clock In"
                  showIcon={true}
                />
                {/* PathGenarator */}
                <PathCreator value={1.3} subMenu={true} />
                {/* CustomHeaderRow */}

                {/* MAP */}

                {timeSheetData.breaks.map(e => (
                  <View style={{ flex: 2 }}>
                    <CustomHeaderRow

                      time={Moment(e.period.from).format("hh:mm A")}
                      value="Start Break"
                      showIcon={false}
                    />
                    {/* Bolck */}
                    {/* PathGenarator */}
                    <PathCreator value={1.3} />
                    {/* CustomHeaderRow */}

                    <CustomHeaderRow

                      time={Moment(e.period.to).format("hh:mm A")}
                      value="End Break"
                      showIcon={false}
                    />
                    {/* PathGenarator */}
                    <PathCreator value={1.3} />
                  </View>
                ))}

                {/* END MAP */}

                <CustomHeaderRow
                  time={Moment(timeSheetData.period.to).format("hh:mm A")}
                  value="End job - Sales"
                  showIcon={false}
                />
              </ScrollView>
            </View>
            {/* PathGenarator */}
            {/* <PathCreator value={0.6} /> */}
            {/* Custom Footer */}

            <CustomAcFooter props={this.props} />
          </View>
        </Container>
      );
  }
}

const mapStateProps = state => {
  const locations = state.StoreDataReducer.StoreAllData.locations;
  const Break = state.Clock.breakHistory;
  const start_time = state.Clock.start_time;
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;

  return {
    locations,
    Break,
    start_time,
    locationId
  };
};

export default connect(mapStateProps)(TimesheetView);

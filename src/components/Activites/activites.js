/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, Image, Text, FlatList } from 'react-native';
import styles from './styles';
import { Container, View, Col, Row } from 'native-base';

import CustomBlock from './Customblock/customblock';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderComponent from '../Header/header';
import RefreshFooter from "../ImportantFunction/refreshFooter"
import { GetActivityNextPage } from '../../Redux/SagaActions/extends_TodayAllDataAction';
import {helperFunctions} from "../../_helpers";
import {Appearance, AppearanceProvider} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
import * as Animatable from 'react-native-animatable';
class Activites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllActivitiesData: this.props.navigation.state.params.AllActivitiesData,
      footerLoading: false,
      offSet: 0,
      load: false
    };
    setTimeout(() => {
      this.state.load = true
    }, 500);
  }
  componentDidMount() {

  }
  handleRefresh = () => {
    if (!this.state.load) {
      return;
    }
    this.state.load = false
    console.log("adsfasfasfd");

    let offSet = this.state.offSet + 1
    this.setState({ footerLoading: true })

    GetActivityNextPage(
      this.props.locationId.id,
      offSet ,
      (response) => {
        console.log("response.Body", response)

        if (response && response.length > 0) {
          this.setState({
            AllActivitiesData: [...this.state.AllActivitiesData, ...response],
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
    return (
      <Container style={{...styles.pro_background,...helperFunctions.lightDarkBg()}}>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <HeaderComponent  color={defaultMode === 'dark' ? 'white' : '#424E9C'} title="Activities" {...this.props} />
        </View>
        {/* <ScrollView style={styles.main_container}>
          <CustomBlock {...this.props} />
        </ScrollView> */}
        <View style={styles.main_container}>
          <FlatList
            // style={styles.main_container}
            data={this.state.AllActivitiesData}
            keyExtractor={(item, index) => item + index}
            // renderItem={({ item }) => <Item title={item} />}
            renderItem={({ item,index }) => {
              return (
                <CustomBlock index={index} {...item} />
              )
            }}
            onEndReached={this.handleRefresh}
            onEndReachedThreshold={0}

            ListFooterComponent={
              <RefreshFooter
                loading={this.state.footerLoading}
              />
            }
            // showsHorizontalScrollIndicator={false}
            // scrollToOverflowEnabled={false}
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


export default connect(mapStateProps)(Activites);

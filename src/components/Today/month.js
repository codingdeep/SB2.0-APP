/* eslint-disable */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {helperFunctions} from "../../_helpers";
import * as Animatable from 'react-native-animatable';
class MonthView extends Component {
  render() {
    const { AllTasksData, AllSalesData } = this.props;
    console.log("AllSalesData2222", AllSalesData.thisMonth);
    if (!AllSalesData || AllSalesData.length >= 0) {

      console.log("AllSalesDataToday", AllSalesData);
      console.log("AllSalesData", AllSalesData.today);
    }
    if (AllSalesData === undefined || AllSalesData.length == 0) {
      // array empty or does not exist
      console.log("AllSalesData22", AllSalesData.today);
    }
    console.log('asdasd',this.props.today)

    return (
      <View style={{ flex: 1,
        ...helperFunctions.defaultPadding() }}>


        {/* ---------------month fist row--------------- */}
        {this.props.today && Object.keys(this.props.today).length > 0 && (
          <Animatable.View animation="fadeInLeft"  style={styles.firstBox}>
            <Animatable.View animation="fadeInLeft" style={styles.firstItem}>
              <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>Guests</Text>
            </Animatable.View>
            <View style={[styles.firstItem, styles.firstItem2]}>
              <Text style={[styles.TextStyle, { color: '#58eb67',...helperFunctions.mediumFont() }]}>{this.props.today.totalNoOfGuests}</Text>
            </View>
            <View style={[styles.firstItem, {}]}>
              <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>Gross</Text>
            </View>
            <View style={[styles.firstItem, { alignItems: 'flex-end' }]}>
              <Text style={[styles.TextStyle, { color: '#58eb67',...helperFunctions.mediumFont() }]}>
                ${(AllSalesData.today.totalChargeAmount * 1 ).toFixed(2) }
              </Text>
            </View>
          </Animatable.View>
        )}
        <View style={styles.borderStyle}></View>
        {/* --------------- month second row--------------- */}
        <Animatable.View animation="fadeInRight" style={styles.firstBox}>
          <View style={styles.firstItem}>
            <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>New</Text>
          </View>
          <View style={[styles.firstItem, styles.firstItem2]}>
            <Text style={[styles.TextStyle, { color: '#58eb67',...helperFunctions.mediumFont() }]}>

              {AllSalesData === undefined || AllSalesData.length == 0 ? 0 : this.props.today.noOfNewGuests}
            </Text>
          </View>
          <View style={[styles.firstItem, {}]}>
            <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>Services</Text>
          </View>
          <View style={[styles.firstItem, { alignItems: 'flex-end' }]}>
            <Text style={[styles.TextStyle, { color: '#f20747',...helperFunctions.mediumFont() }]}>

              ${this.props.today.serviceChargeAmount.toFixed(2)}
            </Text>
          </View>
        </Animatable.View>
        <View style={styles.borderStyle}></View>
        {/* ---------------month third row--------------- */}
        <Animatable.View animation="fadeInLeft" style={styles.firstBox}>
          <View style={styles.firstItem}>
            <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>Repeat</Text>
          </View>
          <View style={[styles.firstItem, styles.firstItem2]}>
            <Text style={[styles.TextStyle, { color: '#f20747',...helperFunctions.mediumFont() }]}>{this.props.today.noOfRepeatGuests}</Text>
          </View>
          <View style={[styles.firstItem, {}]}>
            <Text style={{...styles.TextStyle,...helperFunctions.mediumFont()}}>Products</Text>
          </View>
          <View style={[styles.firstItem, { alignItems: 'flex-end' }]}>
            <Text style={[styles.TextStyle, { color: '#58eb67',...helperFunctions.mediumFont() }]}>${this.props.today.productPurchaseAmount.toFixed(2)}</Text>
          </View>
        </Animatable.View>
        <View style={{height: 30}}></View>
      </View>
    );
  }
}

const mapStateProps = state => {
  const AllTasksData = state.GetAllTodayReducer.AllTasksData;
  const AllSalesData = state.GetAllTodayReducer.AllSalesData;
  const AllActivitiesData = state.GetAllTodayReducer.AllActivitiesData;
  const TodayLoader = state.GetAllTodayReducer.TodayLoader;
  return {
    AllTasksData,
    AllSalesData,
    AllActivitiesData,
    TodayLoader
  };
};
export default connect(mapStateProps)(MonthView);

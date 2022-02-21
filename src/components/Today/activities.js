/* eslint-disable */
import React, { Component,Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Left, Right } from 'native-base';
import styles from './styles';
import { connect } from 'react-redux';
import Moment from 'moment';
import {helperFunctions} from "../../_helpers";
import * as Animatable from "react-native-animatable";

class Activities extends Component {

  render() {
    const { AllActivitiesData } = this.props;
    console.log("AllActivitiesData", AllActivitiesData);

    return (
      <View style={{ flex: 1,...helperFunctions.defaultPadding()}}>
        {AllActivitiesData && (
          <Fragment><View style={{...styles.activityName,marginTop: 30}}>
            <Left>
              <Text style={{...styles.month,...helperFunctions.mediumFont(),...helperFunctions.themeColor()}}>Activities</Text>
            </Left>
            <Right>
              <TouchableOpacity
                style={{ backgroundColor: "#FCBF24", borderRadius: 25, padding: 5 }}
                onPress={() => {
                  this.props.navigation.navigate('ActivitiesScreen', {
                    ...this.props,
                  });
                }}>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </Right>
          </View>
            <View style={{height: 15}}></View>
          </Fragment>


        )}

          <View style={{ flex: 4 }}>
            {AllActivitiesData && AllActivitiesData.length > 0 && AllActivitiesData.slice(0,4).map((ac,key)=>{
              return <Animatable.View key={key} animation={key%2 == 0 ? "fadeInLeft" : "fadeInRight"} style={{ flex: 1 }}>
                <View style={[styles.firstBox, {}]}>
                  <View style={styles.midBoxLeft2}>
                    <Text style={[styles.TextStyle,{...helperFunctions.mediumFont(),...helperFunctions.darkLightColor()}]}>
                      {ac.createUser.names.first +
                      ' ' +
                      ac.createUser.names.last}
                    </Text>
                  </View>
                  <View style={styles.midBoxRight3}>
                    <Text style={[styles.minute,{...helperFunctions.textSize()}]}>
                      {ac.readableCreateTime}
                    </Text>
                  </View>
                </View>
                <View style={[styles.firstBox, {}]}>
                  <Text style={{...styles.longText,...helperFunctions.assColor(),...helperFunctions.smallFont(),fontWeight:'bold',lineHeight: 30}}>{ac.message}</Text>
                </View>
                {key < 3 &&
                  <View style={styles.borderStyle}></View>
                }
                <View style={{height: 8}}></View>
              </Animatable.View>

            })}



            {/*
            <View style={[styles.firstBox, { marginVertical: 10 }]}>
              <View style={styles.midBoxLeft2}>
                <Text style={[styles.TextStyle]}>
                  {AllActivitiesData[1].createUser.names.first +
                    ' ' +
                    AllActivitiesData[1].createUser.names.last}
                </Text>
              </View>
              <View style={styles.midBoxRight3}>
                <Text style={styles.minute}>
                  {Moment(AllActivitiesData[1].createdTime).toNow(true)} ago
              </Text>
              </View>
            </View>
            <Text style={styles.longText}>{AllActivitiesData[1].message}</Text>
            <View style={styles.borderStyle}></View> */}
          </View>


      </View>
    );
  }
}

const mapStateProps = state => {
  const AllActivitiesData = state.GetAllTodayReducer.AllActivitiesData;
  return {
    AllActivitiesData,
  };
};
export default connect(mapStateProps)(Activities);

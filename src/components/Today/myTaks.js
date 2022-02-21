/* eslint-disable */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { Left, Right, Label } from 'native-base';
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import {helperFunctions} from "../../_helpers";
import * as Animatable from 'react-native-animatable';

class Mytasks extends Component {
  editTasks = () => {
    // this.props.navigation.navigate('EditTask');
  };
  addTasks = () => {
    this.props.navigation.navigate('AddTask');
  };
  render() {

    const { AllTasksData } = this.props;
    return (
      <View style={{ flex: 1,...helperFunctions.defaultPadding(),paddingTop: 20,paddingBottom: 20 }}>
        {/* ----------My Tasks box------------- */}
        <View style={{marginBottom: 20,...helperFunctions.flexRow(),justifyContent:'space-between'}}>
          <View>
            <Text style={{...styles.month,...helperFunctions.mediumFont(),...helperFunctions.themeColor()}}>My tasks</Text>
          </View>

          <View style={{}}>
            <View>
              <TouchableOpacity
                style={{ backgroundColor: "#FCBF24", borderRadius: 20, padding: 5 }}
                onPress={() =>
                  this.props.navigation.navigate('MyTasksScreen', {
                    ...this.props,
                  })
                }>
                <Text style={{...styles.viewAll,...helperFunctions.textSize()}}>View All</Text>
              </TouchableOpacity>
            </View>
            <View
              // style={styles.myTaskPlus}
          >
              { /* <TouchableOpacity onPress={() => this.addTasks()}
                              style={{}}
            >
              <View style={styles.myTaskPlusIcon}>

                <CusIconDesign
                    IconFrom="AntDesign"
                    name="plus"
                    textAlign="center"
                    color='#424E9C'
                    size={24}
                />

              </View>

            </TouchableOpacity> */}
          </View>
          </View>
        </View>
        {/* ------------my task sub box------------ */}
        {AllTasksData && AllTasksData.length > 0 && AllTasksData.slice(0,5).map((t,key)=>{
          return <Animatable.View animation={key%2 == 0 ? "fadeInLeft" : "fadeInRight"} key={key} style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>

            <View style={5 - key == 1 ? [styles.firstBoxTask] : [styles.firstBoxTask,{
              borderBottomColor: '#ccc',
              borderBottomWidth: .5}]  }>
              <View style={styles.midboxIconLeft}>
                <Entypo color="#999" size={20} name="attachment"/>
              </View>
              <View style={styles.midBoxLeft1}>

                <Text style={[styles.TextStyle, {...helperFunctions.textSize()}]}>
                  {t.subject}
                </Text>

              </View>
              <View style={styles.midboxblank}></View>
              <View style={styles.midBoxRight2}>
                {/* <TouchableOpacity onPress={() => this.editTasks()}>
                <Image
                  style={styles.write}
                  source={require('../../Assets/today_png/Path_158.png')}
                />
              </TouchableOpacity> */}
              </View>


            </View>



          </Animatable.View>
        })}

        {/* <View style={styles.borderStyle}></View> */}
      </View>
    );
  }
}

const mapStateProps = state => {
  const AllTasksData = state.GetAllTodayReducer.AllTasksData;
  return {
    AllTasksData,
  };
};
export default connect(mapStateProps)(Mytasks);

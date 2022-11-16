/* eslint-disable */
import React, { Component, Fragment } from 'react';
import {
  Container,
  Left,
  Body,
  Card,
  CardItem,
  Content,
  Row,
  Label,
  Grid,
  Toast,
} from 'native-base';

import {View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Alert} from 'react-native';
import styles from './styles';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import { useTheme } from '../../Theme/hooks';
import { helperFunctions } from '../../_helpers';
import Modal from 'react-native-modal';
import MiniModal from '../Modal/miniModal';
import {Input} from "react-native-elements";
import AntIcon from 'react-native-vector-icons/EvilIcons'

const { colors } = useTheme();
const DEFAULT_HEIGHT = 150;
const { width } = Dimensions.get('window')

const Times = [

  {
    hour: '08:00:00',
    hourEnd: '08:59:59',
    index: 1
  },

  {
    hour: '09:00:00',
    hourEnd: '09:59:59',
    index: 2
  },
  {
    hour: '10:00:00',
    hourEnd: '10:59:59',
    index: 3
  },
  {
    hour: '11:00:00',
    hourEnd: '11:59:59',
    index: 4
  },
  {
    hour: '12:00:00',
    hourEnd: '12:59:59',
    index: 5
  },
  {
    hour: '13:00:00',
    hourEnd: '13:59:59',
    index: 6
  },
  {
    hour: '14:00:00',
    hourEnd: '14:59:59',
    index: 7
  },
  {
    hour: '15:00:00',
    hourEnd: '15:59:59',
    index: 8
  },

  {
    hour: '16:00:00',
    hourEnd: '16:59:59',
    index: 9
  },
  {
    hour: '17:00:00',
    hourEnd: '17:59:59',
    index: 10
  },
  {
    hour: '18:00:00',
    hourEnd: '18:59:59',
    index: 11
  },
  {
    hour: '19:00:00',
    hourEnd: '19:59:59',
    index: 12
  },
  {
    hour: '20:00:00',
    hourEnd: '20:59:59',
    index: 13
  },
  {
    hour: '21:00:00',
    hourEnd: '21:59:59',
    index: 14
  },
  {
    hour: '22:00:00',
    hourEnd: '22:59:59',
    index: 15
  },
];

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miniModal: false,
      value: '',
    }
  }


  proccessAppointments = (time) => {
    this.props.addingAppointment(time)
  }
  ViewDetails = (value) => {
    if (value.type != "NOT_WORKING" && value.type != "DAY_OFF") {

      this.props.gotoEdit(value)
    } else {
      this.setState({
        value,
      }, () => {
        if (value.type == "NOT_WORKING" || value.type == "DAY_OFF") {
          this.setState({ miniModal: true })
        }
      })
    }

  }

  closeMiniModal = () => {
    this.setState({
      miniModal: false,
      value: '',
    })
  }

  findDuplicates=(time,i)=>{

    let start = time.format('YYYY-MM-DDTHH:mm');
    let returnedValue = []
    this.props.value.map((item,key)=>{
      if(Moment(item.start).format('YYYY-MM-DDTHH:mm') == start){

        returnedValue.push({
          start: item,
          key: key
        })
      }
    })
    //console.log('asdsadsadasd',returnedValue)
    return returnedValue;

}
  checkPosition=(items,time,i)=>{
    //console.log(i)
    let pos = null;
    let left = null
    items.map((it,k)=>{
      //console.log('g',it)
      if(it.key == i){
        //console.log(k)
        pos = k
      }
    })

    //console.log('ll',pos)

    if(pos == 0){
      left = 103
    }else{
      left = ((width - 108) / items.length)*pos + 103
    }

    return left
}

  checkNote=(message)=>{
    Alert.alert('Note: ', message);
  }

  render() {
    const { value,selectedDay } = this.props;
    //console.log("valuevalue", selectedDay[0][0]);
    const selectedMinutes = Moment.duration(Moment(selectedDay[0][0])).asMinutes();
    //alert(selectedMinutes)
    const currentDate = Moment().format('YYYY-MM-DD');

    const currentMinutes  = Moment.duration(Moment(currentDate)).asMinutes();
    //alert(currentMinutes > selectedMinutes)


    return (
      <View style={{ position: 'relative' }}>
        {Times.map((time, index) => {

          return (
            <Fragment key={index}>
              <Grid>
                {selectedMinutes >= currentMinutes  ? (<TouchableOpacity
                    onPress={() => this.proccessAppointments(time)}
                    key={index}>
                  <View style={{
                    ...styles.timeSection,
                    ...helperFunctions.lightDarkBg(),
                    height: 150,
                    ...helperFunctions.flexRow(),
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'


                  }}>


                    <View style={{...helperFunctions.flexRow(),width: 100,height:'100%',...helperFunctions.assMediumDark()}}>
                      <Text
                          style={{
                            ...styles.timeSectionText,
                            marginLeft: 10,
                            ...helperFunctions.textBlack(),

                          }}>
                        {Moment(time.hour, 'hh:mm:ss').format('hh:mm')}
                      </Text>
                      <Text
                          style={{
                            ...styles.timeSectionText,
                            ...helperFunctions.textBlack(),
                            marginLeft: 3
                          }}>
                        {Moment(time.hour, 'hh:mm:ss A').format('a')}
                      </Text>
                    </View>
                  </View>


                </TouchableOpacity>) : (<View key={index}>
                  <View style={{
                    ...styles.timeSection,
                    ...helperFunctions.lightDarkBg(),
                    height: 150,
                    ...helperFunctions.flexRow(),
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'

                  }}>

                    <View style={{...helperFunctions.flexRow(),width: 100,height:'100%',...helperFunctions.assMediumDark()}}>
                      <Text
                          style={{
                            ...styles.timeSectionText,
                            marginLeft: 10,
                            ...helperFunctions.textBlack(),

                          }}>
                        {Moment(time.hour, 'hh:mm:ss').format('HH:mm')}
                      </Text>
                      <Text
                          style={{
                            ...styles.timeSectionText,
                            ...helperFunctions.textBlack(),
                            marginLeft: 3
                          }}>
                        {Moment(time.hour, 'hh:mm:ss A').format('a')}
                      </Text>
                    </View>
                  </View>


                </View>) }


              </Grid>
              {this.props.value.length > 0 && this.props.value.map((value, i) => {

                // let mainTime = Moment(new Date(value.start), ['h:mm A']).format(
                //   'HH:mm',
                // );
                let mainTime = Moment(value.start).format('HH:mm:ss');
                var format = 'HH:mm:ss';
                mainTime = Moment(mainTime, format);
                //console.log('MAIN',mainTime)

                let beforeTime = Moment(time.hour, format);
                let afterTime = Moment(time.hourEnd, format);

                beforeTime.subtract(2, 'seconds').format('HH:mm:ss');
                if (mainTime.isBetween(beforeTime, afterTime)) {
                  let items = this.findDuplicates(mainTime,i);
                  return  (
                    <>

                      <TouchableWithoutFeedback key={i} onPress={() => this.ViewDetails(value)}><Card key={i} transparent style={{
                      marginTop: -20,
                      position: 'absolute',
                      zIndex: 1,
                      top: time.index == 0 ? 0 : (150 * (time.index - 1)) + helperFunctions.calculateHeightToAdd(mainTime, beforeTime) + 19,
                      // ...helperFunctions.getTopPosition(mainTime, Times),
                      width: items.length > 0  ?  (width - 108) / items.length : width - 108,
                      left: items.length > 0 ? this.checkPosition(items,mainTime,i) : 103
                    }}>

                      <CardItem
                        style={{
                          borderLeftWidth: 5,
                          borderLeftColor: '#444',
                          backgroundColor: value.backgroundColor,
                          ...helperFunctions.calculateHeight(value.end, value.start),
                          borderTopWidth: 1,
                          borderTopColor: '#' + Math.random().toString(16).substr(2, 6),
                          overflow: 'hidden',
                          paddingTop: 30
                        }}>
                        <View>

                          <Text style={{ color: value.textColor, fontSize: 11 }}>
                            {/* Moment(value.start).format('hh:mm A') */}
                            {Moment(value.start).format('hh:mm A')} -{' '}
                            {Moment(value.end).format('hh:mm A')} {" "}
                             {value.type != "NOT_WORKING" && value.type != "DAY_OFF" && "( "+value.status+" )"}
                          </Text>
                          <Text style={{fontSize: 11, color: value.textColor }}>
                            {value.title}
                          </Text>
                        </View>

                      </CardItem>
                        {value.staffNotes != undefined && value.staffNotes != '' &&
                        <TouchableOpacity onPress={()=>this.checkNote("Staff Note:\n" + value?.staffNotes)} style={{position:'absolute',top: -10,right:-4,backgroundColor:'red',zIndex: 1}}>
                          <Text><AntIcon color="#fff" size={30} name="envelope"/></Text>
                        </TouchableOpacity>
                        }
                        {value.customerNotes != undefined && value.customerNotes != '' &&
                        <TouchableOpacity onPress={()=>this.checkNote("Customer Note:\n" + value?.customerNotes)} style={{position:'absolute',top: 3,left:-4,backgroundColor:'red',zIndex: 1}}>
                          <Text><AntIcon color="#fff" size={30} name="envelope"/></Text>
                        </TouchableOpacity>
                        }
                    </Card>
                    </TouchableWithoutFeedback></>

                  );
                } else {
                  return null;
                }
              })}</Fragment>
          );
        })}
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <Modal
            backdropColor={'#000000'}
            backdropOpacity={0.5}
            isVisible={this.state.miniModal}>
            <MiniModal value={this.state.value} closeMiniModal={this.closeMiniModal} />
          </Modal>

        </View>
      </View>
    );
  }



};

export default Schedule;

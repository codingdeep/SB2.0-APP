/* eslint-disable */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  Dimensions, KeyboardAvoidingView, ScrollView,
} from 'react-native';

import {
  Container,
  View,
  Grid,
  Row,
  Col,
  Picker,
  Body,
  Item,
  Icon,
  Left,
  Right,
  Label,
  Input,
  Button,
  Card,
  CardItem,
  Root,
  Toast,
} from 'native-base';
import CustomBox from './CustomBox/customBox';
import Moment, {duration} from 'moment';
import HeaderComponent from '../Header/header';
import {ServiceGenerator} from './../Appointment/ServiceGenerator';
import {EditServiceGenerator} from './../Appointment/ServiceGenerator';
import {addService} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import {updateService} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomDateTimePicker from '../ImportantFunction/datePicker';
import SearchPicker from '../ImportantFunction/SearchPicker';
import {
  GetSearchService,
  _requestSingleService,
} from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {helperFunctions} from '../../_helpers';
import moment from 'moment';
import {_addService} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import styles from './styles';
import {toast} from '../Toast/Toast';
import {Appearance} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
const {width, height} = Dimensions.get('window');
class AddEditServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: '',
      serviceName:
        this.props.isEditable == true ? this.props.item.servicename : '',
      serviceId: this.props.isEditable == true ? this.props.item.service : '',
      Technicians: [],
      technicianId:
        this.props.isEditable == true ? this.props.item.technician : '',
      technicianName:
        this.props.isEditable == true ? this.props.item.technicianname : '',
      mode: 'date',
      date:
        this.props.isEditable == true ? this.props.item.timeStart : this.props.apptDate ? this.props.apptDate :  moment(),
      // date: new Date(this.props.navigation.getParam('apptDate')),
      initialLastDate: false,
      initialLastDateTwo: false,
      endTime:
        this.props.isEditable == true ? this.props.item.timeEnd : moment(),
      ServiceList: [],
      show: false,
      showTwo: false,
      isModalVisibleOne: false,
      items: [],
      value: this.props.isEditable == true ? this.props.item.servicename : '',
      selectedServices:
        this.props.servicesCounter.length > 0 ? this.props.servicesCounter : [],
      isAnimated: false,
      initialValue: new Animated.ValueXY({x: 0.1, y: 0.1}),
      faded: new Animated.Value(1),
      infoFaded: new Animated.Value(1),
      transform: new Animated.Value(1),
      techs: [],
      techServices: [],
      selectedService: {},
      key: 0,
      servicePrice: this.props.isEditable == true ? this.props.item.price : '',
      saveService: true,
      errors:{}
    };
  }

  componentDidMount() {
    if (this.props.isEditable == true) {
      this.setStaffForEdit(this.props.item.service);
    }
  }

  setStaffForEdit = id => {
    _requestSingleService(id).then(serv => {
      if (serv != '') {
        let techServices = [];
        let technicianIds = [];
        let selectedTech = '';

        selectedTech = serv.technicianServices.filter(
          t => t.technician.id == this.props.TechnicianId,
        );

        if (selectedTech.length > 0) {
          console.log(selectedTech);
          const valids = this.checkValid(selectedTech[0].technician.id);
          if (valids == 'valid') {
            techServices.push({
              key: 0,
              id: selectedTech[0].technician.id,
              name: selectedTech[0].technician.user.names.nick,
              price: this.findDurationPrice(
                selectedTech[0].displayedPrice,
                'price',
              ),
              durationInMinute: selectedTech[0].durationInMinutes,
            });
          }

          let filter = this.props.TechnicianId;

          serv.technicianServices
            .filter(tech => tech.technician.id != filter)
            .map((technician, key) => {
              const valid = this.checkValid(technician.technician.id);
              if (valid == 'valid') {
                techServices.push({
                  key: key + 1,
                  id: technician.technician.id,
                  name: technician.technician.user.names.nick,
                  price: this.findDurationPrice(
                    technician.displayedPrice,
                    'price',
                  ),
                  durationInMinute: technician.durationInMinutes,
                });
              }
            });
        } else {
          serv.technicianServices.forEach((technician, key) => {
            const valid = this.checkValid(technician.technician.id);
            if (valid == 'valid') {
              techServices.push({
                key: key,
                id: technician.technician.id,
                name: technician.technician.user.names.nick,
                price: this.findDurationPrice(
                  technician.displayedPrice,
                  'price',
                ),
                durationInMinute: technician.durationInMinutes,
              });
            }
          });
        }

        this.setState(
          {
            techServices: techServices,
          },
          () => {
            const end = moment(this.state.date).add(
              techServices[0].durationInMinute,
              'minutes',
            );
            this.setState({
              technicianId: this.state.technicianId,
              endTime: end,
            });
          },
        );
      }
    });
  };

  closeAddModal = () => {
    this.props.closeModal();
  };

  searchItems = txt => {
    this.setState({
      value: txt,
      isSearchable: true,
    });
    const inputLength = txt.length;
    if (inputLength === 0) {
      this.setState({
        items: [],
        ServiceList: [],
        isSearchable: false,
      });
    } else {
      GetSearchService(
        this.props.locationId,
        txt,
        response => {
          if (response && response.length > 0) {
            console.log(response)
            this.setState({
              ServiceList: response,
            },()=>{
              const items = [];
              this.state.ServiceList.map(s=>s.technicianServices.map(vt=>{
                if(vt.technician.id == this.props.TechnicianId){
                  items.push(s)
                }
              }));

              this.setState({
                items
              })

            });
          } else {
            this.setState({});
          }
        },
        error => {
          console.log('error1', error);
        },
      );
    }
  };

  onServiceSelect = serv => {
    console.log(serv);
    this.setState({
      ...this.state,
      serviceId: serv.service.id,
      serviceName: serv.service.name,
      servicePrice: this.findDurationPrice(serv.displayedPrice),
      items: [],
      value: serv.service.name,
    });

    if (serv != '') {
      let techServices = [];
      let technicianIds = [];
      let selectedTech = '';

      selectedTech = serv.technicianServices.filter(
        t => t.technician.id == this.props.TechnicianId,
      );

      if (selectedTech.length > 0) {
        console.log(selectedTech);
        const valids = this.checkValid(selectedTech[0].technician.id);
        if (valids == 'valid') {
          techServices.push({
            key: 0,
            id: selectedTech[0].technician.id,
            name: selectedTech[0].technician.user.names.nick,
            price: this.findDurationPrice(
              selectedTech[0].displayedPrice,
              'price',
            ),
            durationInMinute: selectedTech[0].durationInMinutes,
          });
        }

        let filter = this.props.TechnicianId;

        serv.technicianServices
          .filter(tech => tech.technician.id != filter)
          .map((technician, key) => {
            const valid = this.checkValid(technician.technician.id);
            if (valid == 'valid') {
              techServices.push({
                key: key + 1,
                id: technician.technician.id,
                name: technician.technician.user.names.nick,
                price: this.findDurationPrice(
                  technician.displayedPrice,
                  'price',
                ),
                durationInMinute: technician.durationInMinutes,
              });
            }
          });
      } else {
        serv.technicianServices.forEach((technician, key) => {
          const valid = this.checkValid(technician.technician.id);
          if (valid == 'valid') {
            techServices.push({
              key: key,
              id: technician.technician.id,
              name: technician.technician.user.names.nick,
              price: this.findDurationPrice(technician.displayedPrice, 'price'),
              durationInMinute: technician.durationInMinutes,
            });
          }
        });
      }

      this.setState(
        {
          techServices: techServices,
        },
        () => {
          const end = moment(this.state.date).add(
            techServices[0].durationInMinute,
            'minutes',
          );
          this.setState({
            technicianId: techServices[0].id,
            endTime: end,
          });
        },
      );
    }
  };

  setDate = (e, date) => {
    const tech = this.state.techServices.find(
      tech => tech.id == this.state.technicianId,
    );
    if (tech) {
      const durat = tech.durationInMinute;
      const endTime = moment(date).add(durat, 'minutes');
      this.setState({
        date,
        endTime,
        show: false
      });
    }
  };

  setSecondDate = (e, date) => {
    this.setState({
      endTime: date,
      showTwo: false
    });
  };
  showTimepicker = () => {
    // this.show('time');
    this.setState({
      show: true,
      // show: Platform.OS === 'ios' ? true : false,
    });
  };
  showTimepickerTwo = () => {
    this.setState({
      showTwo: true,
    });
  };

  onTecnicianValueChange = val => {
    const tech = this.state.techServices.find(tech => tech.id == val);
    if (tech) {
      const durat = tech.durationInMinute;
      const endTime = moment(this.state.date).add(durat, 'minutes');
      this.setState({
        technicianId: val,
        endTime,
      });
    }
  };
  validateTime=(timeB, timeS)=>{
    const errors = {};
    const durationDiff = this.getDuration(timeB,timeS);
    if(durationDiff < 5) errors.endTime = 'Please enter a valid end time!!'
    return errors;
  }

  //check start and end time
  getDuration = (timeB, timeS) => {
    const sum = moment(timeB).diff(
        moment(timeS),
    );
    const minutes = parseInt(moment.duration(sum).asMinutes());

    return minutes;
  };

  change = () => {
    this.setState({
      saveService: false
    },()=>{
      console.log(this.state.saveService);
    })
    if (this.props.isEditable === true) {
      if (this.props.realUpdate == true) {
        const datePart = moment(this.props.apptDate).format('YYYY-MM-DDT');
        const service= {
          expectedStartTime:
            datePart + moment(this.state.date).format('HH:mm:ss'),
          offeredService: {id: this.state.serviceId},
          period: {
            to: datePart + moment(this.state.endTime).format('HH:mm:ss'),
          },
          technician: {
            id: this.state.technicianId,
          },
          visit: {
            id: this.props.visitId,
          },
        };



        this.updateService(service)
      } else {
        var service = {};
        service.key = this.state.key++;
        service.timeStart = moment(this.state.date);
        service.timeEnd = moment(this.state.endTime);
        service.servicename = this.state.serviceName;
        service.price = this.state.servicePrice;
        service.technician = this.state.technicianId;
        service.service = this.state.serviceId;
        service.technicianname = this.findTechnician(
          this.state.technicianId,
          'nick',
        );
        service.technicianImage = this.findTechnician(
          this.state.technicianId,
          'image',
        );
        service.duration = this.findDuration(this.state.technicianId);

        const remainder = this.state.selectedServices.filter(
          sv => sv.key != this.props.item.key,
        );

        const errors = this.validateTime(service.timeStart,service.timeEnd);
        this.setState({
          errors
        })


        if(Object.keys(this.state.errors).length === 0 ) {
          remainder.push(service);
          this.setState(
              {
                selectedServices: remainder,
                errors: {},
                saveService: true
              },
              () => {
                this.props.addService(this.state.selectedServices);
              },
          );
        }
      }
    } else if (this.props.realUpdate == true) {
      const datePart = moment(this.props.apptDate).format('YYYY-MM-DDT');
      const serviceJSON = {
        expectedStartTime:
          datePart + moment(this.state.date).format('HH:mm:ss'),
        offeredService: {id: this.state.serviceId},
        period: {to: datePart + moment(this.state.endTime).format('HH:mm:ss')},
        technician: {
          id: this.state.technicianId,
        },
        visit: {
          id: this.props.visitId,
        },
      };
      this.addService(serviceJSON);
    } else {
      var service = {};
      service.key = this.state.selectedServices.length + 1;
      service.timeStart = moment(this.state.date);
      service.timeEnd = moment(this.state.endTime);
      service.servicename = this.state.serviceName;
      service.price = this.state.servicePrice;
      service.technician = this.state.technicianId;
      service.service = this.state.serviceId;
      service.technicianname = this.findTechnician(
        this.state.technicianId,
        'nick',
      );
      service.technicianImage = this.findTechnician(
        this.state.technicianId,
        'image',
      );
      service.duration = this.findDuration(this.state.technicianId);

      this.setState({
        isAnimated: !this.state.isAnimated,
        selectedService: service,

      });
      setTimeout(() => {
        Animated.timing(this.state.initialValue, {
          toValue: {x: width / 2 - 20, y: -(height / 2 - 70)},
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.faded, {
          toValue: 0.1,
          duration: 800,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.transform, {
          toValue: 0.1,
          duration: 600,
          useNativeDriver: false,
        }).start();

        setTimeout(() => {
          const selectedServices = this.state.selectedServices;
          selectedServices.push(service);
          this.setState(
            {
              initialValue: new Animated.ValueXY({x: 0, y: 0}),
              faded: new Animated.Value(1),
              transform: new Animated.Value(1),
              isAnimated: !this.state.isAnimated,
              selectedServices,
              selectedService: {},
              serviceId: '',
              serviceName: '',
              value: '',
              items: [],
              technicianId: '',
              techServices: [],
              saveService: true
            },
            () => {
              console.log('', this.state.selectedServices);
            },
          );
        }, 1200);
      }, 900);
    }
  };

  addService = async serviceJSON => {
    this.setState({
      saveService: false
    })
    await addService(
      serviceJSON,
      response => {
        var service = {};
        service.key = this.state.key++;
        service.timeStart = moment(this.state.date);
        service.timeEnd = moment(this.state.endTime);
        service.servicename = this.state.serviceName;
        service.price = this.state.servicePrice;
        service.technician = this.state.technicianId;
        service.service = this.state.serviceId;
        service.technicianname = this.findTechnician(
          this.state.technicianId,
          'nick',
        );
        service.technicianImage = this.findTechnician(
          this.state.technicianId,
          'image',
        );
        service.duration = this.findDuration(this.state.technicianId);



          const remainder = this.state.selectedServices;
          remainder.push(service);
          this.setState(
              {
                selectedServices: remainder,
                saveService: true
              },
              () => {
                this.props.addService(this.state.selectedServices);
              },
          );

      },
      error => {
        alert(error.errors ? error.errors : error.message);
      },
    );
  };
  updateService = async service => {

    const errors = this.validateTime(service.period.to, service.expectedStartTime);
    this.setState({errors})
    if(Object.keys(this.state.errors).length === 0 ) {
      await updateService(this.props.item.id,
          service,
          response => {
            this.setState({errors: {}})
            this.props.addService(this.state.selectedServices)
          },
          error => {
            this.setState({errors: {}})
            //alert(error.errors ? error.errors : error.message);
          },
      );
    }
  };

  onSave = () => {
    if(this.state.saveService == true) {
      this.props.addService(this.state.selectedServices);
    }
  };

  render() {
    const {
      Technicians,
      show,
      date,
      mode,
      initialLastDate,
      endTime,
      showTwo,
      initialLastDateTwo,
      selectedService,
      ServiceList,
      items,
    } = this.state;
    //let apptDate = this.props.navigation.getParam('apptDate');

    return (
      <Root>
        <Container style={{...styles.pro_background,...helperFunctions.lightDarkBg()}}>
          <View style={{flex: 1.5, justifyContent: 'center'}}>
            <View
              style={{
                paddingHorizontal: 20,
                ...helperFunctions.flexRow(),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...helperFunctions.textBlack(),
                  ...helperFunctions.mediumFont(),
                }}>
                Add Services
              </Text>
            </View>

            <TouchableOpacity
              onPress={this.onSave}
              style={{position: 'absolute', right: 20, top: 50}}>
              <FontAwesome color={helperFunctions.yellow()} name="shopping-basket" size={20} />
              <View
                style={{
                  ...helperFunctions.themeBg(),
                  width: 20,
                  height: 20,
                  ...helperFunctions.flexRow(),
                  justifyContent: 'center',
                  borderRadius: 20,
                  position: 'absolute',
                  top: -10,
                  right: -10,
                }}>
                <Text
                  style={{
                    ...helperFunctions.smallFont(),
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                  {this.state.selectedServices &&
                    this.state.selectedServices.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.closeAddModal}
              style={{position: 'absolute', left: 20, top: 40}}>
              <AntDesign color={helperFunctions.yellow()} name="close" size={30} />
            </TouchableOpacity>
          </View>

            <View style={{flex: 8, marginHorizontal: 20}}>
           <ScrollView>
             <KeyboardAvoidingView behavior="position">
            <View>
              <View
                style={{
                  position: 'relative',
                  ...helperFunctions.flexColumn(),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{width: '100%'}}>
                  <Text
                    style={{
                      ...helperFunctions.textBlack()
                    }}>
                    Choose a service
                  </Text>
                  <View style={{height: 15}} />

                  <Item
                    style={{
                      borderColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      borderRadius: 3,
                      ...helperFunctions.assBg(),
                      borderBottomColor: 'transparent',
                      height: 60

                    }}>
                    <Input
                      value={this.state.value}
                      style={{
                        ...helperFunctions.inputHeight(),
                        ...helperFunctions.mediumFont(),
                        color: helperFunctions.darkLightColor()
                      }}
                      placeholderTextColor="#999"
                      placeholder="Search here"
                      onChangeText={text => this.searchItems(text)}
                    />
                  </Item>

                  {items.length > 0 && (
                    <View
                      style={{width: width - 40}}>
                      {items.map((i, k) => {
                        return (
                          <View
                            style={{
                              paddingVertical: 10,
                              ...helperFunctions.borderBottom(),
                            }}
                            key={k}>
                            <TouchableWithoutFeedback
                              onPress={() => this.onServiceSelect(i)}>
                              <Text style={{...helperFunctions.textBlack()}}>
                                {i.service.name}
                              </Text>
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              </View>
            </View>

               <View style={{height: 15}}></View>

            {this.state.techServices.length > 0 && (
              <View style={{...styles.cus_input_view,...helperFunctions.assBg()}}>
                <View style={{paddingLeft: 15}}>
                  <Text style={{...helperFunctions.textBlack(),color: helperFunctions.darkLightColor()}}>{`${this.state.techServices[0].name} [${
                      this.state.techServices[0].durationInMinute
                  } mins] [${this.state.techServices[0].price}]`}
                    </Text>
                </View>
              </View>
            )}

            <View style={{height: 10}} />

            {this.state.serviceId != '' && (
              <Fragment>
                <View>

                  <TouchableOpacity onPress={this.showTimepicker} style={{...helperFunctions.flexRow(),justifyContent: 'space-between',...helperFunctions.assBg(),height: 60,alignItems: 'center',paddingHorizontal: 10}}>
                    <Text style={{...helperFunctions.textBlack()}}>{Moment(date).format('hh:mm A')}</Text>
                    {defaultMode === 'dark' ? (<TouchableOpacity onPress={this.showTimepicker}>
                      <Image
                          style={styles.calender}
                          source={require('../../Assets/tabBarimg/clock-light.png')}
                      />
                    </TouchableOpacity>) : (<TouchableOpacity onPress={this.showTimepicker}>
                      <Image
                          style={styles.calender}
                          source={require('../../Assets/tabBarimg/clock-dark.png')}
                      />
                    </TouchableOpacity>)}
                  </TouchableOpacity>
                  <Body>
                    {show && (
                        <View>
                          <CustomDateTimePicker
                              value={date}
                              mode={'time'}
                              showPicker={show}
                              setTime={(e, date) => {
                                this.setDate(null, date);
                              }}
                              onCancleDatePicker={() =>
                                  this.setState({
                                    show: false,
                                  })
                              }
                          />
                        </View>
                    )}
                  </Body>

                  <Label />

                  <TouchableOpacity onPress={this.showTimepickerTwo} style={{...helperFunctions.flexRow(),justifyContent: 'space-between',...helperFunctions.assBg(),height: 60,alignItems: 'center',paddingHorizontal: 10}}>
                    <Text style={{...helperFunctions.textBlack()}}>{Moment(this.state.endTime).format('hh:mm A')}</Text>
                    {defaultMode === 'dark' ? (<TouchableOpacity onPress={this.showTimepickerTwo}>
                      <Image
                          style={styles.calender}
                          source={require('../../Assets/tabBarimg/clock-light.png')}
                      />
                    </TouchableOpacity>) : (<TouchableOpacity onPress={this.showTimepickerTwo}>
                      <Image
                          style={styles.calender}
                          source={require('../../Assets/tabBarimg/clock-dark.png')}
                      />
                    </TouchableOpacity>)}
                  </TouchableOpacity>
                  <Body>
                    {showTwo && (
                        <CustomDateTimePicker
                            value=""
                            mode={'time'}
                            showPicker={showTwo}
                            setTime={(e, date) => {
                              this.setSecondDate(null, date);
                            }}
                            onCancleDatePicker={() =>
                                this.setState({
                                  showTwo: false,
                                })
                            }
                        />
                    )}
                  </Body>
                  {this.state.errors.endTime && <Text>invalid ending time</Text>}



                </View>
                <View
                  style={{
                    ...helperFunctions.flexRow(),
                    justifyContent: 'flex-end',
                  }}>
                  {this.state.saveService == true &&
                  <TouchableOpacity
                      onPress={this.change}
                      style={{
                        width: 150,
                        ...helperFunctions.flexRow(),
                        justifyContent: 'center',
                        ...helperFunctions.yellowBg(),
                        marginTop: 30,
                        borderRadius: 30,
                        paddingVertical: 10
                      }}>
                    <Text
                        style={{
                          textAlign: 'center',
                          ...helperFunctions.textBlack(),
                        }}>
                      {this.props.isEditable == true
                          ? 'Update'
                          : this.props.realUpdate == true
                              ? 'Add Service'
                              : 'Add To Cart'}
                    </Text>
                  </TouchableOpacity>
                  }
                </View>
              </Fragment>
            )}
            <View style={{flex: 2.5}} />
             </KeyboardAvoidingView>
           </ScrollView>
          </View>


          {this.state.isAnimated === true && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Animated.View
                style={[
                  this.state.initialValue.getLayout(),
                  {
                    opacity: this.state.faded,
                    transform: [{scale: this.state.transform}],
                  },
                ]}>
                <View
                  style={{
                    ...helperFunctions.deviceWiseWidth(350, 400, 450, 500),
                    ...helperFunctions.deviceWiseHeight(300, 350, 350, 400),
                  }}>
                  <Card>
                    <CardItem>
                      <Body>
                        <View style={{...helperFunctions.flexRow()}}>
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 30,
                              marginRight: 10,
                            }}
                            source={{
                              uri: this.state.selectedService.technicianImage,
                            }}
                          />
                          <Text style={{...helperFunctions.textBlack(),color: '#000'}}>
                            {this.state.selectedService.servicename}

                            <Text
                              style={{
                                ...helperFunctions.assColor(),
                                ...helperFunctions.textSize(),
                              }}>
                              {' '}
                              with{' '}
                            </Text>
                            {this.state.selectedService.technicianname}
                          </Text>
                        </View>
                        <View
                          style={{
                            ...helperFunctions.flexRow(),
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: 20,
                          }}>
                          <View>
                            <View style={{...helperFunctions.flexRow()}}>
                              <Text style={{...helperFunctions.textSize(),color: '#000'}}>
                                Time
                              </Text>
                              <Text style={{...helperFunctions.textBlack(),color: '#000'}}>
                                : {moment(this.state.date).format('hh:mm a')}
                              </Text>
                            </View>
                            <View style={{...helperFunctions.flexRow()}}>
                              <Text style={{...helperFunctions.textSize(),color: '#000'}}>
                                Duration: {this.state.selectedService.duration}{' '}
                                min
                              </Text>
                              <Text style={{...helperFunctions.textBlack(),color: '#000'}}>
                                {' '}
                                {this.state.selectedService.servicePrice}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text
                              style={{
                                ...helperFunctions.textBlack(),
                                color: '#000'
                              }}>
                              Price: {this.state.selectedService.price}
                            </Text>
                          </View>
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </View>
              </Animated.View>
            </View>
          )}
        </Container>
      </Root>
    );
  }

  checkValid = id => {
    const t = this.props.StoreAllData.locations[0].technicians.find(
      t => t.id == id,
    );

    if (t) {
      if (t.bookable == true) {
        return 'valid';
      }
    } else {
      return 'Not valid';
    }
  };

  findTechnician = (id, query) => {
    const tech =
      this.props.StoreAllData &&
      this.props.StoreAllData.locations[0].technicians.find(
        tech => tech.id == id,
      );
    if (tech) {
      console.log('TEC', tech);
      if (query == 'image') {
        return tech.user.imageUrl;
      } else if (query == 'nick') {
        return tech.user.names.nick;
      }
    }
  };
  findDuration = (id, query) => {
    const tech =
      this.state.techServices &&
      this.state.techServices.find(tech => tech.id == id);
    if (tech) {
      return tech.durationInMinute;
    }
  };

  findDurationPrice = displayedPrice => {
    console.log('ii', displayedPrice);
    if (displayedPrice.substring(0, 1) == '$') {
      if (displayedPrice.includes('-')) {
        const newOne = displayedPrice.split('-');

        const firstPart = newOne[0].substring(1);
        const secondPart = newOne[1].replace(' ', '');

        return (
          '$' +
          (firstPart * 1).toFixed(2) +
          ' - ' +
          '$' +
          (secondPart.substring(1, secondPart.length) * 1).toFixed(2)
        );
      } else {
        //console.log('FUN',technician)
        return (
          '$' +
          (displayedPrice.substring(1, displayedPrice.length) * 1).toFixed(2)
        );
      }
    } else if (displayedPrice.includes('From')) {
      const newOne = displayedPrice.split('From');
      const secondPart = newOne[1].replace(' ', '');

      return (
        'from ' +
        ' $' +
        (secondPart.substring(1, secondPart.length) * 1).toFixed(2)
      );
    } else {
      return displayedPrice;
    }
  };
}

const mapStateProps = state => {
  const ServiceList =
    state.StoreDataReducer.StoreLocationInfo[0].offeredServices;
  const Technicians = state.StoreDataReducer.StoreLocationInfo[0].technicians;
  const TechnicianId = state.LoggedData.TechnicianId;
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;
  const StoreAllData = state.StoreDataReducer.StoreAllData;

  return {
    ServiceList,
    Technicians,
    TechnicianId,
    locationId,
    StoreAllData,
  };
};

export default connect(mapStateProps)(AddEditServices);

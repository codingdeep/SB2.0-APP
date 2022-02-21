/* eslint-disable */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './styles';
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
} from 'native-base';
import CustomBox from './CustomBox/customBox';
import Moment from 'moment';
import HeaderComponent from '../Header/header';
import { ServiceGenerator } from './../Appointment/ServiceGenerator';
import { EditServiceGenerator } from './../Appointment/ServiceGenerator';
import { addService } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import { updateService } from '../../Redux/SagaActions/UpcommingAppoinments_action';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomDateTimePicker from '../ImportantFunction/datePicker';
import SearchPicker from '../ImportantFunction/SearchPicker';
import { GetSearchService } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import { GetSingleService } from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { helperFunctions } from '../../_helpers';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
class addEditService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: '',
      serviceName: '',
      serviceId: '',
      Technicians: [],
      technicianId: '',
      technicianName: '',
      mode: 'date',
      date: Moment(this.props.navigation.getParam('apptDate')).format(),
      // date: new Date(this.props.navigation.getParam('apptDate')),
      initialLastDate: false,
      initialLastDateTwo: false,
      endTime: new Date(this.props.navigation.getParam('apptDate')),
      ServiceList: [],
      selectedService: null,
      show: false,
      showTwo: false,
      isModalVisibleOne: false,
      items: [],
      value: '',
      selectedServices: this.props.navigation.state.params.selectedServices,
      isAnimated: false,
      initialValue: new Animated.ValueXY({ x: 0.1, y: 0.1 }),
      faded: new Animated.Value(1),
      infoFaded: new Animated.Value(1),
      transform: new Animated.Value(1),
      techs: [],
      isSearchable: false
    };
  }

  componentDidMount() {
    const { Technicians } = this.props;
    const { TechnicianId } = this.props.navigation.state.params;
    console.log('this.propsthis.props', this.props);

    if (TechnicianId) {
      Technicians.forEach(tech => {
        if (tech.id == TechnicianId) {
          let technicians = [];
          technicians.push(tech);
          this.setState({
            ServiceList: tech.offeredServices,
            Technicians: technicians,
          });
        }
      });
    } else {
      this.searchService('');
      // this.setState({
      //   ServiceList: this.props.ServiceList
      // })
    }
    if (this.props.navigation.state.params.EditService) {
      setTimeout(() => {
        this.getSingleService(
          this.props.navigation.state.params.EditService.offeredService.id,
        ).then(val => {
          console.log('dddddd', 'sss', val);

          setTimeout(() => {
            this.onServiceValueChange(
              this.props.navigation.state.params.EditService.offeredService.id,
            ).then(() => {
              this.onTecnicianValueChange(
                this.props.navigation.state.params.EditService.technician.id,
              ).then(() => {
                setTimeout(() => {
                  let startTime = Moment(
                    this.props.navigation.state.params.EditService
                      .expectedStartTime,
                  ).format();
                  this.setDate(
                    null,
                    this.props.navigation.state.params.EditService
                      .expectedStartTime,
                  );
                }, 30);
              });
            });
          }, 20);
        });
      }, 10);
    }
  }

  setDate = (event, startDate) => {
    console.log('startDate', Moment(startDate).format('hh:mm:ss A'));
    console.log('startDate22', this.state.date);

    let time;
    if (
      Moment(startDate)
        .format('A')
        .toLocaleLowerCase() == 'pm'
    ) {
      time =
        parseInt(Moment(startDate).format('hh')) +
        12 +
        Moment(startDate).format(':mm:ssZ');
    } else {
      time = Moment(startDate).format('hh:mm:ssZ');
    }
    startDate = Moment(this.state.date).format('YYYY-MM-DD') + 'T' + time;

    let durationInMinutes = new Date();
    if (this.state.selectedService) {
      durationInMinutes = this.state.selectedService.durationInMinutes;
      var returned_endate = Moment(startDate).add(durationInMinutes, 'minutes');
    }

    // returned_endate.format("MM-DD-YYYY, hh:mm:ss A")
    // MM/DD/YYYY
    this.setState({
      show: false,
      // show: Platform.OS === 'ios' ? true : false,
      date: new Date(startDate),
      endTime: new Date(returned_endate),
      initialLastDate: true,
      initialLastDateTwo: true,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
      isModalVisibleOne: true,
    });
  };

  showTimepicker = () => {
    // this.show('time');
    this.setState({
      show: true,
      // show: Platform.OS === 'ios' ? true : false,
    });
  };

  setEndDate = (event, endTime) => {
    let time;
    if (
      Moment(endTime)
        .format('A')
        .toLocaleLowerCase() == 'pm'
    ) {
      time =
        parseInt(Moment(endTime).format('hh')) +
        12 +
        Moment(endTime).format(':mm:ssZ');
    } else {
      time = Moment(endTime).format('hh:mm:ssZ');
    }
    endTime = Moment(this.state.date).format('YYYY-MM-DD') + 'T' + time;
    // endTime = Moment(this.state.endTime).format('MM-DD-YYYY') + " " + Moment(endTime).format('hh:mm:ss Z A');

    // if (Platform.OS === 'ios') {
    //   endTime = Moment(this.state.endTime).format('MM-DD-YYYY') + " " + Moment(endTime).format('hh:mm:ss Z A');
    // } else {
    //   endTime = Moment(this.state.endTime).format('YYYY-MM-DD') + "T" + Moment(endTime).format('hh:mm:ss')
    // }
    this.setState({
      showTwo: false,
      // showTwo: Platform.OS === 'ios' ? true : false,
      endTime: new Date(endTime),
      initialLastDateTwo: true,
    });
  };

  showTimepickerTwo = () => {
    this.setState({
      showTwo: true,
    });
  };

  onServiceValueChange = async val => {
    return new Promise(resolve => {
      const { ServiceList } = this.state;
      const { Technicians } = this.props;
      const { TechnicianId } = this.props.navigation.state.params;
      let TechniciansFilter;

      let self = this;

      this.setState({
        items: [],
      }, () => {
        return false
      });

      ServiceList.forEach(function (item, key) {
        if (item.id == val) {

          self.setState({
            // serviceName: ServiceList.id.includs(val),
            selectedService: item,
            value: item.service.name,
            techs: item.technicianServices,
            serviceName: self.props.navigation.state.params.serviceName
              ? self.props.navigation.state.params.serviceName
              : item.name,
          });
        }
      });
      console.log('sss2121', this.state.selectedService);

      if (TechnicianId) {
        this.setState({
          serviceId: val,
        });
      } else {
        let myIndex;
        let myInfo;
        TechniciansFilter = Technicians.filter((technicians, index) => {
          let found = false;
          technicians.offeredServices.forEach((offeredService, kkkk) => {
            if (offeredService.id == val) {
              if (this.props.TechnicianId == technicians.id) {
                myIndex = index;
                myInfo = technicians;
              }
              found = true;
            }
          });
          return found;
        });

        if (myIndex) {
          TechniciansFilter.splice(myIndex, 1);
          TechniciansFilter.splice(0, 0, myInfo);
        }

        this.setState({
          serviceId: val,
          Technicians: TechniciansFilter,
        });

        self.setDate(null, self.state.date);

        return resolve({});
      }
    });
  };

  onTecnicianValueChange = val => {
    return new Promise(resolve => {
      let self = this;
      this.state.Technicians.forEach(function (item, key) {
        if (item && item.id == val) {
          self.setState({
            technicianName: item.user.fullName,
            technicianId: val,
          });
        }
      });
      return resolve({});
    });
  };

  getSingleService = id => {
    let self = this;
    return new Promise(resolve => {
      GetSingleService(
        id,
        response => {
          console.log('getSingleService', response);

          if (response) {
            console.log('response.Body666', response);
            // this.state.ServiceList = response
            response = {
              ...response,
              ...response.service,
            };
            self.setState({
              ServiceList: [response],
            });
            console.log('ddsfafasf', self.state.ServiceList);

            return resolve(response);
          }
          return resolve({});
        },
        error => {
          console.log('error1', error);
        },
      );
    });
  };

  searchService = search => {
    console.log('TEXT');
    GetSearchService(
      this.props.locationId,
      search,
      response => {
        console.log('response.Body', response);

        if (response && response.length > 0) {
          console.log('response.Body666', response);
          // this.state.ServiceList = response
          this.setState({
            ServiceList: response.map(s => {
              s = {
                ...s,
                ...s.service,
              };
              return s;
            }),
          });
        } else {
          this.setState({});
        }
      },
      error => {
        console.log('error1', error);
      },
    );
  };

  searchItems = txt => {
    this.setState({
      value: txt,
      isSearchable: true
    });
    const inputLength = txt.length;
    if (inputLength === 0) {
      this.setState({
        items: [],
        ServiceList: [],
        isSearchable: false
      });
    } else {
      GetSearchService(
        this.props.locationId,
        txt,
        response => {
          console.log('response.Body', response);

          if (response && response.length > 0) {
            console.log('response.Body666', response);
            // this.state.ServiceList = response
            this.setState({
              items: response,
              ServiceList: response.map(s => {
                s = {
                  ...s,
                  ...s.service,
                };
                return s;
              }),
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
  onSave = () => {

    if (this.props.navigation.getParam('EditService')) {
      if (!this.props.navigation.getParam('EditService').id) {
        this.props.navigation.state.params.onGoBack()(
          ServiceGenerator(
            this.state.technicianId != ''
              ? this.state.technicianId
              : this.state.Technicians[0].id,
            this.state.serviceId,
            this.state.date,
            this.state.endTime,
          ),
        );
        this.props.navigation.goBack();
      } else {

        updateService(
          this.props.navigation.getParam('EditService').id,
          EditServiceGenerator(
            null,
            this.props.navigation.getParam('visitId'),
            this.state.technicianId,
            this.state.serviceId,
            this.state.date,
            this.state.endTime,
          ),
          response => {
            response.then(data => {
              console.log('response.Body', data);
              this.onEditSave(data);
            });
          },
          error => {
            console.log('error1', error);
          },
        );
      }
    } else if (this.props.navigation.getParam('FromEditAppt')) {

      addService(
        EditServiceGenerator(
          null,
          this.props.navigation.getParam('visitId'),
          this.state.technicianId,
          this.state.serviceId,
          this.state.date,
          this.state.endTime,
        ),
        response => {
          response.then(data => {
            this.onEditSave(data);
          });
        },
        error => {
          console.log('error1', error);
        },
      );
    } else {
      this.setState({
        isAnimated: !this.state.isAnimated
      });

      setTimeout(() => {
        Animated.timing(this.state.initialValue, {
          toValue: { x: width / 2 - 20, y: -(height / 2 - 70) },
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
          this.setState({
            initialValue: new Animated.ValueXY({ x: 0, y: 0 }),
            faded: new Animated.Value(1),
            transform: new Animated.Value(1),
            isAnimated: !this.state.isAnimated,
            value: '',
            selectedService: null,
          });
          this.props.navigation.state.params.onGoBack()(
            ServiceGenerator(
              this.state.technicianId != ''
                ? this.state.technicianId
                : this.state.Technicians[0].id,
              this.state.serviceId,
              this.state.date,
              this.state.endTime,
            ),
          );
          this.props.navigation.goBack();
        }, 400);
      }, 400);
    }
  };
  onEditSave = item => {
    this.props.navigation.state.params.onGoBack()(
      EditServiceGenerator(
        item.id,
        item.visit.id,
        item.technician.id,
        item.offeredService.id,
        item.expectedStartTime,
        item.expectedEndTime,
      ),
    );

    this.props.navigation.goBack();
  };
  toggleModal = () => {
    this.setState({ isModalVisibleOne: !this.state.isModalVisibleOne });
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
    let apptDate = this.props.navigation.getParam('apptDate');

    console.log('rrrrrrr', this.state.ServiceList);
    return (
      <TouchableWithoutFeedback>
        <Container style={styles.pro_background}>
          <View style={{ flex: 1.5, justifyContent: 'center' }}>
            <HeaderComponent
              title={
                !this.props.navigation.state.params.EditService
                  ? 'Add Service'
                  : 'Edit Service'
              }
              // forFunction="true"
              // rightImg="rightImg"

              onFunctionCall={() => {
                this.onSave();
              }}
              {...this.props}
            />
            {!this.props.navigation.state.params.FromEditAppt && (
              <TouchableOpacity
                onPress={this.onSave}
                style={{ position: 'absolute', right: 20, top: 60 }}>
                <FontAwesome color="red" name="shopping-basket" size={20} />
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
            )}
          </View>
          <View style={{ flex: 8, marginHorizontal: 20 }}>
            <View style={{ flex: 0.3 }} />

            <View style={{ marginTop: -30 }}>
              <View
                style={{
                  position: 'relative',
                  ...helperFunctions.flexColumn(),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    ...helperFunctions.deviceWiseWidth(370, 400, 500, 600),
                  }}>
                  <Text
                    style={{
                      ...helperFunctions.textBlack(),
                      ...helperFunctions.themeColor(),
                    }}>
                    Choose a service
                  </Text>
                  <View style={{ height: 15 }} />
                  {!this.props.navigation.state.params.EditService ? (<Item
                    style={{
                      borderColor: '#FFFFFF',
                      ...helperFunctions.assBg(),
                      paddingHorizontal: 10,
                      borderRadius: 3,
                    }}>
                    <Input
                      value={this.state.value}
                      style={{
                        ...helperFunctions.inputHeight(),
                        ...helperFunctions.mediumFont(),
                      }}
                      placeholderTextColor="#999"
                      placeholder="Search here"
                      onChangeText={text => this.searchItems(text)}
                    />
                  </Item>) : (<Item
                    style={{
                      borderColor: '#FFFFFF',
                      ...helperFunctions.assBg(),
                      paddingHorizontal: 10,
                      borderRadius: 3,
                    }}>
                    <Input
                      disabled
                      value={this.state.value}
                      style={{
                        ...helperFunctions.inputHeight(),
                        ...helperFunctions.mediumFont(),
                      }}
                      placeholderTextColor="#999"
                      placeholder="Search here"
                    />
                  </Item>)}

                  {items.length > 0 && (
                    <View
                      style={{
                        ...helperFunctions.deviceWiseWidth(300, 400, 500, 600),
                      }}>
                      {items.map((i, k) => {
                        return (
                          <View
                            style={{
                              paddingVertical: 10,
                              ...helperFunctions.borderBottom(),
                            }}
                            key={k}>
                            <TouchableWithoutFeedback
                              onPress={() => this.onServiceValueChange(i.id)}>
                              <Text style={{ ...helperFunctions.textBlack() }}>
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

            <View style={{ flex: 0.3 }} />
            {(Technicians.length > 0 ||
              this.props.navigation.state.params.TechnicianId) && (
                <View style={{ ...styles.cus_input_view }}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Select Tecnician"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={
                      this.state.technicianId != ''
                        ? this.state.technicianId
                        : Technicians[0].id
                    }
                    onValueChange={val => this.onTecnicianValueChange(val)}>
                    <Picker.Item label="Select Stylist" value="" />

                    {Technicians.map((technician, i) => {
                      return technician ? (
                        <Picker.Item
                          key={i}
                          style={{
                            color: '#0e1317',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                            marginLeft: 0,
                          }}
                          label={`${
                            technician.user.names.nick
                            } [${this.findDurationPrice(
                              technician.id,
                              'duration',
                            )} mins] [${this.findDurationPrice(
                              technician.id,
                              'price',
                            )}]`}
                          value={technician.id}
                        />
                      ) : null;
                    })}
                  </Picker>
                </View>
              )}

            <View style={{ height: 10 }} />

            {selectedService && (
              <Fragment>
                <View>
                  <ImageBackground
                    source={require('../../Assets/clients/searchBackground.png')}
                    style={{ ...styles.Back, height: 60, borderRadius: 3 }}>
                    <Left style={{ marginLeft: 15 }}>
                      <Text style={styles.text}>
                        {Moment(date).format('hh:mm A')}
                      </Text>
                    </Left>
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
                    <Right style={{ marginRight: 10 }}>
                      <TouchableOpacity onPress={this.showTimepicker}>
                        <Image
                          style={styles.calender}
                          source={require('../../Assets/formulaList/actions.png')}
                        />
                      </TouchableOpacity>
                    </Right>
                  </ImageBackground>

                  <Label />
                  {/* <View style={{ flex: 0.3 }}></View> */}
                  <ImageBackground
                    source={require('../../Assets/clients/searchBackground.png')}
                    style={{ ...styles.Back, height: 60 }}>
                    <Left style={{ marginLeft: 15 }}>
                      <Text style={styles.text}>
                        {initialLastDateTwo == false
                          ? 'End Time'
                          : Moment(endTime).format('hh:mm A')}
                      </Text>
                    </Left>
                    <Body>
                      {showTwo && (
                        <CustomDateTimePicker
                          value={apptDate}
                          mode={'time'}
                          showPicker={showTwo}
                          setTime={(e, date) => {
                            this.setEndDate(null, date);
                          }}
                          onCancleDatePicker={() =>
                            this.setState({
                              showTwo: false,
                            })
                          }
                        />
                      )}
                    </Body>
                    <Right style={{ marginRight: 10 }}>
                      <TouchableOpacity onPress={this.showTimepickerTwo}>
                        <Image
                          style={styles.calender}
                          source={require('../../Assets/formulaList/actions.png')}
                        />
                      </TouchableOpacity>
                    </Right>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    ...helperFunctions.flexRow(),
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    onPress={this.onSave}
                    style={{
                      width: 150,
                      ...helperFunctions.flexRow(),
                      justifyContent: 'center',
                      ...helperFunctions.yellowBg(),
                      marginTop: 30,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        ...helperFunctions.textBlack(),
                      }}>
                      {!this.props.navigation.state.params.EditService
                        ? 'Add Service'
                        : 'Update Service'}
                    </Text>
                  </Button>
                </View>
              </Fragment>
            )}
            <View style={{ flex: 2.5 }} />
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
                    transform: [{ scale: this.state.transform }],
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
                        <View style={{ ...helperFunctions.flexRow() }}>
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 30,
                              marginRight: 10,
                            }}
                            source={{
                              uri: this.findTechnician(this.state.technicianId != '' ? this.state.technicianId : this.state.Technicians[0].id, 'image'),
                            }}
                          />
                          <Text style={{ ...helperFunctions.textBlack() }}>
                            {
                              this.state.selectedService.name
                            }

                            <Text
                              style={{
                                ...helperFunctions.assColor(),
                                ...helperFunctions.textSize(),
                              }}>
                              {' '}
                              with{' '}
                            </Text>
                            {
                              this.findTechnician(this.state.technicianId != '' ? this.state.technicianId : this.state.Technicians[0].id, 'nick')
                            }
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
                            <View style={{ ...helperFunctions.flexRow() }}>
                              <Text style={{ ...helperFunctions.textSize() }}>
                                Time
                              </Text>
                              <Text style={{ ...helperFunctions.textBlack() }}>
                                :{' '}
                                {moment(this.state.date).format('hh:mm a')}
                              </Text>
                            </View>
                            <View style={{ ...helperFunctions.flexRow() }}>
                              <Text style={{ ...helperFunctions.textSize() }}>
                                Duration
                              </Text>
                              <Text style={{ ...helperFunctions.textBlack() }}>
                                {' '} {this.findDurationPrice(this.state.technicianId != '' ? this.state.technicianId : this.state.Technicians[0].id, 'price')}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text
                              style={{
                                ...helperFunctions.textBlack(),
                                ...helperFunctions.themeColor(),
                              }}>
                              Price: {this.findDurationPrice(this.state.technicianId != '' ? this.state.technicianId : this.state.Technicians[0].id, 'price')}
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
      </TouchableWithoutFeedback>
    );
  }


  findTechnician = (id, query) => {
    const tech = this.props.StoreAllData && this.props.StoreAllData.locations[0].technicians.find(
      tech => tech.id == id,
    );
    if (tech) {
      console.log('TEC', tech);
      if (query == 'image') {
        return tech.user.imageUrl;
      } else if (query == 'nick') {
        return tech.user.names.nick
      }
    }
  };



  findDurationPrice = (id, query) => {
    const technician = this.state.techs.find(t => t.technician.id == id);

    if (technician) {
      if (query == 'both') {
        return technician.displayedPrice.substring(0, 2) == '$'
          ? '$' +
          (technician.displayedPrice.substring(1) * 1).toFixed(2) +
          ' / ' +
          technician.durationInMinutes +
          ' mins'
          : technician.displayedPrice +
          ' / ' +
          technician.durationInMinutes +
          ' mins';
      } else if (query == 'duration') {
        return technician.durationInMinutes;
      } else if (query == 'price') {
        if (technician.displayedPrice.substring(0, 1) == '$') {
          if (technician.displayedPrice.includes('-')) {
            const newOne = technician.displayedPrice.split('-');

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
              (
                technician.displayedPrice.substring(
                  1,
                  technician.displayedPrice.length,
                ) * 1
              ).toFixed(2)
            );
          }
        } else if (technician.displayedPrice.includes('From')) {
          const newOne = technician.displayedPrice.split('From');
          const secondPart = newOne[1].replace(' ', '');

          return (
            'from ' +
            ' $' +
            (secondPart.substring(1, secondPart.length) * 1).toFixed(2)
          );
        } else {
          return technician.displayedPrice;
        }
      }
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
    StoreAllData
  };
};

export default connect(mapStateProps)(addEditService);

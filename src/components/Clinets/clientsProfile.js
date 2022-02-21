/* eslint-disable */
import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Container, Label} from 'native-base';
import styles from './styles';
import {connect} from 'react-redux';
import {GetAllClients} from '../../Redux/Action/ClientsAction';
import {ScrollView} from 'react-native-gesture-handler';
import Moment from 'moment';
import LOADER from '../Loader/Loader';
import Search from './search';
import HeaderComponent from '../Header/header';
import CellPhoneNumFormat from '../ImportantFunction/cellPhoneNumFormat';
import DecimalFormat from '../ImportantFunction/decimalFormat';
import RefreshFooter from '../ImportantFunction/refreshFooter';
import {GetClientsNextPage} from '../../Redux/SagaActions/clients_saga_action';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
import {helperFunctions} from '../../_helpers';
import Modal from 'react-native-modal';
import Details from '../ClientsProfile/details';
class clientsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks: '',
      ClientsLoader: false,
      AllClientsData: '',
      footerLoading: false,
      offSet: 0,
      load: false,
      isModalVisible: false,
      item: '',
    };
    setTimeout(() => {
      this.state.load = true;
    }, 500);
    this.navigationWillFocusListener = props.navigation.addListener(
        "willFocus",
        () => {

          this.state.item != '' && this.toggleModal(this.state.item);

        }
    );
  }

  componentDidMount() {
    console.log(' this.props.businessId,', this.props.businessId);

    this.props.dispatch(
      GetAllClients(this.props.businessId, this.props.navigation),
    );
  }

  static getDerivedStateFromProps(props, state) {
    const {AllClientsData, ClientsLoader} = props;

    return {
      // tasksValue: AllClientsData,
      ClientsLoader,
      // AllClientsData: AllClientsData
    };
  }

  searchClient = async cilent => {
    console.log('dsfasdfasdfadfs', cilent);
    this.state.AllClientsData = cilent;
    this.setState({
      AllClientsData: cilent,
    });
  };

  handleRefresh = () => {
    if (!this.state.load) {
      return;
    }
    this.state.load = false;
    let offSet = this.state.offSet + 1;
    this.setState({footerLoading: true});
    console.log('adsfasfasfd');
    GetClientsNextPage(
      this.props.businessId,
      offSet,
      response => {
        console.log('response.Body', response);

        if (response && response.length > 0) {
          this.setState({
            AllClientsData: [...this.state.AllClientsData, ...response],
            offSet: offSet,
            footerLoading: false,
            load: true,
          });
        } else {
          this.setState({
            footerLoading: false,
          });
        }
      },
      error => {
        console.log('error1', error);
      },
    );
  };

  toggleModal = item => {
    this.setState(
      {
        item,
      },
      () => {
        this.setState({
          isModalVisible: !this.state.isModalVisible,
        });
      },
    );
  };
  closeModal = item => {
    this.setState({
      isModalVisible: false,
    });
  };
  // gotoBookAppointment = item => {
  //   this.closeModal();
  //   this.props.navigation.navigate('Appointment', {ClientInfo: item});
  // };
  gotoBookAppointment = item => {
    this.closeModal();
    this.props.navigation.navigate('MyBook', {ClientInfo: item});
  };
  getAllFormula = item => {
    this.closeModal();
    this.props.navigation.navigate('FormulaListScreen', {ClientInfo: item});
  };
  getUpcomingAppt = item => {
    this.closeModal();
    this.props.navigation.navigate('UpComingAppoinmentsScreen', {
      ClientInfo: item,
    });
  };
  getPastAppt = (item) => {
    this.closeModal();
    this.props.navigation.navigate('PastAppoinmentsScreen', {
      ClientInfo: item,
    });
  };



  render() {
    // <Item title={item} />
    const {AllClientsData, ClientsLoader} = this.props;
    console.log('PROPS', AllClientsData);

    // console.log('this.props', AllClientsData);
    return ClientsLoader == false ? (
      <LOADER />
    ) : (
      <Fragment>
        <Container style={[styles.pro_background,{...helperFunctions.whiteToDark()}]}>
          <View style={{justifyContent: 'center', ...helperFunctions.headerHeight()}}>
            <HeaderComponent color={defaultMode === 'dark' ? 'white' : '#424E9C'} Left={'false'} title="Clients" {...this.props} />
          </View>
          <View style={{flex: 1}}>
            <Search
              businessId={this.props.businessId}
              getSearchClients={res => {
                this.searchClient(res);
              }}
            />
          </View>
          <View style={{flex: 7.5}}>
            <FlatList
              data={
                this.state.AllClientsData
                  ? this.state.AllClientsData
                  : this.props.AllClientsData
              }
              keyExtractor={(item, index) => item + index}
              // renderItem={({ item }) => <Item title={item} />}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity onPress={() => this.toggleModal(item)}>
                      <View style={styles.clientsProfileContainer}>
                        <View style={styles.rowContainer}>
                          <View style={styles.firstBlock}>
                            <Image
                              style={styles.avater}
                              source={{uri: item.imageUrl}}
                            />
                          </View>
                          <View style={styles.secondBlock}>
                            <Text
                              style={{
                                ...styles.name,
                                ...helperFunctions.textBlack(),
                              }}>
                              {item.fullName}
                            </Text>

                            <Text
                              style={{
                                ...helperFunctions.textSize(),
                                ...helperFunctions.assColor(),
                              }}>
                              {this.formatMobileNumber(item.mobileNumber)}
                            </Text>

                            {item.lastVisit && (
                              <Text style={{...helperFunctions.yellowColor()}}>
                                {item.lastVisit.readableBookedTime}
                              </Text>
                            )}
                          </View>
                          <View style={styles.thirdBlock}>
                            <View style={{}}>
                              <Image
                                style={styles.dot}
                                source={require('../../Assets/clients/blueDot.png')}
                              />
                            </View>
                            {item.nextVisit && (
                              <View style={styles.daysBox}>
                                <Text
                                  numberOfLines={1}
                                  style={{...styles.daysNextIn,...helperFunctions.yellowColor()}}>
                                  Next: {item.nextVisit.readableBookedTime}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.borderStyle} />
                  </View>
                );
              }}
              onEndReached={this.handleRefresh}
              onEndReachedThreshold={0}
              ListFooterComponent={
                <RefreshFooter loading={this.state.footerLoading} />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Modal
            style={{margin: 0}}
            backgroundColor="white"
            isVisible={this.state.isModalVisible}>
            <Details
              getAllFormula={this.getAllFormula}
              getUpcomingAppt={this.getUpcomingAppt}
              getPastAppt={this.getPastAppt}
              closeModal={this.closeModal}
              item={this.state.item}
              gotoBook={this.gotoBookAppointment}
            />
          </Modal>
          <View style={{height: 150}}></View>
        </Container>
      </Fragment>
    );
  }

  formatMobileNumber = number => {
    let firstThree = number.toString().substring(0, 3);
    let middleThree = number.toString().substring(3, 6);
    let remainderNumber = number
      .toString()
      .substring(6, number.toString().length);
    return firstThree + '-' + middleThree + '-' + remainderNumber;
  };
}

const mapStateProps = state => {
  const businessId = state.LoggedData.businessId;
  const AllClientsData = state.ClientsReducer.AllClientsData;
  const ClientsLoader = state.ClientsReducer.ClientsLoader;
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;

  return {
    businessId,
    AllClientsData,
    ClientsLoader,
    StoreLocationInfo,
  };
};

export default connect(mapStateProps)(clientsProfile);

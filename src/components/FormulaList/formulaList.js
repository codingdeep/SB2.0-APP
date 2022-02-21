/* eslint-disable */
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert, Dimensions,
} from 'react-native';
import {Container, Label} from 'native-base';
import {connect} from 'react-redux';
import HeaderComponent from '../Header/header';
import Moment from 'moment';
import styles from './styles';
import LOADER from '../Loader/Loader';
import {GetFormulaList, DeleteFormula} from '../../Redux/Action/formulaList';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
import {red} from 'ansi-colors';
import {helperFunctions} from '../../_helpers';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
class formulaList extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const clientInfo = navigation.getParam('ClientInfo');
    const clientId = clientInfo.id;
    console.log('clientInfo', clientInfo);
    this.navigationWillFocusListener = props.navigation.addListener(
      'willFocus',
      () => {
        this.GetAllFormula(clientId, clientInfo);
      },
    );
    this.state = {
      result: [],
      hidden: false,
      newKey: '',
      loader: true,
      formulaListLoader: false,
      viewDetailsSection: '',
      clientInfo,
      clientId,
    };
  }
  componentDidMount = () => {
    const clientInfo = this.props.navigation.getParam('ClientInfo');
    const clientId = clientInfo.id;
    this.GetAllFormula(clientId, clientInfo);
  };
  static getDerivedStateFromProps(props, state) {
    const {
      FormulaListData,
      formulaListLoader,
      TechniciansInfo,
      ClientInfo,
    } = props;

    return {
      FormulaListData,
      formulaListLoader,
      TechniciansInfo,
      ClientInfo,
    };
  }
  GetAllFormula = (clientId, clientInfo) => {
    this.props.dispatch(
      GetFormulaList(
        this.props.StoreLocationInfo,
        clientId,
        this.props.navigation,
        clientInfo,
      ),
    );

    // this.props.navigation.navigate('FormulaListScreen', { ClientInfo: clientInfo })
  };
  viewDetails = key => {
    this.setState({
      viewDetailsSection: key,
    });
  };
  viewDetailsClose = () => {
    this.setState({
      viewDetailsSection: '',
    });
  };
  viewDeleteFormula = formulaId => {
    Alert.alert(
      'Delete Formula',
      'Are you Sure?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.dispatch(
              DeleteFormula(formulaId, this.state, () => {
                this.GetAllFormula(this.state.clientId, this.state.clientInfo);
              }),
            );
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    const {navigation} = this.props;
    const clientInfo = navigation.getParam('ClientInfo');
    const {
      FormulaListData,
      formulaListLoader,
      viewDetailsSection,
      TechniciansInfo,
    } = this.state;
    console.log('TechniciansInfo', TechniciansInfo);

    return formulaListLoader == false ? (
      <LOADER />
    ) : (
      <Container style={{...styles.pro_background,...helperFunctions.blackWhite()}}>
        <View style={{justifyContent: 'center',...helperFunctions.blackWhite(), ...helperFunctions.headerHeight()}}>
          <HeaderComponent
            title="Formula List"
            forFunction="true"
            rightImg="rightImg"
            color={defaultMode === 'dark' ? 'white' : '#424E9C'}
            onFunctionCall={() => {
              this.props.navigation.navigate('AddEditFormulaScreen', {
                ClientInfo: clientInfo,
              });
            }}
            {...this.props}
          />
        </View>
        <View style={{flex: 8}}>
          <ScrollView style={{...helperFunctions.lightDarkBg()}}>
            {FormulaListData.map((item, index) => (
              <View style={styles.mainContainer} key={index}>
                {/* -----------hidden view----------- */}
                {/* {this.state.newKey == 1 && this.state.hidden ? hiddenView : */}
                {viewDetailsSection == item.id && (
                  <View>
                    <Text style={{...styles.text,color: helperFunctions.darkLightColor()}}>Last Used</Text>
                    <View style={styles.container}>
                      <View style={styles.leftBox}>
                        <Text style={{...helperFunctions.textBlack(),...helperFunctions.smallFont()}}>
                          {Moment(item.lastUseTime).format(
                            'ddd, MMM DD, YYYY hh:mm A',
                          )}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.midBox}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'AddEditFormulaScreen',
                            {
                              ClientInfo: clientInfo,
                              ListInfo: item,
                            },
                          )
                        }>
                        <Entypo style={{marginTop: 7}} size={18} color={helperFunctions.yellow()} name="pencil"/>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{...styles.deleteContainer, marginLeft: 10}}
                        onPress={() => {
                          this.viewDeleteFormula(item.id);
                        }}>
                        <Entypo size={18} color={helperFunctions.yellow()} name="trash"/>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{...styles.rightBox}}
                        onPress={() => {
                          this.viewDetailsClose();
                        }}>
                        <AntDesign size={18} color={helperFunctions.yellow()} name="up"/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.borderStyle} />

                    <Text style={{...helperFunctions.textBlack()}}>Formula type</Text>
                    <Text style={{...styles.text, color: helperFunctions.yellow()}}>{item.type}</Text>
                    <View style={styles.borderStyle} />
                    <Text style={{...helperFunctions.textBlack()}}>Client Note</Text>
                    <Text style={{...helperFunctions.smallFont(),color: helperFunctions.yellow()}}>
                      {item.notes}
                    </Text>
                    <View style={{...styles.back,...helperFunctions.assBg()}}>
                      <View style={styles.leftImg}>
                        {Object.values(TechniciansInfo).map(function(
                          technicians,
                        ) {
                          if (technicians.id == item.technician.id) {
                            return (
                              <View key={technicians.id}>
                                <Image
                                  style={styles.img}
                                  source={{uri: technicians.user.imageUrl}}
                                />
                              </View>
                            );
                          }
                        })}
                      </View>
                      <View style={styles.rightBox2}>
                        <Text style={{...styles.text,color: helperFunctions.darkLightColor()}}>Staff</Text>

                        {Object.values(TechniciansInfo).map(function(
                          technicians,
                        ) {
                          if (technicians.id == item.technician.id) {
                            return (
                              <View key={technicians.id}>
                                <Text style={{...helperFunctions.textBlack()}}>
                                  {technicians.user.fullName}
                                </Text>
                              </View>
                            );
                          }
                        })}
                      </View>
                    </View>
                  </View>
                )}
                {viewDetailsSection != item.id && (
                  <View>
                    <View style={styles.back2}>
                      <View style={styles.leftImg2}>
                        {Object.values(TechniciansInfo).map(function(
                          technicians,
                        ) {
                          if (technicians.id == item.technician.id) {
                            return (
                              <Image
                                style={styles.img2}
                                source={{uri: technicians.user.imageUrl}}
                                key={index}
                              />
                            );
                          }
                        })}
                      </View>

                      <View style={styles.rightBox2}>
                        <Text style={{...styles.text,color: helperFunctions.darkLightColor()}}>
                          {Moment(item.lastUseTime).format(
                            'ddd, MMM DD, YYYY hh:mm A',
                          )}
                          {/* Mon, Aug 1, 2019 02:30pm */}
                        </Text>
                        <Text style={{...helperFunctions.textBlack()}}>{item.type} </Text>
                      </View>
                    </View>
                    <View style={styles.mainBox}>
                      <TouchableOpacity
                        style={styles.left3}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'AddEditFormulaScreen',
                            {
                              ClientInfo: clientInfo,
                              ListInfo: item,
                            },
                          )
                        }>
                        <ImageBackground
                          source={require('../../Assets/formulaList/yellow.png')}
                          style={styles.yellowBack}>
                          <Text style={styles.text1}>Edit Formula</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{...styles.right3,...helperFunctions.flexRow(), justifyContent: 'flex-end'}}
                        onPress={() => this.viewDetails(item.id)}>
                        <AntDesign color={helperFunctions.yellow()} size={18} name="down"/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.borderStyle} />
                  </View>
                )}
              </View>
            ))}

            {FormulaListData.length == 0 && (<View style={{...helperFunctions.flexColumn(),justifyContent: 'center',alignItems:'center',height: Dimensions.get('window').height - 150}}><Text style={{...helperFunctions.largeText(),color: helperFunctions.darkLightColor()}}>Records Not Found!</Text></View>)}

            <Label style={{height: 100}} />
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const mapStateProps = state => {
  // console.log('1546545646544', state);
  const StoreLocationInfo = state.StoreDataReducer.StoreAllData.locations[0].id;
  const FormulaListData = state.FormulaReducer.FormulaListData;
  const formulaListLoader = state.FormulaReducer.formulaListLoader;
  const TechniciansInfo =
    state.StoreDataReducer.StoreAllData.locations[0].technicians;
  // const ClientInfo = state.FormulaReducer.ClientInfo;

  return {
    StoreLocationInfo,
    FormulaListData,
    formulaListLoader,
    TechniciansInfo,
    // ClientInfo
  };
};

export default connect(mapStateProps)(formulaList);

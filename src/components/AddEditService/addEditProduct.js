import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {Button, Card} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {_addProduct} from '../../Redux/SagaActions/UpcommingAppoinments_action';
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
  TextInput,
  Input,
  CardItem,
} from 'native-base';
import CustomBox from './CustomBox/customBox';
import Moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ProductGenerator, Products} from '../Appointment/ProductGenerator';
import {GetProduct} from '../../Redux/Action/ServiceAndProductAction.js';
import LOADER from '../Loader/Loader';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {FormatedProduct} from './FormatedProduct';
import {EditProductGenerator} from '../Appointment/ProductGenerator';
import {addProduct} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import {updateProduct} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import HeaderComponent from '../Header/header';
import animated from 'react-native-reanimated';
import {
  _requestSearchService,
  GetSearchProduct,
  _requestSearchProduct,
  _requestSearchProductById,
} from '../../Redux/SagaActions/ServiceAndProductSagaAction';
import SearchPicker from '../ImportantFunction//SearchPicker';
import {helperFunctions} from '../../_helpers';

const {width, height} = Dimensions.get('window');

class addEditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicianId: this.props.navigation.state.params.TechnicianId,
      technicianName: '',
      ProductData: [],
      ProdoctLoader: false,
      selectedItems: {},
      formatedProductData: '',
      quantityNumber: [],
      quantity: 0,
      items: [],
      products: [],
      value: '',
      counter: 1,
      selectedProducts: this.props.navigation.state.params.selectedProducts,
      initialValue: new Animated.ValueXY({x: 0.1, y: 0.1}),
      faded: new Animated.Value(1),
      infoFaded: new Animated.Value(1),
      transform: new Animated.Value(1),
      isAnimated: false,
      isSearchable: false,
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(await GetProduct(this.props.locationId));
    if (this.props.navigation.getParam('EditProduct')) {
      setTimeout(() => {
        this.onItemSelect(this.props.navigation.getParam('EditProduct'));
      }, 200);
      setTimeout(() => {
        this.selectQuantity(
          this.props.navigation.state.params.EditProduct.quantity,
        );
      }, 30);
    }
  };

  static getDerivedStateFromProps(props, state) {
    const {ProductData, ProdoctLoader, TechnicianId} = props;
    return {
      ProductData,
      ProdoctLoader,
      TechnicianId,
    };
  }
  onSave = () => {
    if (this.props.navigation.getParam('EditProduct')) {
      if (!this.props.navigation.getParam('EditProduct').id) {

        this.props.navigation.state.params.onGoBackProduct()(
          ProductGenerator(
            this.state.selectedItems.name,
            // null,
            // null,
            this.state.TechnicianId,
            this.state.counter,
            this.state.selectedItems.price
              ? this.state.selectedItems.price
              : this.state.selectedItems.chargeAmount,
            this.state.selectedItems.id
              ? this.state.selectedItems.id
              : this.state.selectedItems.locatedProductVariant.id,
          ),
        );
        this.props.navigation.goBack();
      } else {
        alert()
        console.log('ss',this.state.selectedItems)
        updateProduct(
          this.props.navigation.getParam('EditProduct').id,
          EditProductGenerator(
            null,
            null,
            this.props.navigation.getParam('visitId'),
            this.state.TechnicianId,
            this.state.counter,
            this.state.selectedItems.price,
            this.state.selectedItems.id,
          ),
          response => {
            response.then(data => {
              console.log('response.Body', data);
              this.onAfterSaveProduct(data);
            });
          },
          error => {
            console.log('error1', error);
          },
        );
      }
    } else if (this.props.navigation.getParam('FromEditAppt')) {
      addProduct(
        EditProductGenerator(
          null,
          null,
          this.props.navigation.getParam('visitId'),
          this.state.TechnicianId,
          this.state.quantity,
          this.state.selectedItems.salePrice,
          this.state.selectedItems.id,
        ),
        response => {
          response.then(data => {
            console.log('response.Body', data);
            this.onAfterSaveProduct(data);
          });
        },
        error => {
          console.log('error1', error);
        },
      );
    } else {
      this.props.navigation.state.params.onGoBackProduct()(
        ProductGenerator(
          this.state.selectedItems.name,
          // null,
          // null,
          this.state.TechnicianId,
          this.state.quantity,
          this.state.selectedItems.salePrice,
          this.state.selectedItems.id,
        ),
      );
      this.props.navigation.goBack();
    }
  };

  onAfterSaveProduct = item => {
    this.props.navigation.state.params.onGoBackProduct()(
      EditProductGenerator(
        this.state.selectedItems && this.state.selectedItems.name
          ? this.state.selectedItems.name
          : this.props.navigation.state.params.name,
        item.id,
        item.visit.id,
        item.technician.id,
        item.quantity,
        item.chargeAmount,
        item.locatedProductVariant.id,
      ),
    );

    this.props.navigation.goBack();
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
        products: [],
      });
    } else {
      _requestSearchProduct(this.props.locationId, txt).then(items => {
        this.setState({
          items,
          services: items,
        });
      });
    }
  };

  onItemSelect = item => {
    console.log('ITEMss', item);
    if (!this.state.isSearchable) {
      if (this.props.navigation.getParam('EditProduct')) {
        if (!this.props.navigation.state.params.editable) {
          this.setState({
            selectedItems: item,
            value: item.name,
            items: [],
          });
        } else {
          _requestSearchProductById(item.locatedProductVariant.id).then(
            item => {
              const slItem = {
                id: item.id,
                key: item.id,
                name: item.variant.product.name,
                brand: item.variant.product.brand.name,
                price: item.salePrice,
                image: item.variant.imageUrls[0],
              };
              this.setState({
                selectedItems: slItem,
                value: item.variant.product.name,
                items: [],
              });
            },
          );
          this.setState({
            selectedItems: item,
            value: item.name,
            items: [],
          });
        }
      } else {
        const slItem = {
          id: item.id,
          key: item.id,
          name: item.variant.product.name,
          brand: item.variant.product.brand.name,
          price: item.salePrice,
          image: item.variant.imageUrls[0],
        };
        this.setState({
          selectedItems: slItem,
          value: item.variant.product.name,
          items: [],
        });
      }
    } else {
      const slItem = {
        id: item.id,
        key: item.id,
        name: item.variant.product.name,
        brand: item.variant.product.brand.name,
        price: item.salePrice,
        image: item.variant.imageUrls[0],
      };
      this.setState({
        selectedItems: slItem,
        value: item.variant.product.name,
        items: [],
      });
    }
  };

  selectQuantity = val => {
    this.setState({
      quantity: val,
    });
  };

  animateCounter = operator => {
    const {counter} = this.state;
    if (operator == '+') {
      if (counter * 1 < 50 && counter * 1 > 0) {
        this.setState({
          counter: counter + 1,
        });
      }
    } else {
      if (counter > 1 && counter <= 50) {
        this.setState({
          counter: counter - 1,
        });
      }
    }
  };
  change = () => {
    this.setState({
      isAnimated: !this.state.isAnimated,
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
        var selectedProducts = this.state.selectedProducts;

        const exist = this.state.selectedProducts.find(
          sp => sp.id == this.state.selectedItems.id,
        );
        if (exist) {
          const newCollection = this.state.selectedProducts.map(s => {
            if (s.id == this.state.selectedItems.id) {
              return {
                ...s,
                quantity: this.state.counter,
              };
            }
            return s;
          });
          selectedProducts = newCollection;
        } else {
          selectedProducts.push({
            id: this.state.selectedItems.id,
            key: this.state.selectedItems.id,
            name: this.state.selectedItems.name,
            price: this.state.selectedItems.price,
            technicianId: this.props.navigation.state.params.TechnicianId,
            quantity: this.state.counter,
            image: this.state.selectedItems.image,
          });
        }

        this.setState({
          initialValue: new Animated.ValueXY({x: 0, y: 0}),
          faded: new Animated.Value(1),
          transform: new Animated.Value(1),
          isAnimated: !this.state.isAnimated,
          selectedProducts: selectedProducts,
          selectedItems: {},
          counter: 1,
          value: '',
        });
      }, 1000);
    }, 1000);
  };

  gotoPrev = () => {
    alert()
    //this.props.addProduct(this.state.selectedItems)
  };
  updateProduct = () => {
    if (this.props.navigation.state.params.editable) {

      this.onSave();
    } else {
      const newCollection = this.props.navigation.state.params.selectedProducts.filter(
        sp => sp.id != this.props.navigation.state.params.EditProduct.id,
      );
      newCollection.push({
        id: this.state.selectedItems.id,
        key: this.state.selectedItems.id,
        name: this.state.selectedItems.name,
        price: this.state.selectedItems.price,
        technicianId: this.props.navigation.state.params.TechnicianId,
        quantity: this.state.counter,
        image: this.state.selectedItems.image,
      });

      console.log('NEW COLLECTION', newCollection);

      this.setState(
        {
          selectedProducts: newCollection,
        },
        () => {
          this.gotoPrev();
        },
      );
    }
  };
  updateRealProduct = () => {
    this.props.navigation.state.params.onGoBack()(
      EditProductGenerator(
        this.state.selectedItems && this.state.selectedItems.name
          ? this.state.selectedItems.name
          : this.props.navigation.state.params.name,
        null,
        this.props.navigation.state.params.visitId,
        this.props.navigation.state.params.TechnicianId,
        this.state.counter,
        this.state.selectedItems.price,
        this.state.selectedItems.id,
      ),
    );

    this.props.navigation.goBack();
  };

  addProducts=()=>{
    alert()
  }

  render() {
    const {
      ProductData,
      ProdoctLoader,
      quantityNumber,
      items,
      selectedItems,
      selectedProducts,
    } = this.state;
    console.log('ITEMS', selectedItems);

    let apptDate = this.props.navigation.getParam('apptDate');

    return ProdoctLoader == false ? (
      <LOADER />
    ) : (
      <Container style={styles.pro_background}>
        <View style={{flex: 1.5, justifyContent: 'center'}}>
          <HeaderComponent
            title={
              this.props.navigation.state.params.name
                ? 'Edit Product'
                : 'Add Product'
            }
            // forFunction="true"
            // rightImg="rightImg"

            {...this.props}
          />
        </View>


            <TouchableOpacity
              onPress={this.addProducts}
              style={{position: 'absolute', right: 20, top: 60}}>
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
                  {this.state.selectedProducts.length}
                </Text>
              </View>
            </TouchableOpacity>


        <View style={{flex: 8, marginHorizontal: 35}}>
          <View style={{flex: 0.3}} />

          <View
            style={{
              position: 'relative',
              ...helperFunctions.flexColumn(),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -60,
            }}>
            <View
              style={{
                ...helperFunctions.deviceWiseWidth(350, 400, 500, 600),
              }}>
              <Text
                style={{
                  ...helperFunctions.textBlack(),
                  ...helperFunctions.themeColor(),
                }}>
                Search product
              </Text>
              <View style={{height: 15}} />
              <Item
                style={{
                  borderColor: '#FFFFFF',
                  ...helperFunctions.assBg(),
                  paddingHorizontal: 10,
                  borderRadius: 10,
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
              </Item>
              {items.length > 0 && (
                <ScrollView
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
                        {i.quantity !== 0 && i.quantity > 0 ? (
                          <TouchableWithoutFeedback
                            onPress={() => this.onItemSelect(i)}>
                            <View>
                              <Text style={{...helperFunctions.textSize()}}>
                                {i.variant.product.name}{' '}
                                {`(${i.variant.product.brand.name})`}{' '}
                              </Text>
                              <View
                                style={{
                                  ...helperFunctions.textSize(),
                                  ...helperFunctions.flexRow(),
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    ...helperFunctions.textBlack(),
                                    ...helperFunctions.themeColor(),
                                  }}>
                                  Qty: {i.quantity}
                                </Text>
                                <Text
                                  style={{
                                    ...helperFunctions.textBlack(),
                                    ...helperFunctions.yellowColor(),
                                  }}>
                                  Price: ${(i.salePrice * 1).toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        ) : (
                          <View
                            style={{
                              ...helperFunctions.assBg(),
                              opacity: 0.5,
                            }}>
                            <View>
                              <Text style={{...helperFunctions.textSize()}}>
                                {i.variant.product.name}{' '}
                                {`(${i.variant.product.brand.name})`}{' '}
                              </Text>
                              <View
                                style={{
                                  ...helperFunctions.textSize(),
                                  ...helperFunctions.flexRow(),
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    ...helperFunctions.textBlack(),
                                    ...helperFunctions.themeColor(),
                                  }}>
                                  Qty: {i.quantity}
                                </Text>
                                <Text
                                  style={{
                                    ...helperFunctions.textBlack(),
                                    ...helperFunctions.yellowColor(),
                                  }}>
                                  Price: ${(i.salePrice * 1).toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>

          <View style={{flex: 0.3}} />
          {Object.keys(selectedItems).length > 0 && (
            <View style={{marginTop: -30}}>
              <View
                style={{
                  ...helperFunctions.flexColumn(),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 300, height: 300}}
                  source={{
                    uri:
                      Object.keys(selectedItems).length > 0 &&
                      selectedItems.image,
                  }}
                />
                <Text
                  style={{
                    ...helperFunctions.textBlack(),
                  }}>
                  {selectedItems.name}
                </Text>
                <Text style={{...helperFunctions.textBlack()}}>
                  {selectedItems.brand}
                </Text>
                <Text
                  style={{
                    ...helperFunctions.textSize(),
                    ...helperFunctions.yellowColor(),
                  }}>
                  ${' '}
                  {Object.keys(selectedItems).length > 0 &&
                    (selectedItems.price * 1).toFixed(2)}
                </Text>
              </View>

              <View
                style={{...helperFunctions.defaultPadding(), marginTop: 20}}>
                <View>
                  <View
                    style={{
                      ...helperFunctions.flexRow(),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => this.animateCounter('+')}>
                      <EvilIcons color="#000000" size={45} name={'plus'} />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 40,
                        ...helperFunctions.flexRow(),
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...helperFunctions.textBlack(),
                          ...helperFunctions.moreLink(20, 25, 30),
                        }}>
                        {this.state.counter}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.animateCounter('-')}>
                      <EvilIcons color="#000000" size={45} name={'minus'} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      ...helperFunctions.flexRow(),
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    {!this.props.navigation.getParam('EditProduct') &&
                    !this.props.navigation.state.params.realUpdate ? (
                      <Button
                        onPress={this.change}
                        rounded
                        style={{
                          width: 150,
                          ...helperFunctions.flexRow(),
                          justifyContent: 'center',
                          ...helperFunctions.yellowBg(),
                        }}>
                        <Text style={{textAlign: 'center'}}>Add To Cart</Text>
                      </Button>
                    ) : this.props.navigation.state.params.realUpdate ==
                      true ? (
                      <Button
                        onPress={this.updateRealProduct}
                        rounded
                        style={{
                          width: 150,
                          ...helperFunctions.flexRow(),
                          justifyContent: 'center',
                          ...helperFunctions.yellowBg(),
                        }}>
                        <Text style={{textAlign: 'center'}}>Save Product</Text>
                      </Button>
                    ) : (
                      <Button
                        onPress={this.updateProduct}
                        rounded
                        style={{
                          width: 150,
                          ...helperFunctions.flexRow(),
                          justifyContent: 'center',
                          ...helperFunctions.yellowBg(),
                        }}>
                        <Text style={{textAlign: 'center'}}>Update</Text>
                      </Button>
                    )}
                  </View>
                </View>
                <View style={{height: 20}} />
              </View>
            </View>
          )}

          <View style={{flex: 2.5}} />
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
                      <View
                        style={{
                          ...helperFunctions.flexRow(),
                          justifyContent: 'flex-start',
                        }}>
                        <View style={{flex: 1}}>
                          <Image
                            style={{
                              ...helperFunctions.deviceWiseWidthHeight(
                                80,
                                90,
                                100,
                                110,
                              ),
                              marginRight: 15,
                            }}
                            source={{uri: selectedItems.image}}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            ...helperFunctions.flexColumn(),
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text style={{...helperFunctions.textBlack()}}>
                              {Object.keys(selectedItems).length > 0 &&
                                selectedItems.brand}
                            </Text>
                            <Text
                              style={{
                                ...helperFunctions.smallFont(),
                              }}>
                              {selectedItems.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              ...helperFunctions.flexRow(),
                              justifyContent: 'space-between',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                ...helperFunctions.textBlack(),
                                ...helperFunctions.yellowColor(),
                                ...helperFunctions.smallFont(),
                              }}>
                              Qty: {this.state.counter}
                            </Text>
                            <Text
                              style={{
                                ...helperFunctions.textBlack(),
                                ...helperFunctions.smallFont(),
                                ...helperFunctions.yellowColor(),
                              }}>
                              Price: ${(selectedItems.price * 1).toFixed(2)}
                            </Text>
                          </View>
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
    );
  }
}

const mapStateProps = state => {
  const locationId = state.StoreDataReducer.StoreAllData.locations[0].id;

  const ProductData = state.ServiceAndProductReducer.ProductData;
  const ProdoctLoader = state.ServiceAndProductReducer.ProdoctLoader;
  const formatedProductData =
    state.ServiceAndProductReducer.formatedProductData;
  const TechnicianId = state.LoggedData.TechnicianId;

  return {
    locationId,
    ProductData,
    ProdoctLoader,
    formatedProductData,
    TechnicianId,
  };
};

export default connect(mapStateProps)(addEditProduct);

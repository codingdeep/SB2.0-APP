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
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {Button, Card} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {_addProduct} from '../../Redux/SagaActions/UpcommingAppoinments_action';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
const defaultMode = Appearance.getColorScheme() || 'light';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
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

class AddEditProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicianId: '',
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
      counter: this.props.isEditable == true ? this.props.item.quantity : 1,
      selectedProducts:
        this.props.productsCounter.length > 0 ? this.props.productsCounter : [],
      initialValue: new Animated.ValueXY({x: 0.1, y: 0.1}),
      faded: new Animated.Value(1),
      infoFaded: new Animated.Value(1),
      transform: new Animated.Value(1),
      isAnimated: false,
      isSearchable: false,
      saveProduct: true
    };
  }

  componentDidMount = async () => {
    if (this.props.isEditable === true) {
      this.onItemSelect(this.props.item);
    }
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
      saveProduct: false
    })
    if (this.props.isEditable === true) {
      if (this.props.realUpdate == true) {
        const product = {
          chargeAmount: this.state.selectedItems.price,
          locatedProductVariant: {
            id: this.state.selectedItems.id,
          },
          quantity: this.state.counter,
          technician: {
            id: this.props.TechnicianId,
          },
          visit: {
            id: this.props.visitId,
          },
        };
        this.updateProduct(this.props.item.itemId, product);
      } else {
        const remainder = this.state.selectedProducts.filter(
          sv => sv.key != this.props.item.key,
        );

        remainder.push({
          id: this.state.selectedItems.id,
          key: this.state.selectedItems.id,
          name: this.state.selectedItems.name,
          brand: this.state.selectedItems.brand,
          price: this.state.selectedItems.price,
          image: this.state.selectedItems.image,
          quantity: this.state.counter,
          technician: this.props.TechnicianId
        });
        this.setState(
          {
            selectedProducts: remainder,
            saveProduct: true
          },
          () => {
            this.addProducts();
          },
        );
      }
    } else if (this.props.realUpdate == true) {
      const productJSON = {
        chargeAmount: this.state.selectedItems.price,
        locatedProductVariant: {
          id: this.state.selectedItems.id,
        },
        quantity: this.state.counter,
        technician: {
          id: this.props.TechnicianId,
        },
        visit: {
          id: this.props.visitId,
        },
      };
      _addProduct(productJSON).then(res => {
        var selectedProducts = this.state.selectedProducts;

        selectedProducts.push({
          id: this.state.selectedItems.id,
          key: this.state.selectedItems.id,
          name: this.state.selectedItems.name,
          brand: this.state.selectedItems.brand,
          price: this.state.selectedItems.price,
          image: this.state.selectedItems.image,
          quantity: this.state.counter,
          technician: this.props.TechnicianId,
        });
        this.setState(
          {
            selectedProducts,
            saveProduct: true
          },
          () => {
            this.addProducts();
          },
        );
      });
    } else {
      this.setState({
        isAnimated: !this.state.isAnimated
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

          const product = {
            id: this.state.selectedItems.id,
            key: this.state.selectedItems.id,
            name: this.state.selectedItems.name,
            brand: this.state.selectedItems.brand,
            price: this.state.selectedItems.price,
            image: this.state.selectedItems.image,
            quantity: this.state.counter,
            technician: this.props.TechnicianId,
          }

          // selectedProducts.push({
          //
          // });



          const exist = this.state.selectedProducts.find(
            sp => sp.id == this.state.selectedItems.id,
          );
          if (exist) {
            console.log(this.state.counter);
            const newCollection = this.state.selectedProducts.map(s => {
              console.log(s)
              if (s.id == this.state.selectedItems.id) {
                return {
                  ...s,
                  quantity: s.quantity*1 + this.state.counter*1,
                };
              }
              return s;
            });
            selectedProducts = newCollection;
          } else {
            selectedProducts.push(this.state.selectedItems);
            console.log('pushed');
          }

          this.setState({
            initialValue: new Animated.ValueXY({x: 0, y: 0}),
            faded: new Animated.Value(1),
            transform: new Animated.Value(1),
            isAnimated: !this.state.isAnimated,
            selectedProducts: selectedProducts,
            selectedItems: {},
            value: '',
            saveProduct: true
          });
        }, 1000);
      }, 1000);
    }
  };

  updateProduct = async (id, product) => {
    await updateProduct(
      id,
      product,
      response => {
        this.props.addProduct();
      },
      error => {
        alert(error.errors ? error.errors : error.message);
      },
    );
  };

  onItemSelect = item => {
    if (this.props.isEditable === true) {
      if (!this.state.isSearchable) {
        const slItem = {
          id: item.id,
          key: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          image: item.image,
          quantity: this.state.counter,
          technician: this.props.TechnicianId,
        };
        this.setState({
          selectedItems: slItem,
          value: item.name,
          items: [],
        });
      } else {
        const slItem = {
          id: item.id,
          key: item.id,
          name: item.variant.product.name,
          brand: item.variant.product.brand.name,
          price: item.salePrice,
          image: item.variant.imageUrls[0],
          quantity: this.state.counter,
          technician: this.props.TechnicianId,
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
        Technician: this.props.TechnicianId,
        quantity: this.state.counter
      };
      this.setState(
        {
          selectedItems: slItem,
          value: item.variant.product.name,
          items: [],
        },
        () => {
          console.log('SELECTED', this.state.selectedItems);
        },
      );
    }
  };

  addProducts = () => {
    if(this.state.saveProduct == true) {
      this.props.addProduct(this.state.selectedProducts);
    }
  };

  closeProductModal = () => {
    this.props.closeProductModal();
  };

  render() {
    const {
      ProductData,
      ProdoctLoader,
      quantityNumber,
      items,
      selectedItems,
      selectedProducts,
    } = this.state;

    return (
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
              Add Products
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={this.addProducts}
          style={{position: 'absolute', right: 20, top: 40}}>
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
              {this.state.selectedProducts.length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.closeProductModal}
          style={{position: 'absolute', left: 20, top: 40}}>
          <AntDesign color={helperFunctions.yellow()} name="close" size={30} />
        </TouchableOpacity>

        <View style={{flex: 8, marginHorizontal: 35}}>
          <View style={{flex: 0.3}} />

          <View
            style={{
              position: 'relative',
              ...helperFunctions.flexColumn(),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -20
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
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  ...helperFunctions.assBg(),
                  borderBottomWidth: 0
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
                  onChangeText={(text) => this.searchItems(text)}
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
                              <Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>
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
                              backgroundColor:'#ddd',
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
          <ScrollView>{Object.keys(selectedItems).length > 0 && (
            <View style={{marginTop: 10}}>
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
                      {defaultMode === 'dark' ? (<EvilIcons color="#fff" size={45} name={'plus'} />) : (<EvilIcons color="#000000" size={45} name={'plus'} />)}
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
                      {defaultMode === 'dark' ? (<EvilIcons color="#fff" size={45} name={'minus'} />) : (<EvilIcons color="#000000" size={45} name={'minus'} />)}

                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      ...helperFunctions.flexRow(),
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={this.state.saveProduct == true ? this.change : () => console.log('do nothing..')}
                      style={{
                        width: 150,
                        ...helperFunctions.flexRow(),
                        justifyContent: 'center',
                        ...helperFunctions.yellowBg(),
                        paddingVertical: 10,
                        borderRadius: 20
                      }}>
                      <Text style={{textAlign: 'center'}}>
                        {this.props.isEditable == true
                          ? 'Add Product'
                          : this.props.realUpdate == true
                          ? 'Update'
                          : 'Add To Cart'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{height: 20}} />
              </View>
            </View>
          )}</ScrollView>

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
                            <Text style={{...helperFunctions.textBlack(),color: '#000'}}>
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

export default connect(mapStateProps)(AddEditProducts);

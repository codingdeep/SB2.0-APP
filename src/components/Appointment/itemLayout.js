/* eslint-disable */
import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {PanGestureHandler} from "react-native-gesture-handler";
import {helperFunctions} from "../../_helpers";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Moment from "moment";
import Icons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";

const ItemLayout = ({item, purchaseItems}) => {

    const findDurationPrice = (displayedPrice, query) => {
        if(displayedPrice == '-1.00'){
            return 'Per Consult'
        }
        if(displayedPrice == '-1'){
            return 'Per Consult'
        }

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

    return purchaseItems && purchaseItems == true ? (
        <>

            <Image
                style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 25,
                }}
                source={{uri: item.image}}
            />
            <View>
                <View
                    style={{
                        ...helperFunctions.flexColumn(),
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>
                        {item.name}
                    </Text>
                    <View
                        style={{
                            ...helperFunctions.flexRow(),
                            marginTop: 10,
                        }}>
                        <Text style={{color: helperFunctions.yellow(), marginRight: 15}}>
                            <FontAwesome color="#666" name="circle"/>{' '}
                            Qty: {item.quantity}
                        </Text>
                        <Text style={{color: helperFunctions.yellow()}}>
                            <FontAwesome color="#999" name="circle"/>{' '}
                            Price: {(item.price * 1).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

        </>

    ) : (
        <>

            <Image
                style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 25,
                }}
                source={{
                    uri: item.technicianImage,
                }}
            />
            <View>
                <View
                    style={{
                        ...helperFunctions.flexColumn(),
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{...helperFunctions.textSize(),color: helperFunctions.darkLightColor()}}>
                        {item.servicename} with {item.technicianname}
                    </Text>
                    <View
                        style={{
                            ...helperFunctions.flexRow(),
                            marginTop: 10,
                        }}>
                        <Text style={{...helperFunctions.yellowColor(), marginRight: 15}}>
                            <FontAwesome color="#666" name="circle"/>{' '}

                            {findDurationPrice(item.price)}
                        </Text>
                        <Text style={{...helperFunctions.yellowColor()}}>
                            <FontAwesome color="#666" name="circle"/>{' '}
                            {Moment(item.timeStart).format('hh:mm a')} -{' '}
                            {Moment(item.timeEnd).format('hh:mm a')}
                        </Text>
                    </View>
                </View>
            </View>

        </>

    )
}

export default ItemLayout

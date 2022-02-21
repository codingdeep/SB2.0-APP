/* eslint-disable */
import React from 'react';
import {View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';
import {helperFunctions} from "../../_helpers";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Moment from "moment";
import Icons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import Animated, {add, cond, eq, set, useCode, abs} from "react-native-reanimated";
import {PanGestureHandler, State} from "react-native-gesture-handler";
import ItemLayout from "./itemLayout";
import {min, snapPoint, timing, usePanGestureHandler, useValue} from 'react-native-redash';
import Action from "./action";

const {width, height} = Dimensions.get('window')
const Items = ({item,deleteTechs,editAddedServices,purchaseItems,deleteProducts,editProducts, status, permission,checkInCheckOutPerission,checkServiceIn,checkServiceOut,product}) => {

    const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
    const translateX = useValue(0);
    const offsetX = useValue(0);
    const snapPoints = [-150, 0]
    const to = snapPoint(translateX, velocity.x, snapPoints)

    useCode(() => [
        cond(
            eq(state, State.ACTIVE), set(translateX, add(offsetX, min(translation.x, 0)))
        ),
        cond(eq(state, State.END),
            set(translateX, timing({from: translateX, to})),
            set(offsetX, translateX))
    ], [])


    const deleteTech =(item) =>{
        deleteTechs(item)
    }
    const editService =(item) =>{
        editAddedServices(item)
    }
    const editProduct =(item)=>{
        editProducts(item)
    }
    const deleteProduct =(item)=>{
        deleteProducts(item)
    }

    const checkInService=(id)=>{
        checkServiceIn(id)
    }
    const checkOutService=(id, amount)=>{

        checkServiceOut(id,amount)
    }


    return (

        <Animated.View style={{paddingHorizontal: 10, overflow: 'hidden', ...helperFunctions.flexRow(), justifyContent: 'space-between'}}>
            {status != 'Checked Out' ? (<PanGestureHandler {...gestureHandler}>
                <Animated.View
                    style={{
                        ...helperFunctions.flexRow(),
                        alignItems: 'center',
                        paddingVertical: 15,
                        transform: [{translateX: translateX}],
                        zIndex: 1,
                        position: 'relative'
                    }}>
                    <ItemLayout purchaseItems={purchaseItems} item={item && item}/>
                </Animated.View>



            </PanGestureHandler>) : (
                <Animated.View
                    style={{
                        ...helperFunctions.flexRow(),
                        alignItems: 'center',
                        paddingVertical: 15,
                        transform: [{translateX: translateX}],
                        zIndex: 1,
                        position: 'relative'
                    }}>
                    <ItemLayout purchaseItems={purchaseItems} item={item && item}/>
                </Animated.View>) }


            <Animated.View style={[styles.background,{width: abs(translateX)}]}>
                <Animated.View style={{display: 'flex', flexDirection: 'row'}}>
                    {purchaseItems == false && permission == true && checkInCheckOutPerission == true && status != undefined && status == 'Booked' &&
                    <TouchableOpacity
                        style={{paddingHorizontal: 9, borderRightWidth: 1, borderRightColor: helperFunctions.yellow()}}
                        onPress={()=>checkInService(item.id)}>

                        <Action icon="arrow-down"/>
                    </TouchableOpacity>
                    }

                    {purchaseItems == false && permission == true && checkInCheckOutPerission == true && status != undefined &&  status == 'Booked' &&
                    <TouchableOpacity onPress={()=>checkOutService(item.id, item.price)} style={{paddingHorizontal: 9, borderRightWidth: 1,borderRightColor: helperFunctions.yellow()}}>
                        <Action icon="arrow-up"/>
                    </TouchableOpacity>
                    }
                    {purchaseItems == false && permission == true && checkInCheckOutPerission == true && status != undefined &&  status == 'Checked In' &&
                    <TouchableOpacity style={{paddingHorizontal: 9, borderRightWidth: 1,borderRightColor: helperFunctions.yellow()}}  onPress={()=>checkOutService(item.id, item.price)}>
                        <Action icon="arrow-up"/>
                    </TouchableOpacity>
                    }

                    {permission == true && status != undefined && status != 'Checked Out' &&
                    <TouchableOpacity  style={{paddingHorizontal: 9, borderRightWidth: 1, borderRightColor: helperFunctions.yellow()}} onPress={purchaseItems == true ? ()=>editProduct(item) : ()=>editService(item)}>
                        <Action icon="edit"/>
                    </TouchableOpacity>
                    }
                    {permission == true &&  status != undefined &&  status != 'Checked Out' &&
                    <TouchableOpacity style={{paddingLeft: 9}}  onPress={purchaseItems == true ? ()=>deleteProduct(item) :()=>deleteTech(item)}>
                        <Action icon="trash"/>
                    </TouchableOpacity>
                    }


                    {status == undefined &&
                    <TouchableOpacity  style={{paddingHorizontal: 9, borderRightWidth: 1, borderRightColor: helperFunctions.yellow()}} onPress={purchaseItems == true ? ()=>editProduct(item) : ()=>editService(item)}>
                        <Action icon="edit"/>
                    </TouchableOpacity>
                    }
                    {status == undefined &&
                    <TouchableOpacity style={{paddingLeft: 9}}  onPress={purchaseItems == true ? ()=>deleteProduct(item) :()=>deleteTech(item)}>
                        <Action icon="trash"/>
                    </TouchableOpacity>
                    }



                </Animated.View>
            </Animated.View>

        </Animated.View>
    )
}
const styles = StyleSheet.create({
    background: {
        flexDirection: "row",
        alignItems: "center",
        width: 0,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 0,
        top: '50%',
        marginTop: -10

    },
});
export default Items

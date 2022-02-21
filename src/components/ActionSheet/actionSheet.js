/* eslint-disable */
import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {helperFunctions} from '../../_helpers';
import {_requestToPasrAppoApi} from '../../Redux/SagaActions/AppoinmentsSagaAction';
import moment from 'moment';

const {width, height} = Dimensions.get('window');
const ActionSheet = ({translateY,id,locationId,StoreAllData,closeActionSheets}) => {
    console.log(id)
    const [state,setState] = useState([]);

        useEffect(() => {

            _requestToPasrAppoApi(locationId.id, id).then(res => {
                console.log('action', res)
                setState(res)
            })

        },[])



    const findTechnician = (id, query) => {
        const tech =
            StoreAllData &&
            StoreAllData.locations[0].technicians.find(
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
    function findServiceName(serviceId, categoryId) {
        // eslint-disable-next-line
        let category = StoreAllData.offeredServiceCategories.find(sc => sc.id == categoryId)
        if (category == null)
            return "Service not found"
        let service = category.services.find(s => s.id == serviceId)
        if (service == null)
            return "Service not found"
        return service.name;
    }
    const closeActionSheet=()=>{
        closeActionSheets()
    }


    return (
        <Fragment>

                <TouchableOpacity onPress={closeActionSheet} style={translateY == false ? {
                    backgroundColor: 'rgba(0,0,0,.5)',
                    ...StyleSheet.absoluteFill,
                    zIndex: -1
                } : {
                    backgroundColor: 'rgba(0,0,0,.5)',
                    ...StyleSheet.absoluteFill,
                    zIndex: 1
                } }></TouchableOpacity>


            {state && state.length > 0 &&
            <Animated.View style={translateY == false ? [Styles.bottomSheet,  {transform: [{translateY: 400}]}] : [Styles.bottomSheet, {display:'flex',alignItems: 'center',flexDirection: 'column',justifyContent: 'center',transform: [{translateY: 0}]}] }>

                <View style={{marginTop: 10}}>
                    {state[0].visitTechnicians.map((vt,key)=>{
                        return <View  key={key}><View style={{display: 'flex',flexDirection: 'row', alignItems: 'center'}}><Image style={{ width: 30, height: 30, borderRadius: 30,marginRight: 10}}
                                                       source={{uri: findTechnician(vt.technician.id,'image')}}/><Text style={{...helperFunctions.textBlack(), ...helperFunctions.yellowColor()}}>{findServiceName(vt.offeredService.id,vt.offeredService.category.id)} <Text style={{color: 'white'}}>with</Text> {findTechnician(vt.technician.id,'nick')}</Text></View>


                            <View style={{...helperFunctions.flexColumn(), alignItems: 'center'}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}><Text style={{...helperFunctions.smallFont(), color: 'white'}}>{helperFunctions.formatDateTimeWithDay(moment(state[0].period.from),'time_after')}</Text><Text style={{color: 'white'}}> - </Text><Text style={{...helperFunctions.smallFont(), ...helperFunctions.yellowColor()}}>${(vt.chargeAmount*1).toFixed(2)}</Text></View>
                                <Text style={{...helperFunctions.textSize(), ...helperFunctions.yellowColor()}}>{helperFunctions.formatDateTimeWithDay(moment(state[0].period.from),'time')} - {helperFunctions.formatDateTimeWithDay(moment(state[0].period.to),'time')}
                                    </Text>

                            </View></View>
                    })}
                </View>
            </Animated.View>
            }
        </Fragment>
    );
};
const Styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: width - 3,
        height: 400,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 1.5,
        ...helperFunctions.themeBg(),
        zIndex: 1
    },
});

export default ActionSheet;





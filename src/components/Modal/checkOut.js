/* eslint-disable */

import React,{Component} from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {helperFunctions} from "../../_helpers";
import {Button, Form, Text, Item, Input} from "native-base";
import Icons from "react-native-vector-icons/EvilIcons";
class CheckOut extends Component{
    constructor(props) {
        super(props);

        this.state={
            chargeAmount: ""
        }

    }
    serviceCheckOut=()=>{

        this.props.checkServiceOut(this.state.chargeAmount != '' ? this.state.chargeAmount : this.props.chargeAmount);

    }

    closeCheckModal=()=>{
        this.props.closeCheckOut();
    }


    render() {
        return(
            <View>
                <Modal
                    backdropColor={'#000000'}
                    backdropOpacity={0.5}
                    isVisible={this.props.checkOutModal}>

                    <View style={{...helperFunctions.lightDarkBg(), ...helperFunctions.padding(30, 30, 30, 30),position: 'relative',zIndex: -1}}>
                        <View style={{
                            ...helperFunctions.flexRow(),
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={{...helperFunctions.textBlack()}}>Charge Amount</Text>
                            <TouchableOpacity onPress={this.closeCheckModal}><Icons color={helperFunctions.yellow()} name="close"
                                                                               size={15}/></TouchableOpacity>
                        </View>
                        <View style={{height: 30}}></View>
                        <Form>


                            <View>

                                <Item>
                                    <Input placeholder={ this.findDurationPrice(this.props.chargeAmount)} style={{...helperFunctions.textBlack()}} onChangeText={txt=>this.setState({chargeAmount: txt})} value={this.state.chargeAmount}/>
                                </Item>
                                {this.props.errors && <Text style={{color: 'red'}}>{this.props.errors}</Text>}
                            </View>
                            <View style={{height: 30}}></View>
                            <View style={{...helperFunctions.flexRow(), justifyContent: 'flex-end'}}>
                                <Button onPress={this.serviceCheckOut} rounded
                                        style={{...helperFunctions.buttonHeight()}}><Text>Check Out</Text></Button>
                            </View>
                        </Form>

                    </View>

                </Modal>
            </View>
        )
    }
  findDurationPrice = (displayedPrice, query) => {
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
}

export default CheckOut

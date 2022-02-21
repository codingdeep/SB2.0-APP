/* eslint-disable */

import React,{Component} from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {helperFunctions} from "../../_helpers";
import {Button, Form, Input, Text, Textarea} from "native-base";
import Icons from "react-native-vector-icons/EvilIcons";
class CheckIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            customerNotes: '',
            loading: false
        }

    }
    checkIn=()=>{
        this.props.checkIn(this.state.customerNotes)
    }

    closeModal=()=>{
        this.props.closeModal()
    }

    render() {
        return(
            <View style={{...helperFunctions.lightDarkBg()}}>
                <Modal
                    backdropColor={'#000000'}
                    backdropOpacity={0.5}
                    isVisible={this.props.isModalVisible}>

                    <View style={{...helperFunctions.lightDarkBg(), ...helperFunctions.padding(30, 30, 30, 30),position: 'relative',zIndex: -1}}>
                        <View style={{
                            ...helperFunctions.flexRow(),
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text  style={{...helperFunctions.textBlack()}}>Write a notes</Text>
                            <TouchableOpacity onPress={this.closeModal}><Icons color={helperFunctions.yellow()} name="close"
                                                                               size={15}/></TouchableOpacity>
                        </View>
                        <View style={{height: 30}}></View>
                        <Form>
                            <Textarea  style={{...helperFunctions.textBlack()}} onChangeText={(txt) => this.setState({customerNotes: txt})}
                                      name="customerNotes" rowSpan={5} bordered value={this.state.customerNotes}/>
                            <View style={{height: 30}}></View>
                            <View style={{...helperFunctions.flexRow(), justifyContent: 'flex-end'}}>
                                <Button onPress={this.checkIn} rounded
                                        style={{...helperFunctions.buttonHeight()}}><Text>Check In</Text></Button>
                            </View>
                        </Form>
                        {this.state.loading == true &&
                        <View style={{position: 'absolute',top: 0,left: 0,right: 0, bottom: 0,...helperFunctions.lightDarkBg(),zIndex: 1,...helperFunctions.flexColumn(),justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator size="large" color="#424E9C"/>
                        </View>
                        }
                    </View>

                </Modal>
            </View>
        )
    }
}

export default CheckIn

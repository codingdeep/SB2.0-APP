/* eslint-disable */
import React, { Component } from 'react';
import {View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
import { helperFunctions } from '../../_helpers';
import { GetProfileInfo } from '../../Redux/Action/ProfileAction';
import AndDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import CustomSwitch from '../Profile/CustomSwitch/customSwitch';
import LOADER from '../Loader/Loader';
import AppVersion from "../ActionSheet/appVersion";


const { width, height } = Dimensions.get('window');

let setProductName = [];


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            ProfileLoader: false,
            translateY: new Animated.Value(300),
            zIndex: new Animated.Value(-1)
        };

    }


    componentDidMount() {
        this.props.dispatch(
            GetProfileInfo(
                this.props.TechnicianId,
                this.props.locationId,
            ),
        );
    }

    static getDerivedStateFromProps(props, state) {
        const { ProfileLoader } = props.ProfileLoader;
        return {
            ProfileLoader,
        };
    }

    closeProfile = () => {
        this.props.closeProfile()
    }
    logOut = () => {
        this.props.logOut()
    }
    showAppVersion=()=>{
        Animated.parallel([
            Animated.spring(this.state.translateY,{
                toValue: 50,

            }),
            Animated.spring(this.state.zIndex, {
                toValue: 1,
            })
        ]).start()

    }
    hideInfo=()=>{
        Animated.parallel([
            Animated.spring(this.state.translateY,{
                toValue: 300,

            }),
            Animated.spring(this.state.zIndex, {
                toValue: -1,
            })
        ]).start()

    }
    render() {
        const { ProfileData, ProfileLoader } = this.props;
        console.log('sdfksndf',ProfileData)

        return ProfileLoader == false ? (
            <LOADER />
        ) : (<><ScrollView style={{ ...helperFunctions.whiteToDark() }}>
                    <View style={{ width: width, height: height / 2.3, backgroundColor: 'white' }}>
                        <Image style={{ flex: 1, width: null, height: null }} source={{ uri: this.props.image }} />
                        <View style={{
                            width: 80,
                            height: 80,
                            overflow: 'hidden',
                            borderRadius: 40,
                            backgroundColor: 'red',
                            position: 'absolute',
                            bottom: 0,
                            marginBottom: -40,
                            right: 50,
                            borderWidth: 1,
                            borderColor: 'white',
                        }}>
                            <Image style={{ flex: 1, width: null, height: null }} source={{ uri: this.props.image }} />

                        </View>
                        <TouchableOpacity onPress={this.closeProfile} style={{
                            position: 'absolute',
                            top: 50,
                            left: 50,
                        }}>
                            <AndDesign name="close" color="red" size={30} />

                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={this.showAppVersion}>
                        <Animated.View style={{
                            position: 'absolute',
                            top: 50,
                            right: 20,
                        }}>
                            <AndDesign name="infocirlceo" color="blue" size={20} />

                        </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                    {Object.keys(ProfileData).length > 0 &&
                        <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
                            <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.mediumFont(), ...helperFunctions.darkLightColor() }}>{ProfileData.user.fullName}</Text>
                            <View style={{ ...helperFunctions.flexRow(), alignItems: 'center' }}>
                                <Text><EvilIcons size={25} color="#999" name="envelope" /></Text>
                                <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.darkLightColor() }}> {ProfileData.user.emailAddress}</Text>
                            </View>
                            <View style={{ ...helperFunctions.flexRow(), alignItems: 'center' }}>
                                <Text><Feather size={20} color="#999" name="phone" /></Text>
                                <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.darkLightColor() }}>  {ProfileData.user.mobileNumber}</Text>
                            </View>

                            <View>
                                <TouchableOpacity onPress={this.logOut} style={{ width: 100, ...helperFunctions.yellowBg(), justifyContent: 'center', ...helperFunctions.flexRow(), paddingVertical: 5, height: 38, alignItems: 'center', borderRadius: 20, marginLeft: 20, marginTop: 10 }}><Text style={{ color: 'white', ...helperFunctions.textSize() }}>Logout</Text></TouchableOpacity>
                            </View>

                        </View>}


                    <View style={{ paddingHorizontal: 30 }}>
                        <View style={{ borderTopWidth: .5, borderColor: '#ccc', marginVertical: 20 }}></View>
                    </View>

                    <View style={{ paddingHorizontal: 30 }}>
                        <Text style={{ ...helperFunctions.textBlack(), ...helperFunctions.darkLightColor() }}>About me</Text>
                        <Text style={{ color: helperFunctions.darkLightColor(), ...helperFunctions.textSize() }}>{ProfileData.biography}</Text>
                    </View>
                    {Object.keys(ProfileData).length > 0 &&
                        <View style={{
                            ...helperFunctions.assToDarkBg(),
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                            marginTop: 20,
                            marginBottom: 5
                        }}>
                            <View>
                                <Text style={{
                                    ...helperFunctions.mediumFont(), ...helperFunctions.textBlack(),
                                    ...helperFunctions.darkLightColor(),
                                }}>Team: </Text>
                                <Text style={{ ...helperFunctions.textSize(), color: helperFunctions.darkLightColor() }}>{ProfileData.team && ProfileData.team}</Text>
                            </View>
                        </View>
                    }

                    <View style={{ ...helperFunctions.assToDarkBg(), paddingHorizontal: 30, paddingVertical: 10 }}>

                        <View>
                            {Object.keys(ProfileData).length > 0 && ProfileData.hours.map((hours, i) => (
                                <View key={i} style={{ ...helperFunctions.flexRow(), justifyContent: 'space-between' }}>
                                    <Text style={{ ...helperFunctions.textSize(), color: helperFunctions.darkLightColor(), marginVertical: 3 }}>{hours.dayOfWeek + ':'}</Text>
                                    <Text style={{ ...helperFunctions.smallFont(), color: helperFunctions.darkLightColor() }}>{!hours.active ? 'OFF' : hours.from + '-' + hours.to}</Text>
                                </View>
                            ))


                            }
                        </View>

                    </View>

                    <View style={{ ...helperFunctions.assToDarkBg(), paddingHorizontal: 30, paddingVertical: 10, marginTop: 5 }}>
                        <View>
                            <Text style={{
                                ...helperFunctions.mediumFont(), ...helperFunctions.textBlack(),
                                ...helperFunctions.darkLightColor(),
                            }}>Specialities: </Text>

                        </View>
                        <View>
                            {Object.keys(ProfileData).length > 0 && ProfileData.specialties.map((specialty, index) => (
                                <View key={index} style={{ ...helperFunctions.flexRow(), justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ ...helperFunctions.smallFont(), color: helperFunctions.darkLightColor(), ...helperFunctions.flexRow(), alignItems: 'center' }}><AndDesign size={25} name="minus" /><Text>{specialty}</Text></Text>
                                </View>
                            ))


                            }
                        </View>

                    </View>
                    {Object.keys(ProfileData).length > 0 &&
                        <View style={{
                            ...helperFunctions.assToDarkBg(),
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                            marginTop: 5,
                            marginBottom: 5
                        }}>
                            <View>
                                <CustomSwitch titleName={'Emails'} />
                            </View>
                            <View>
                                <CustomSwitch titleName={'SMS'} />
                            </View>
                            <View>
                                <CustomSwitch titleName={'Clock-In Reminder'} isClockIn={ProfileData.clockReminderEnabled} />
                            </View>
                        </View>
                    }
                </ScrollView>
            <AppVersion hideInfo={this.hideInfo}  translateY={this.state.translateY} zIndex={this.state.zIndex}/>
        </> );
    }

    componentWillUnmount() {
        this.setState(
            {
                ProfileLoader: false,
            },
        );
    }

    formatMobileNumber = (number) => {
        let firstThree = number.toString().substring(0, 3);
        let middleThree = number.toString().substring(3, 6);
        let remainderNumber = number.toString().substring(6, number.toString().length);
        return firstThree + '-' + middleThree + '-' + remainderNumber
    }
}

const mapStateProps = state => {
    const loader = state.LoggedData.loader;
    const ProfileData = state.ProfileReducer.ProfileData;
    // const technicianResponsibilities = state.ProfileReducer.technicianResponsibilities[0];
    const ProfileLoader = state.ProfileReducer.ProfileLoader;
    return {
        ProfileData,
        ProfileLoader,

    };
};

export default connect(mapStateProps)(Profile);

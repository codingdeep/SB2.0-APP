/* eslint-disable */
import React, {useState} from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Body,Left,Container, Header, Content, Form, Item, Input, Label,Title,Button,Icon,Right,Picker } from 'native-base';
import {TextInputMask} from 'react-native-masked-text'
import MaskedInput from "../MaskedText/maskedInput";
import {helperFunctions} from "../../_helpers";
import AsyncStorage from "@react-native-community/async-storage";
import {createNewClient} from "../../Redux/SagaActions/clients_saga_action";
const form_data = [
    {label:'First Name',name:'first_name'},
    {label:'Last Name',name:'last_name'},
    {label:'Email',name:'email'},
    {label:'Password',name:'password'},
    {label:'Mobile',name:'mobile'},
    {label:'Next Birthday',name:'birthday'},
    {label:'Referral Code',name:'referral_code'},
]
const CreateClient = (props) => {
    const [selected,setSelected] = useState('Female')
    const [client,setClient] = useState({
        first_name: '',
        last_name: '',
        email:'',
        password:'',
        mobile: '',
        birthday: '',
        referral_code:'SH2O'

    })
    const onValueChange=(item)=>setSelected(item)
    const _changeText=(text,name)=>{
        setClient({...client,[name]:text})
    }

    const submitForm=async ()=>{

        let userInfo = JSON.parse(await AsyncStorage.getItem('User@Data'));

        const newUser = {
            business:{
                id:userInfo.allLogInData.business.id
            },
            names: {
                first: client.first_name,
                last: client.last_name,
                nick: client.first_name
            },
            emailAddress:client.email,
            mobileNumber:client.mobile.replace(' ', '').replace('+1', '').replace(')', '').replace('(', '').replace(' ', '').replace('-', ''),
            password:client.password,
            birthDate:"1900-"+client.birthday,
            gender:selected,
            referredByUser:{
                referralToken:client.referral_code
            }
        }

        await createNewClient(newUser).then(response=>{
            alert(JSON.stringify(response))
        }).catch(error=>{
            console.log(error)
        })
    }

  return (
      <Container>
          <Header>
              <Left>
                  <Button transparent onPress={props.hideModal}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
              <Body>
                  <Title>Add New Clients</Title>
              </Body>
              <Right>

              </Right>
          </Header>
          <Content style={{paddingHorizontal: 10}}>
              <Form>

                  {form_data.map((item,key)=>{
                      return item.name=='mobile' ?
                          (<MaskedInput
                                  placeholder="Mobile *"
                                  mask='+1 (999) 999-9999'
                                  value={client.mobile}
                                  changeHandler={(text)=>_changeText(text,item.name)}
                              />)
                          : item.name == 'birthday' ? (
                              <MaskedInput
                                  placeholder="Next Birthday (MM-DD)*"
                                  mask='99-99'
                                  value={client.birthday}
                                  changeHandler={(text)=>_changeText(text,item.name)}
                              />
                          ) : (<Item regular last style={{marginTop:10}}>
                          <Input placeholder={item.label} disabled={item.name == 'referral_code'} value={client[item.name]} secureTextEntry={item.name == 'password'} onChangeText={(text)=>_changeText(text,item.name)} name={item.name} />
                      </Item>)
                  })}

                  <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={selected}
                      onValueChange={onValueChange}
                      >

                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Non Binary" value="Non Binary" />
              </Picker>

                  <Button onPress={()=>submitForm()} full style={{...helperFunctions.themeBg(),marginTop: 10}}>
                      <Text style={{color:'#fff'}}>Create</Text>
                  </Button>
              </Form>
          </Content>
      </Container>
  );
}

export default CreateClient;

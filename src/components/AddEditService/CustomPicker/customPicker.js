import React, {useState} from 'react';
import {Picker, Image} from 'react-native';
// import styles from '../styles';
import {View, Grid, Row, Col, Text} from 'native-base';

const CustomPicker = props => {
  const [selected, setSelected] = useState('key0');

  return (
    <View style={{backgroundColor: '#f1f0f5', flex: 1, borderRadius: 8}}>
      {props.status == false ? (
        <Picker
          mode="dropdown"
          style={{
            width: undefined,
          }}
          selectedValue={selected}
          onValueChange={e => setSelected(e)}>
          {props.data.map((e, i) => (
            <Picker.Item
              key={i}
              style={{
                color: '#0e1317',
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}
              label={e}
              value={'key' + i}
            />
          ))}
        </Picker>
      ) : (
        <Grid>
          <Row>
            <Col style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: '#0e1317',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  paddingLeft: 9,
                }}>
                {props.name}
              </Text>
            </Col>
            <Col style={{alignSelf: 'center', alignItems: 'flex-end'}}>
              <Image
                resizeMode="contain"
                style={{height: '50%'}}
                source={require('../../../Assets/addService/7-layersmid.png')}
              />
            </Col>
          </Row>
        </Grid>
      )}
    </View>
  );
};

export default CustomPicker;

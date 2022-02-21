import React from 'react';
import {Image, TouchableOpacity, Text, View, StatusBar} from 'react-native';
import {Col, Row, Container, Grid} from 'native-base';
import Icons from 'react-native-vector-icons/AntDesign';
import styles from '../styles';

const CustomHeader = () => {
  return (
    <View style={{flex: 1, paddingTop: 20, paddingLeft: 35, paddingRight: 35}}>
      <Grid>
        <Row>
          <Col>
            <TouchableOpacity>
              <Icons name={'arrowleft'} style={styles.ICON_LEFT} />
            </TouchableOpacity>
          </Col>
          <Col style={{width: '75%', alignItems: 'center'}}>
            <Text style={styles.CustomHeader_Text}>Timesheet</Text>
          </Col>
          <Col>
            <Icons name={'plus'} style={styles.ICON_RIGHT} />
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

export default CustomHeader;

import React from 'react';
import styles from '../styles';
import { Col, Button } from 'native-base';
import { useTheme } from '../../../Theme/hooks'
const { colors } = useTheme()
import Icons from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

const colicon = props => {
  return (
    <Col
      style={{
        // borderBottomWidth: 2,
        // backgroundColor: "red",
        borderBottomColor: props.status == 'active' ? '#f1f0f5' : '#fff',
      }}>
      {props.icoBool == true ? (

        <Icons
          name={props.name}
          style={{
            textAlign: 'right',
            color: colors.iconColor,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        />

      ) : null}
    </Col>
  );
};

export default colicon;

import React from 'react';
import styles from '../styles';
import { Col } from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign';

const Icon_Provider = props => {
  return (
    <Col style={{ alignSelf: 'center' }}>
      <Icon
        name={props.name}
        size={17}
        style={{ textAlign: props.name, color: '#424e9c' }}
      />
    </Col>
  );
};

export default Icon_Provider;

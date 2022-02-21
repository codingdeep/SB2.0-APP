import React from 'react';
import styles from '../styles';
import { Col, Row, Text } from 'native-base';
import { Appearance } from 'react-native-appearance';
import { useTheme } from '../../../Theme/hooks'

const custom_Row_Header = props => {
  return (
    <Col
      style={{



        borderBottomColor: props.status == 'active' ?
          (Appearance.getColorScheme() === 'dark' ? '#484848' : '#f1f0f5') : (Appearance.getColorScheme() === 'dark' ? '#383838' : '#fff'),

        borderBottomWidth: 2,
        // width: "45%"
      }}>

      <Row style={{ justifyContent: 'center' }}>
        <Text style={styles.block_text_header}>{props.name}</Text>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Text style={styles.block_text_content}>${props.amount.toFixed(2)}</Text>
      </Row>
    </Col>
  );
};

export default custom_Row_Header;

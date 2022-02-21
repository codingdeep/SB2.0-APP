import React from 'react';
import styles from './styles';
import { Col } from 'native-base';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';


const CusIconDesign = props => {

    return (
        <Col style={{ alignSelf: 'center', width: 25, height: 25 }}>
            {props.IconFrom == "AntDesign" && (
                <IconAntDesign
                    name={props.name}
                    size={props.size}
                    style={{ textAlign: props.textAlign, color: props.color }}
                />
            )}
            {props.IconFrom == "SimpleLineIcons" && (
                <IconSimpleLineIcons
                    name={props.name}
                    size={props.size}
                    style={{ textAlign: props.textAlign, color: props.color }}
                />
            )}
            {props.IconFrom == "EvilIcons" && (
                <IconEvilIcons
                    name={props.name}
                    size={props.size}
                    style={{ textAlign: props.textAlign, color: props.color }}
                />
            )}
            {props.IconFrom == "Feather" && (
                <IconFeather
                    name={props.name}
                    size={props.size}
                    style={{ textAlign: props.textAlign, color: props.color }}
                />
            )}
            {props.IconFrom == "Entypo" && (
                <IconEntypo
                    name={props.name}
                    size={props.size}
                    style={{ textAlign: props.textAlign, color: props.color }}
                />
            )}

        </Col>
    );
};

export default CusIconDesign;
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Dimensions, View} from 'react-native';
import styles from './styles';

let deviceWidth = Dimensions.get('window');

const responsiveImage = props => {
  const [orientation, setOrientation] = useState(props.setMode);
  const [height, setHeight] = useState(0);
  const IMGLINK = Dimensions.addEventListener('change', e => {
    ///useSelector(state => state.LoggedData.imageUrl);
    if (deviceWidth.height == e.window.height) {
      setOrientation('pro');
    } else if (deviceWidth.height > e.window.height) {
      setOrientation('land');
    }
  });
  return props.link == 'undefined' ? (
    <View style={{flex: 1}}>
      <Image
        resizeMode={'cover'}
        style={{height: 59, width: 59}}
        source={require('../../../Assets/avatar.png')}
      />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <Image
        // resizeMode={'contain'}
        style={orientation == 'pro' ? styles.res_prot : styles.res_land}
        source={{
          uri: props.link,
        }}></Image>
    </View>
  );
};

export default responsiveImage;

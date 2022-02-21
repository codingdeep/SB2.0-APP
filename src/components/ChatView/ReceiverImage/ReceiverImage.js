import React, { useState } from 'react';
import { View, Text, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Grid, Row, Col, Left, Right, Label } from 'native-base';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const screenHeight = Math.round(Dimensions.get('window').height);
const ReciverMessage = props => {
  // console.log(props.message.fileUrls[0]);
  const [isFullView, setFullView] = useState(false)
  const images = [{
    // Simplest usage.
    url: props.message.fileUrls[0],
    props: {
      // headers: ...
    }
  }]

  return (
    <View style={{ flex: 0.7 }}>
      <Grid>
        <Col>
          <Row style={{ alignSelf: 'flex-start' }}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: '#424E9C',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: props.message.createUser.imageUrl }}
                style={{ width: 35, height: 35 }} />

            </View>
          </Row>
          <Row></Row>
        </Col>
        <Col style={{ width: '88%' }}>
          <TouchableOpacity
            onPress={() => { setFullView(true) }}
            style={{
              height: '100%',
              width: '100%',
              // backgroundColor: '#424E9C',
              padding: 10,
              borderRadius: 10,
            }}

          >
            {/* <ImageZoom cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={200}
              imageHeight={200}> */}
            <Image
              source={{ uri: props.message.fileUrls[0] }}
              resizeMode="stretch"
              style={{ width: '100%', height: screenHeight / 2.2, borderRadius: 10 }}
            />
            {/* </ImageZoom> */}
            <Modal visible={isFullView} transparent={true}>
              <ImageViewer
                imageUrls={images}
                enableImageZoom={true}
                renderHeader={() => null}
                onClick={() => setFullView(false)}
              />
            </Modal>
          </TouchableOpacity>
          {/* <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#F1F0F5',
            padding: 20,
            borderRadius: 10,
          }}>
          <Image
            source={{ uri: props.message.fileUrls[0] }}
            resizeMode="contain"
            style={{ width: '100%', height: 300 }}
          />
        </View> */}
        </Col>
      </Grid>
    </View>

  );
};

export default ReciverMessage;

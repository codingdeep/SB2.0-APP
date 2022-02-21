import React, { useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Grid, Row, Col, Left, Right, Label } from 'native-base';

import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const SenderImage = props => {

  console.log("ReciverMessageSender", props.message.createUser.imageUrl);


  const [isFullView, setFullView] = useState(false)
  const images = [{
    // Simplest usage.
    url: props.message.fileUrls[0],
    props: {
      // headers: ...
    }
  }]
  return (
    <View style={{ flex: 1 }}>
      <Grid>
        <Row>
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
                style={{ width: '100%', height: 200, borderRadius: 10 }}
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
          </Col>

          <Col>
            <Row style={{ alignSelf: 'flex-end' }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: '#424E9C',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: props.message.createUser.imageUrl }}
                  style={{ width: 35, height: 35 }}
                />
              </View>
            </Row>
            <Row></Row>
          </Col>
        </Row>
      </Grid>
    </View>













  );
};

export default SenderImage;

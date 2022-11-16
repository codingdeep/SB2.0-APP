import React, { Component, useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { GetSearchClient } from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import Modal from 'react-native-modal';
import CreateClient from './createClient';
import { Fab } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
const search = (props) => {
  const [SearchText, setSearchText] = useState();
  const [visibility, setVisibility] = useState(false);
  const setSearchValue = (text) => {
    setSearchText(text);
  };
  const getClientFromSerch = () => {
    if (SearchText != null) {
      let clientInfo = GetSearchClient(props.businessId, SearchText).then(
        (res) => {
          props.getSearchClients(res);
        },
      );
    }
  };

  return (
    <>
      <View style={{ ...styles.mainContainer }}>
        {/* -------------search box--------------- */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.backImg}>
            <TextInput
              style={{
                flex: 4,
                paddingLeft: 10,
                color: '#000',
                paddingVertical: 15,
                height: 50,
                zIndex: 1
              }}
              value={SearchText}
              onChangeText={(val) => setSearchValue(val)}
            />
            <Fab
              direction=""
              containerStyle={{}}
              style={{ backgroundColor: '#5067FF', zIndex: 1, top: -40 }}

              onPress={() => setVisibility(true)}>
              <AntDesign name={"plus"}></AntDesign>
            </Fab>
            <View style={styles.secondRow}>
              <TouchableOpacity style={{ zIndex: 1 }} onPress={() => getClientFromSerch()}>
                <AntDesign name="search1" size={20} />
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </View>


      <Modal style={{ margin: 0 }} isVisible={visibility}>
        <CreateClient hideModal={() => setVisibility(false)} />
      </Modal>


    </>
  );
};
export default search;

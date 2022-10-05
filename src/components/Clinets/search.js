import React, {Component, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {GetSearchClient} from '../../Redux/SagaActions/AppoinmentsSagaAction.js';
import Modal from 'react-native-modal';
import {helperFunctions} from '../../_helpers';
import CreateClient from './createClient';
;
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
      <View style={{...styles.mainContainer}}>
        {/* -------------search box--------------- */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.backImg}>
            <TextInput
              style={{
                flex: 4,
                paddingLeft: 10,
                color: '#000',
                paddingVertical: 15,
              }}
              value={SearchText}
              onChangeText={(val) => setSearchValue(val)}
            />
            <View style={styles.secondRow}>
              <TouchableOpacity onPress={() => getClientFromSerch()}>
                <Image
                  style={styles.searchIcon}
                  source={require('../../Assets/clients/search.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginLeft: 15}}>
            <TouchableOpacity onPress={() => setVisibility(true)}>
              <Text style={{...helperFunctions.themeColor()}}>Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <Modal style={{margin: 0}} isVisible={visibility}>
        <CreateClient hideModal={() => setVisibility(false)} />
      </Modal>
    </>
  );
};
export default search;

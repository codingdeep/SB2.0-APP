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
import CusIconDesign from '../../Assets/Icon/IconAntDesign';
import {helperFunctions} from '../../_helpers';
const search = props => {
  const [SearchText, setSearchText] = useState();
  const setSearchValue = text => {
    setSearchText(text);
  };
  const getClientFromSerch = () => {
    if (SearchText != null) {
      let clientInfo = GetSearchClient(props.businessId, SearchText).then(
        res => {
          props.getSearchClients(res);
        },
      );
    }
  };

  return (
    <View style={{...styles.mainContainer}}>
      {/* -------------search box--------------- */}
      <View style={styles.backImg}>
        <View style={styles.firstRow}>
          <View style={styles.yellowCard}>
            {/* <CusIconDesign
              IconFrom="AntDesign"
              name="search1"
              textAlign="center"
              color='#0E1317'
              size={24}
            /> */}
            <Image
              style={styles.searchIcon}
              source={require('../../Assets/clients/search.png')}
            />
          </View>
        </View>
        <TextInput
          style={{flex: 3, paddingLeft: 10, color: '#000'}}
          value={SearchText}
          onChangeText={val => setSearchValue(val)}
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
    </View>
  );
};

export default search;

// export default class search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchVal: '',
//     };
//   }
//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         {/* -------------search box--------------- */}
//         <ImageBackground
//           source={require('../../Assets/clients/searchBackground.png')}
//           style={styles.backImg}>
//           <View style={styles.firstRow}>
//             <ImageBackground
//               source={require('../../Assets/clients/yellow.png')}
//               style={styles.yellowCard}>
//               <Image
//                 style={styles.searchIcon}
//                 source={require('../../Assets/clients/search.png')}
//               />
//             </ImageBackground>
//             <TextInput
//               style={{ height: 49, width: '80%' }}
//               value={this.state.searchVal}
//               onChangeText={val => this.setState({ searchVal: val })}
//             />
//           </View>
//           <View style={styles.secondRow}>
//             <Image
//               style={styles.searchIcon}
//               source={require('../../Assets/clients/search.png')}
//             />
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }

/* eslint-disable */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import TabItem from './TabItem';
import { Row, Grid } from 'native-base';
import CusFooter from '../Footer/footer';
import styles from './styles';
import { useColorScheme, Appearance } from 'react-native-appearance'
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()

class TaBBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            actives: 0,
            keys:'',
        }
    }
    handleTab = (route, index) =>{
        //alert(JSON.stringify(route))
        this.setState({
            actives: index
        })

        if(route.key == 'Clients') {
            if(route.index && route.index != 0){
                this.props.navigation.navigate('Clients');
                //this.props.navigation.goBack();
            }else {
                this.props.navigation.navigate('Clients');
            }
        }else {
            this.props.navigation.navigate(route.routeName);
        }


    }

    render() {
    const { navigation } = this.props;

    const { routes, index } = navigation.state;

    return (
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <View style={styles.shadow}>
            <Grid>
            <Row>
              {routes.map((route, i) => (
                <TabItem
                  navigation={navigation}
                  key={route.routeName}
                  {...route}
                  onPress={()=>this.handleTab(route, i)}
                  actives={this.state.actives}
                  ind={i}
                />
              ))}
            </Row>

          </Grid>
        </View>
      </View>
    );
  }
}

export default TaBBar;

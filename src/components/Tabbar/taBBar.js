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
            actives: 0
        }
    }
    handleTab = (route, index) =>{
        this.props.navigation.navigate(route.routeName);
        this.setState({
            actives: index
        })
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

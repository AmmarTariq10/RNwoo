import React, { Component } from 'react';
import { AppRegistry,  StatusBar} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Details from './Details'
StatusBar.setBarStyle('light-content');
import Product from './Product';
console.disableYellowBox = true;
class example extends Component {
    render() {
        return (
            <Root />
        );
    }
}
const Root = createStackNavigator({
    Product:{
        screen:Product
    },
    Details:{
        screen:Details
    }
})


AppRegistry.registerComponent('example', () => example);

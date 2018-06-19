import React, { Component } from 'react';
import { AppRegistry,  StatusBar} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import Details from './Details'
import Product from './Product';
import Cart from './Cart.js'
import Checkout from './Checkout'


console.disableYellowBox = true;
StatusBar.setBarStyle('light-content');


class example extends Component {
    render() {
        return (
            <Root />
        );
    }
}

const Root = createStackNavigator({
    Checkout:{
        screen:Checkout
    },
    Product:{
        screen:Product
    },
    Details:{
        screen:Details
    },
    Cart:{
        screen:Cart
    }
})


AppRegistry.registerComponent('example', () => example);

import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
} from 'react-native'
export default class Checkout extends Component{
    static navigationOptions = {
        title:'Checkout',
      };
    render(){
        return(
            <View>
                <Text>
                    Checkout
                </Text>
            </View>
        )
    }
}
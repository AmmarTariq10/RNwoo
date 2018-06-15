import React, {Component} from "react";
import {Text, View, Image,Button} from "react-native";
import css from "./styles/product";

export default class ProductItem extends Component {
	render() {
		return (
            <View style={[css.cards]}>
                <Image source={{uri: this.props.product.images[0].src}} style={css.productItem}></Image>
                <Text style={css.productName}>{this.props.product.name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={[css.discountPrice, {paddingBottom: 12}]}>${this.props.product.price}</Text>
                </View>
            </View>
		);
	}
}

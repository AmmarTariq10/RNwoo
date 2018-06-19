import React, { Component } from "react";
import {
	ScrollView,
	View,
	Text,
	AsyncStorage,
	Button
} from "react-native";
import Api from "./WooCommerce/Api";
import Card from './card'

export default class Product extends Component {

	constructor(props) {
		super(props);
		this.data = [];
		this.state = {
			page: 1,
			limit: 6,
			isOnline: true,
			isLoading: false,
			finish: false,
			data:[],
			cart:[]
		}
	}

	static navigationOptions = {
		title:'Shop',
	  };
	  
	  nav=()=>{
		  console.log(this.props.navigation)
		  this.props.navigation.navigate('Cart')
	  }

	componentDidMount(){
		this.fetchData()
	}

	fetchData() {
		Api.get('products', {
			per_page: this.state.limit,
			page: this.state.page
		}).then(
			data=>{	
				AsyncStorage.getItem('cart')
				.then(
					data=>{
						this.setState(
							prev=>{
								return{
									...prev,
									cart:JSON.parse(data)
								}
							}
						)
					}
				)
			this.setState(
						prevState=>{
							return{
								...prevState,
								data:data,
								isLoading:true
							}
						}
			)
	
			}
		);
		console.log(this.state.data)
	}

	updateCart = (data)=>{
		this.setState(
			prev=>{
				return{
					...prev,
					cart:[...prev.cart,data]
				}
			}
		)
		console.log(this.state.cart)
	}

	nav = () => {
		this.props.navigation.navigate('Cart')
	}

    mapFunction(items){
		return items.map(item=> (
			<Card key={item.id} method={()=>{this.handler(item)}}  product={item} /> 
		));
	}

	handler = (param)=>{
		this.props.navigation.navigate('Details',{data:param,updateFunc:this.updateCart})
	}

	render() {
		if(!this.state.isLoading){
			return(
				<View>
					<Text> Loading </Text>
				</View>
			)
		}
		else{
		return (
			<ScrollView>
				{this.mapFunction(this.state.data)}
				<Button
					style={{alignSelf:'stretch'}}
					title="View Cart"
					onPress={this.nav} />		
			</ScrollView>
		);
		}
	
	}
}

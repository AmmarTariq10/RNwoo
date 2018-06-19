import React,{ Component } from 'react'
import {
    ScrollView,
    Text,
    View,
    AsyncStorage,
    Button 
} from 'react-native'
import Card from './card'
export default class Cart extends Component{
    static navigationOptions = {
        title:'Cart',
      };
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            cartEmpty:false,
            data:[]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('cart')
        .then(
            data=>{
                console.log(data)
                if(data === null){
                    this.setState(
                        prev=>{
                            return{
                                ...prev,
                                isLoading:false,
                                cartEmpty:true
                            }
                        }
                    )
                }else{
                    let arr = JSON.parse(data)
                    this.setState(
                        prev=>{
                            return{
                                ...prev,
                                isLoading:false,
                                cartEmpty:false,
                                data:arr
                            }
                        }
                    )
                }
            }
        )
    }

    handler = (param)=>{
		this.props.navigation.navigate('Details',{data:param,updateFunc:this.updateCart,type:'update'})
	}

    render(){
        if(this.state.isLoading === true && this.state.cartEmpty === false){
           return(
            <View style={{flex:1}}><Text>Loading Cart...</Text></View>
        ) 
        }else if(this.state.isLoading === false && this.state.cartEmpty === true){
            return(
                <View style={{flex:1}}><Text>Cart Empty</Text></View>
            )
        }
        else{
          return(
            <ScrollView>
                {this.mapFunction(this.state.data)}
                <View style={{flex:1}}>
                    <Text>{"Grand Total : $"+this.getTotal()}</Text>
                </View>
                <Button 
                    style={{alignSelf:'stretch'}}
                    title="Checkout"
                    onPress={this.removeAll} />
                <Button 
                    style={{alignSelf:'stretch'}}
                    title="Empty Cart"
                    color='red'
                    onPress={this.removeAll} />
                
            </ScrollView>
          )
        }  
    }
    removeAll = () =>{
        AsyncStorage.removeItem('cart')
        this.setState(prev=>{
            return{
                isLoading:false,
                cartEmpty:true,
                data:[]
            }
        })
    }
    remove = (item) => {
        this.setState(
            prev=>{
                return{
                    ...prev,
                    isLoading:true
                }
            }
        )
       let itemToDelete = this.state.data.findIndex(d => d.id === item.id )
       this.state.data.splice(itemToDelete,1)
       console.log(this.state.data)
       if(this.state.data.length === 0){
           this.setState(
               p=>{
                   return{
                       ...p,
                       cartEmpty:true
                   }

               }
           )
           AsyncStorage.removeItem('cart')
       }else{
           AsyncStorage.setItem('cart',JSON.stringify(this.state.data))
       }
       this.setState(
        prev=>{
            return{
                ...prev,
                isLoading:false
            }
        }
    )
    }

    getTotal = () => {
        let num = this.state.data.length
        let total = 0;
        for(var i = 0; i<num;i++){
           let q = this.state.data[i].quantity
           let p = this.state.data[i].price
           let s = p*q
           total = total + s
        }
        return total
    }

    mapFunction(items){
		return items.map(item=> (
			<Card type='cart' remove={()=>{this.remove(item)}} key={item.id} method={()=>{this.handler(item)}}  product={item} /> 
		));
	}
}
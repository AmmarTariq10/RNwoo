import React,{ Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TextInput
} from 'react-native'
import css from './styles/product'
export default class Card extends Component{
    constructor(props){
        super(props)
        this.state={
            price:parseInt(this.props.product.price),
            quantity:parseInt(this.props.product.quantity),
        }
    }
    render(){
        if(this.props.type === 'cart'){
            return(
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{uri:this.props.product.images[0].src}}/>
                    </View>
                    <View style={styles.desc}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{this.props.product.name}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{"Price: "+"$"+this.props.product.price}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{"Qty : "+this.props.product.quantity}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{"Total: "+"$"+this.props.product.price*this.state.quantity}</Text>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.priceContainer}>
                            <Button 
                            title="update"
                            onPress={this.props.method}
                            />
                        </View>
                        <View style={styles.priceContainer}>
                            <Button 
                            title="Remove"
                            color="red"
                            onPress={this.props.remove}
                            />
                        </View>
                    </View>
    
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{uri:this.props.product.images[0].src}}/>
                    </View>
                    <View style={styles.desc}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{this.props.product.name}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>{"Price : "+"$"+this.props.product.price}</Text>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button 
                        title="Details"
                        onPress={this.props.method}
                        />
                    </View>
    
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        flex:1,
        flexDirection:'row',
        backgroundColor:"#eee",
        borderWidth:'grey',
        borderWidth:1
    },
    imgContainer:{
      flex:1
    },
    img:{
        height:100,
        width:100
    },
    desc:{
        flex:1,       
        marginLeft:15,
    },
    nameContainer:{
        flex:1,
       paddingTop:20
    },
    name:{
        fontSize: 17,
        color:'black'
    },
    priceContainer:{
        flex:1
    },
    price:{
        
    },
    btnContainer:{
        paddingTop:30,
        flex:1
    },

})
import React,{Component} from 'react'
import {
    View,
    Image,
    ScrollView,
    Text,
    Button,
    TextInput,
    AsyncStorage
} from 'react-native'
import styles from './styles'
export default class Details extends Component{
    static navigationOptions = {
        title:'Product Details',
      };

    constructor(props){
        super(props)
        this.state={
            data:this.props.navigation.getParam('data','def'),
            loading:false,
        }
    }

    componentDidMount(){
        console.log(this.state.data)
    }

    render(){
        if(!this.state.loading){
            return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{uri:this.state.data.images[0].src}}/>
                    </View>
                </View>
                <View style={styles.header}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>
                            {this.state.data.name}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                            {'Price : ' + "$ " + this.state.data.price}
                        </Text>
                    </View>
                    <View style={styles.qtyContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Number of pieces</Text></View>
                        <View style={styles.qtyInputContainer}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={styles.qtyInput}
                                keyboardType='numeric'
                                placeholder='Write Number of units'
                                onChangeText={
                                    (text) => {this.setState(prev=>{
                                        return{
                                        ...prev,
                                        txt:text,
                                        data:{
                                            ...prev.data,
                                            quantity:parseInt(text)
                                         }
                                }})
                                }}  
                                />
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                            {this.state.data.description}
                    </Text>
                </View>
                <Button 
                    onPress={this.update}
                    style={styles.btn}
                    title="Add To Cart"  />
            </ScrollView>
        )}else{
            return(
                <View>
                <Text>Adding product to cart</Text>
                </View>
            )
        }
    }
    update = () =>{

            if(this.state.txt===undefined){
                alert('Quantity is required')
                return
            }
            let isnum = /^[0-9]+$/.test(this.state.txt);
            if(!isnum){
                alert('Quantity should be a positive number')
                return
            }
            if(parseInt(this.state.txt)===0){
                alert('Quantity should be greater thn 0')
                return
            }

            this.setState(
                prev=>{
                    return{
                        ...prev,
                        loading:true
                    }
                }
            )
            AsyncStorage.getItem('cart')
            .then(
                data=>{    
                    if(data===null){
                        let arr = [this.state.data]
                        AsyncStorage.setItem('cart',JSON.stringify(arr))
                        this.setState(
                            prev=>{
                                return{
                                    ...prev,
                                    loading:false
                                }
                            }
                        )
                    this.props.navigation.navigate('Product')
                    }else{
                        let arr=JSON.parse(data) 
                           let i = arr.findIndex( item  =>  item.id === this.state.data.id )
                           console.log(i)
                           console.log(arr[i])
                            if(i>-1){
                             arr[i] = this.state.data
                            }else{
                             arr.push(this.state.data)
                            }
                        console.log(this.state.data)  
                        console.log(this.state.data.id)
                        AsyncStorage.setItem('cart',JSON.stringify(arr))
                        this.setState(
                            prev=>{
                                return{
                                    ...prev,
                                    loading:false
                                }
                            }
                        )
                    this.props.navigation.navigate('Product')
                    }  
                }
            ).catch(
                e=>{
                    console.log(e)
                }
            )
        }

    }

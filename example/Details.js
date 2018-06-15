import React,{Component} from 'react'
import {
    View,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TextInput,
    AsyncStorage
} from 'react-native'
export default class Details extends Component{
    static navigationOptions = {
        title:'Product Details',
      };
    constructor(props){
        super(props)
        this.state={
            data:this.props.navigation.getParam('data','def'),
        }
    }
    componentDidMount(){
        console.log(this.state.data)
    }
    render(){
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
                                placeholder='1'
                                onChangeText={(text) => this.setState(prev=>{
                                    return{
                                         ...prev,
                                            data:{
                                             ...prev.data,
                                             quantity:text
                                         }
                                }})}  
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
        )
    }

    update = () =>{
            console.log(" ITEM SAVED IN STORAGE \n"+this.state.data)
            AsyncStorage.getItem('cart')
            .then(
                data=>{
                    let arr = JSON.parse(data)
                    arr.push(this.state.data)
                    AsyncStorage.setItem('cart',JSON.stringify(arr))
                }
            )
        }

    }

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imgContainer:{
        padding:10
    },
    img:{
        width:'100%',
        height:400
    },
    header:{
        backgroundColor:'#eee',
        alignSelf:'stretch'
    },
    nameContainer:{
        paddingTop:15,
        paddingLeft:15
    },
    name:{
        fontSize:20,
        color:'black'
    },
    priceContainer:{
        paddingLeft:15,
        
    },
    price:{
        fontSize:12
    },
    descriptionContainer:{
        padding:15
    },
    description:{
        fontSize:15,
        lineHeight:20
    },
    btn:{
        alignSelf: 'stretch',
    },
    qtyContainer:{
        flex:1,
        flexDirection:'row'
    },
    labelContainer:{
        flex:1,
   

    },
    qtyInputContainer:{
        flex:1
    },
    qtyInput:{
        color:'black',
        backgroundColor:'white'
    },
    label:{
        fontSize:15
    }
})
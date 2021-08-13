import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
};
const RenderSpot = ({spot})=>{
    if(!isEmpty(spot))
        return <Text style={styles.spotAllign}>    Spot: {spot.pickup_spot.pickup_spot} </Text>
    else
        return <Text style={styles.spotAllign}>    Spot: N/A</Text>
}
const renderChildren = ({item}) =>{
    return(
        <View>
            <Text style ={styles.textStyle}>Student: {item.first_name} {item.last_name}</Text>
            <Text style ={styles.textStyle}>Grade:{item.grade}</Text>
        </View>
    );
}
const Item = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.Touch}
            onPress = {()=>{
                navigation.navigate('StudentPickup',{item}); // Reference in HomeStackNavigator in StackNavigator.js
            }} >
            <View style = {styles.viewStyle}>
                <Text style={styles.parentsText}>Parents: {item.first_name} {item.last_name}   </Text>
                <Text style={styles.distancetext}>Distance: {item.distance.toFixed(2)} meter</Text>
            </View>
            <View style = {styles.v}>
                <View style = {styles.viewStyle}>
                    <FlatList
                    data = {item.children}
                    keyExtractor = {item => ''+item.id} 
                    renderItem = {renderChildren}
                    />
                    <RenderSpot  spot= {item.spot}/>
                </View>
            </View>
            
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Touch:{
        
        //flexDirection: 'row',
        borderWidth:2,
        borderColor: 'rgba(255,255,255,5)',
        backgroundColor: "#fa5b3d",
    },
    parentsText:{
        marginTop:10,
        fontSize: 20,
        fontWeight: 'bold',
        color:'#ffffff',
    },
    distancetext:{
        marginTop:10,
        fontSize: 20,
        fontStyle:"italic",
        color:'#00ffff',
        alignItems:'flex-end'
       
    },
    spotText:{
        fontSize: 14,
        fontStyle:"italic",
        color:'#51f',
    },
    spotAllign:{
        fontSize: 20,
        fontWeight: "bold",
        color:"#fff",
        alignSelf: 'flex-end'
    },
    textStyle:{
        fontSize:20,
        color:"#000"
    },
    viewStyle:{
        width: '50%',
        flexDirection:'row'
    }
});



export default Item;


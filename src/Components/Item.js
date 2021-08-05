import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
};
const RenderSpot = ({spot})=>{
    if(!isEmpty(spot))
        return <Text style={styles.spotText}>Spot: {spot.pickup_spot.pickup_spot} </Text>
    else
        return <Text style={styles.spotText}>Spot: N/A</Text>
}
const renderChildren = ({item}) =>{
    return(
        <View>
            <Text>Student: {item.first_name} {item.last_name}</Text>
            <Text>Grade:{item.grade}</Text>
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
            <Text style={styles.parentsText}>Parents: {item.first_name} {item.last_name}</Text>
            <Text style={styles.distancetext}>Distance: {item.distance}</Text>
            <RenderSpot spot= {item.spot}/>
            <FlatList
                data = {item.children}
                keyExtractor = {item => ''+item.id} 
                renderItem = {renderChildren}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Touch:{
        
        //flexDirection: 'row',
        borderWidth:1,
        borderColor: 'rgba(200,200,128,1)',
    },
    parentsText:{
        marginTop:10,
        fontSize: 20,
        fontWeight: 'bold',
        color:'#f2f',
    },
    distancetext:{
        fontSize: 16,
        fontStyle:"italic",
        color:'#5f2'
    },
    spotText:{
        fontSize: 14,
        fontStyle:"italic",
        color:'#51f',
    }
});



export default Item;


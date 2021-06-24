import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const renderChildren = ({item}) =>{
    return <View>
        {console.log(item)}
        <Text>Student: {item.first_name} {item.last_name}</Text>
        <Text>Grade:{item.grade}</Text>

    </View>
}
const Item = ({ item }) => {
    const navigation = useNavigation();
    console.log(navigation);
    return (
    <TouchableOpacity style={styles.Touch}
        onPress = {()=>{
            navigation.navigate('StudentPickup',{item}); // Reference in HomeStackNavigator in StackNavigator.js
        }} >
      <Text style={styles.parentsText}>Parents: {item.first_name} {item.last_name}</Text>
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
        flex:1,
        borderWidth:1,
        borderColor: 'rgba(200,200,128,1)',
    },
    parentsText:{
        marginTop:10,
        fontSize: 20,
        fontWeight: 'bold',
        color:'#f2f',
    }
});



export default Item;


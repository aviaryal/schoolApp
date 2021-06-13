import React,{useState,useEffect} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';




const SHomeScreen= ()=>{
    const infotext = 'Hello, I am staff';
    return (
        <View >
            <Text>{infotext}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }
});
export default SHomeScreen;


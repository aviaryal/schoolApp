import React,{useState,useEffect} from 'react';
import {Platform,View,Text,StyleSheet} from 'react-native';
import {askPermission, startGeoFencing,startBGTracking} from '../hooks/backgroundloacation';



const HomeScreen= ()=>{
    
    askPermission();
    startGeoFencing();
    startBGTracking();
    const text = 'hello';
    //JSON.stringify(location);
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
export default HomeScreen;


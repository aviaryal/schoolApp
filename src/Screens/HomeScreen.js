import React,{useState,useEffect} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import { useAuth } from '../Context/AuthContext';
import {checkPostion,askPermission, startTracking} from '../hooks/useLocation';
import PHomeScreen from './PHomeScreen';
import SHomeScreen from './SHomeScreen';



const HomeScreen= ()=>{
    
    const {state} = useAuth();
    

    
    
    return (
        <View >
            {
                state.isStaff?
                <SHomeScreen/>
                :
                <PHomeScreen/>
            } 
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
export default HomeScreen;


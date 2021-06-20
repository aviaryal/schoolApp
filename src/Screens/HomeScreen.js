import React,{useState,useEffect,useContext} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import { useAuth } from '../Context/AuthContext';
import {checkPostion,askPermission, startTracking} from '../hooks/useLocation';
import PHomeScreen from './PHomeScreen';
import SHomeScreen from './SHomeScreen';
import {Context as currentUserContext} from '../Context/CurrentUserContext';
import {Context as schoolDetailsContext} from '../Context/schoolDetailContext';


const HomeScreen= ()=>{
    const {state} = useAuth();
    const {fetch_info}= useContext(currentUserContext);
    const {getSchoolDetails} = useContext(schoolDetailsContext);
    useEffect(()=>{
        fetch_info();
        getSchoolDetails();
        
    },[])
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


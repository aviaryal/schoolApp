import React,{useState,useEffect,useContext} from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../Context/AuthContext.js';
import schoolApi from '../api/schoolapi';
import {Context as userInfoContext} from '../Context/CurrentUserContext';
import { watchPositionAsync } from 'expo-location';
const ProfileScreen= ()=>{
    const {auth, state} = React.useContext(AuthContext);
    const {signOut} = auth;
    // console.log(signOut);
    const {state: userInfo} = useContext(userInfoContext);
    const [profile, setProfile] = useState([]);
    const [response, setResponse] = useState([]);
    console.log(userInfo);
    
    const importdata = () =>{
        for (var i = 0; i < response.length; i++)
        {
            if (userInfo.email == response[i].user_email )
            {
                setProfile(response[i]);
            }
        }
    }
    useEffect(()=> {
        (async() =>{
            const response = await schoolApi.get('school/guardian/');
            setResponse(response.data);
            importdata();
        })();
     },[]); 
    
    return (
        <View>        
            <Text style={styles.font}>Name:     {profile.first_name} {profile.last_name} </Text>
            <Text></Text>
            <Text style={styles.font}>Contact info: {profile.phone_number} </Text>
            <Text></Text>
            <Text style={styles.font}>Contact email: {profile.user_email} </Text> 
            <Text></Text>
            <TouchableOpacity >
                <Text style={styles.font}> Change Password</Text>
            </TouchableOpacity>
            <Text></Text>

             <TouchableOpacity style={styles.button}
                onPress={()=>signOut()}>
                <Text> Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ProfileScreen;


import React, { useState, useEffect, useContext, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { AuthContext } from '../Context/AuthContext.js';
import schoolApi from '../api/schoolapi';
import {Context as userInfoContext} from '../Context/CurrentUserContext';


const ProfileScreen = () => {
    const { auth, state } = React.useContext(AuthContext);
    const { signOut } = auth;
    // console.log(signOut);
    const { state: userInfo } = useContext(userInfoContext);
    const [profile, setProfile] = useState([]);
    //console.log(userInfo);

    useEffect(()=> {
        (async() =>{
            const response = await schoolApi.get('school/getuserInformation');
            //console.log(response.data);
            setProfile(response.data);
        })();
     },[]); 
    //console.log(profile);
//     return (
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={require('./logo.png')} />
                <Text style={styles.screen} > Your Profile </Text>
            </View>
            <View style={styles.body}>


                <View style={styles.bodyContent}>
                    <Text style={styles.description}>Name: {profile.first_name} {profile.last_name} </Text>
                    <Text style={styles.description}>Contact info: {profile.phone_number} </Text>
                    <Text style={styles.description}>Contact email: {profile.user_email} </Text>


                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => signOut()}
                    >
                        <Text>Sign Out</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fa5b3d",
        height: 200,
    },
    image: {
        marginBottom: 20,
        width: Dimensions.get('window').width,
        height: 200
      },
    screen: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        alignItems: 'center',
        padding: 30,
    },

    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 17,
        marginTop: 10,
        alignSelf:'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#fa5b3d",
    },
});
export default ProfileScreen;


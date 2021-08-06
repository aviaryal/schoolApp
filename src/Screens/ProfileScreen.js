import React, { useState, useEffect, useContext, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext.js';
import schoolApi from '../api/schoolapi';
import { Context as userInfoContext } from '../Context/CurrentUserContext';
import { watchPositionAsync } from 'expo-location';

const ProfileScreen = () => {
    const { auth, state } = React.useContext(AuthContext);
    const { signOut } = auth;
    // console.log(signOut);
    const { state: userInfo } = useContext(userInfoContext);
    const [profile, setProfile] = useState([]);
    //console.log(userInfo);

    useEffect(() => {
        (async () => {
            const response = await schoolApi.get('school/guardian/' + userInfo.user_id + '/');
            //console.log(response.data);
            setProfile(response.data);
        })();
    }, []);
    console.log(profile);
    //     return (
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screen} > School Pickup </Text>
            </View>
            <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

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
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    screen: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
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


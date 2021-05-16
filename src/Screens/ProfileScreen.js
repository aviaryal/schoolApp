import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../Context/AuthContext.js';
const ProfileScreen= ()=>{
    const {auth, state} = React.useContext(AuthContext);
    const {signOut} = auth;
    console.log(signOut);
    return (
        <View>
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


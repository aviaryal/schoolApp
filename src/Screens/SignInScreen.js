import React from 'react';

import { useState, useContext } from 'react';
import {View,Text,StyleSheet, TextInput, Button, Picker, TouchableOpacity} from 'react-native';
import {AuthContext} from '../Context/AuthContext.js';
const SignInScreen= ()=>{
    const {auth} = React.useContext(AuthContext);
    const {signIn} = auth;
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    value={email}
                    placeholder="Email"
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setEmail}
                    style= {styles.textInput}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style= {styles.textInput}
                    value={password}
                    placeholder="Password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity style={styles.button}
                onPress={()=>signIn({email,password})}>
                <Text> Sign in</Text>
            </TouchableOpacity>
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20,
        // paddingTop: 20,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0ff',
    },
    inputView:{
        width:"80%",
        backgroundColor:"#fff",
        borderRadius:25,
        height:50,
        marginBottom:20,
        alignItems:'center',
        
    },
    textInput: {
        borderWidth:1,
        flex:1,
        height:50,
        color: '#05375a',
        borderColor:'#fff'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
    
});

export default SignInScreen;


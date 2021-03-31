import React from 'react';
import { useState } from 'react';
import { View,StyleSheet,Text, TextInput } from 'react-native';

const AuthForm= ()=>{
    const [email,setEmail] = useState('');
    const [passowrd,setPassword] = useState('password')
    return(
        <View>
            <Text>Email/Username</Text>
            <TextInput
                value={email}
                autoCorrect= {false}
                autoCapitalize='none'
                onChangeText={setEmail}

            />
            <Text>Password</Text>
            <TextInput
                value={passowrd}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText = {setPassword}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    email:{
        height: 40,
        margin: 12,
        borderWidth: 1,
    }
});


export default AuthForm;

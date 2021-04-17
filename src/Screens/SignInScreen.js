import React from 'react';

import { useState, useContext } from 'react';
import {View,Text,StyleSheet, TextInput, Button} from 'react-native';
import {Context as AuthContext} from '../Context/AuthContext';
const SignInScreen= ()=>{
    const {state, signIn} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View>
            <Text>Email</Text>
            <TextInput
                value={email}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setEmail}
            />
            <Text>Password</Text>
            <TextInput
                value={password}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button
                title="SignIn"
                onPress={()=>signIn({email,password})}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignInScreen;


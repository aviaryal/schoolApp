import React from 'react';

import { useState, useContext } from 'react';
import {View,Text,StyleSheet, TextInput, Button} from 'react-native';
import {Context as AuthContext} from '../Context/AuthContext';
const SignInScreen= ()=>{
    const {state, signIn} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                value={email}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setEmail}
                style= {styles.textInput}
            />
            <Text>Password</Text>
            <TextInput
                style= {styles.textInput}
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
    container: {
        
        paddingHorizontal: 20,
        paddingTop: 20
    },
    textInput: {
        borderWidth:1,
        flexDirection:'row',
        marginTop: 12,
        paddingLeft: 10,
        height:20,
        color: '#05375a',
    },
});

export default SignInScreen;


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/Navigation/ButtomTapNavigator";
import SignInScreen from './src/Screens/SignInScreen';
export default function App() {
  const signIn= false;
  return (
    <NavigationContainer>
      {signIn ? (<BottomTabNavigator/>): (<SignInScreen/>)}
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

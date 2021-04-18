import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/Navigation/ButtomTapNavigator";
import SignInScreen from './src/Screens/SignInScreen';
import {Provider as AuthProvider} from './src/Context/AuthContext';
export default function App() {
  const signIn= false;
  return (
    <NavigationContainer>
      <AuthProvider>
        {signIn ? (<BottomTabNavigator/>): (<SignInScreen/>)}
      </AuthProvider>
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
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
});

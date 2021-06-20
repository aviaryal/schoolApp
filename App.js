import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import {AuthContext, useAuth} from './src/Context/AuthContext.js';
import {Provider as CurrentUserProvider} from './src/Context/CurrentUserContext';
//import {InfoContext, useInfo} from './src/Context/InfoContext';
import { Provider as SchoolDetailsProvider } from './src/Context/schoolDetailContext';
import RootStackScreen from './src/Navigation/RootStackNavigator';


const RootStack = createStackNavigator();

export default function App() {
  const {auth,state} = useAuth();
  //console.log('From App.js',state.userToken);
  //const {fetch_data, infostate} = useInfo;
 
  return (
    
    <AuthContext.Provider value= {{auth, state}}>
      <CurrentUserProvider>
        <SchoolDetailsProvider>
          <NavigationContainer>
          {/* <RootStack.Navigator
                screenOptions={{
                  headerShown: false,
                  animationEnabled: false,
                }}>
                {renderScreens()}
              </RootStack.Navigator> */}
              <RootStackScreen userToken={state.userToken}/>

          </NavigationContainer>
        </SchoolDetailsProvider>
      </CurrentUserProvider>
    
    </AuthContext.Provider>
    
  );
};

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

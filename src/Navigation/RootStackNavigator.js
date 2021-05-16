import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ButtomTapNavigator from './ButtomTapNavigator';
import {AuthStackScreen} from './StackNavigator';
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={ButtomTapNavigator}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default RootStackScreen;
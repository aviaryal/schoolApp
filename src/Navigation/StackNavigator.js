import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import SignInScreen from '../Screens/SignInScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = ()=>{
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name ="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ()=>{
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
        </ProfileStack.Navigator>
    );
}

const NotificationStack = createStackNavigator();

const NotificationStackScreen = ()=>{
    return (
        <NotificationStack.Navigator>
            <NotificationStack.Screen name = "Notification" component={NotificationScreen}/>
        </NotificationStack.Navigator>
    );
}

const AuthStack = createStackNavigator();
const AuthStackScreen = ()=>{
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name = "SignIn" component={SignInScreen}/>
        </AuthStack.Navigator>
    )
}

export {HomeStackScreen,ProfileStackScreen,NotificationStackScreen, AuthStackScreen};